import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/qa/[id] - get question + all answers
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const qId = parseInt(id);
  if (isNaN(qId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  try {
    const question = await prisma.question.findUnique({
      where: { id: qId },
      include: {
        college: { select: { id: true, name: true } },
        answers: { orderBy: { createdAt: "asc" } },
      },
    });
    if (!question) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(question);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load question" }, { status: 500 });
  }
}

// POST /api/qa/[id] - add answer
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const qId = parseInt(id);
  if (isNaN(qId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  try {
    const { body, author } = await req.json();
    if (!body?.trim() || !author?.trim()) {
      return NextResponse.json({ error: "body and author are required" }, { status: 400 });
    }

    const answer = await prisma.answer.create({
      data: { body: body.trim(), author: author.trim(), questionId: qId },
    });
    return NextResponse.json(answer, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to post answer" }, { status: 500 });
  }
}
