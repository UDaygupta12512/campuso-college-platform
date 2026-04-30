import { NextRequest, NextResponse } from "next/server";
import { getMockCollegesByIds } from "@/lib/mockData";

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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ids = searchParams.get("ids") || "";
  const idList = ids.split(",").map(Number).filter(n => !isNaN(n) && n > 0);

  if (idList.length < 2) return NextResponse.json({ error: "Provide at least 2 valid IDs" }, { status: 400 });
  if (idList.length > 3) return NextResponse.json({ error: "Maximum 3 colleges" }, { status: 400 });

  const prisma = await getPrisma();

  if (!prisma) {
    const colleges = getMockCollegesByIds(idList);
    if (colleges.length < 2) return NextResponse.json({ error: "Colleges not found" }, { status: 404 });
    return NextResponse.json(colleges);
  }

  try {
    const rows = await prisma.college.findMany({ where: { id: { in: idList } } });
    const ordered = idList.map(id => rows.find((c: any) => c.id === id)).filter(Boolean);
    if (ordered.length < 2) throw new Error("not enough");
    return NextResponse.json(ordered);
  } catch {
    const colleges = getMockCollegesByIds(idList);
    if (colleges.length < 2) return NextResponse.json({ error: "Colleges not found" }, { status: 404 });
    return NextResponse.json(colleges);
  }
}
