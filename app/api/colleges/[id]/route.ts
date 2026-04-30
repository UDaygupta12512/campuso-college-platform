import { NextRequest, NextResponse } from "next/server";
import { prisma, normaliseCollege } from "@/lib/prisma";
import { getMockCollegeById } from "@/lib/mockData";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numId = parseInt(id);
  if (isNaN(numId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  try {
    const college = await prisma.college.findUnique({ where: { id: numId } });
    if (!college) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(normaliseCollege(college as any));
  } catch {
    const college = getMockCollegeById(numId);
    if (!college) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(college);
  }
}
