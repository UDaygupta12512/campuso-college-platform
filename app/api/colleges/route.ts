import { NextRequest, NextResponse } from "next/server";
import { prisma, normaliseCollege } from "@/lib/prisma";
import { queryMockColleges } from "@/lib/mockData";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search  = searchParams.get("search")  || "";
  const state   = searchParams.get("state")   || "";
  const maxFees = searchParams.get("maxFees") ? parseInt(searchParams.get("maxFees")!) : undefined;
  const course  = searchParams.get("course")  || "";
  const sortBy  = searchParams.get("sortBy")  || "rating";
  const page    = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit   = 12;

  try {
    const all = await prisma.college.findMany();
    let results = all.map(normaliseCollege) as any[];

    if (search)  results = results.filter((c: any) => c.name.toLowerCase().includes(search.toLowerCase()));
    if (state)   results = results.filter((c: any) => c.state.toLowerCase().includes(state.toLowerCase()));
    if (maxFees) results = results.filter((c: any) => c.fees <= maxFees);
    if (course)  results = results.filter((c: any) => c.courses.includes(course));

    results.sort((a: any, b: any) => {
      if (sortBy === "fees")      return a.fees - b.fees;
      if (sortBy === "placement") return b.placement - a.placement;
      return b.rating - a.rating;
    });

    const total      = results.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const safePage   = Math.min(page, totalPages);
    const colleges   = results.slice((safePage - 1) * limit, safePage * limit);
    return NextResponse.json({ colleges, total, page: safePage, totalPages });
  } catch (err) {
    console.error("DB error, falling back to mock:", err);
    return NextResponse.json(queryMockColleges({ search, state, maxFees, course, sortBy, page, limit }));
  }
}
