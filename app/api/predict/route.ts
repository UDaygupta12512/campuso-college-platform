import { NextRequest, NextResponse } from "next/server";
import { MOCK_COLLEGES } from "@/lib/mockData";

let prismaClient: any = null;
async function getPrisma() {
  if (!process.env.DATABASE_URL) return null;
  try {
    if (!prismaClient) {
      const { prisma } = await import("@/lib/prisma");
      prismaClient = prisma;
    }
    return prismaClient;
  } catch { return null; }
}

const RANK_BANDS: Record<string, { max: number; tiers: string[] }[]> = {
  JEE: [
    { max: 1000,     tiers: ["A+"] },
    { max: 5000,     tiers: ["A+", "A"] },
    { max: 15000,    tiers: ["A", "B+"] },
    { max: 40000,    tiers: ["B+", "B"] },
    { max: 100000,   tiers: ["B", "C"] },
    { max: Infinity, tiers: ["C"] },
  ],
  CAT: [
    { max: 500,      tiers: ["A+", "A"] },
    { max: 2000,     tiers: ["A", "B+"] },
    { max: 8000,     tiers: ["B+", "B"] },
    { max: Infinity, tiers: ["B", "C"] },
  ],
  NEET: [
    { max: 2000,     tiers: ["A+", "A"] },
    { max: 10000,    tiers: ["A", "B+"] },
    { max: 30000,    tiers: ["B+", "B"] },
    { max: Infinity, tiers: ["B", "C"] },
  ],
};

const EXAM_KEYWORDS: Record<string, string[]> = {
  JEE:  ["JEE Advanced","JEE Main","BITSAT","VITEEE","SRMJEEE","KIITEE","MET","PESSAT","CUCET","LPUNEST","SET","UGEE","MHT CET","KCET","WBJEE","TNEA","GUJCET","TSEAMCET","Amity JEE","SAT"],
  CAT:  ["CAT"],
  NEET: ["NEET"],
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const exam = (searchParams.get("exam") || "JEE").toUpperCase();
  const rankStr = searchParams.get("rank") || "";
  const rank = parseInt(rankStr);

  if (!rankStr || isNaN(rank) || rank <= 0)
    return NextResponse.json({ error: "Please enter a valid rank" }, { status: 400 });

  const bands = RANK_BANDS[exam] ?? RANK_BANDS["JEE"];
  const band  = bands.find(b => rank <= b.max);
  const tiers = band?.tiers ?? ["C"];
  const keywords = EXAM_KEYWORDS[exam] ?? EXAM_KEYWORDS["JEE"];

  const filterAndSort = (colleges: any[]) => {
    const TIER_ORDER = ["A+","A","B+","B","C"];
    return colleges
      .filter(c => tiers.includes(c.tier) && c.examAccepted.some((e: string) => keywords.includes(e)))
      .sort((a, b) => {
        const ta = TIER_ORDER.indexOf(a.tier), tb = TIER_ORDER.indexOf(b.tier);
        return ta !== tb ? ta - tb : b.rating - a.rating;
      })
      .slice(0, 24);
  };

  const prisma = await getPrisma();

  if (!prisma) {
    const colleges = filterAndSort(MOCK_COLLEGES);
    return NextResponse.json({
      exam, rank, tiers, colleges,
      message: colleges.length === 0
        ? "No colleges found for this rank range."
        : `Found ${colleges.length} colleges matching your ${exam} rank of ${rank.toLocaleString()}`,
    });
  }

  try {
    const all = await prisma.college.findMany({
      where: { tier: { in: tiers }, examAccepted: { hasSome: keywords } },
      orderBy: { rating: "desc" },
      take: 30,
    });
    const colleges = filterAndSort(all);
    return NextResponse.json({
      exam, rank, tiers, colleges,
      message: colleges.length === 0
        ? "No colleges found for this rank range."
        : `Found ${colleges.length} colleges matching your ${exam} rank of ${rank.toLocaleString()}`,
    });
  } catch {
    const colleges = filterAndSort(MOCK_COLLEGES);
    return NextResponse.json({
      exam, rank, tiers, colleges,
      message: `Found ${colleges.length} colleges (demo mode)`,
    });
  }
}
