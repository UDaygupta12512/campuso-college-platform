import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/qa - list questions (with answer count)
// POST /api/qa - create question
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const collegeId = searchParams.get("collegeId") ? parseInt(searchParams.get("collegeId")!) : undefined;
  const search    = searchParams.get("search") || "";

  try {
    const questions = await prisma.question.findMany({
      where: {
        ...(collegeId ? { collegeId } : {}),
        ...(search ? { title: { contains: search } } : {}),
      },
      include: {
        college: { select: { id: true, name: true } },
        answers: { select: { id: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const result = questions.map((q) => ({
      id: q.id,
      title: q.title,
      body: q.body,
      author: q.author,
      createdAt: q.createdAt,
      answerCount: q.answers.length,
      college: q.college,
    }));

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load questions" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, body, author, collegeId } = await req.json();
    if (!title?.trim() || !body?.trim() || !author?.trim()) {
      return NextResponse.json({ error: "title, body, author are required" }, { status: 400 });
    }

    const question = await prisma.question.create({
      data: {
        title: title.trim(),
        body: body.trim(),
        author: author.trim(),
        collegeId: collegeId ? parseInt(collegeId) : null,
      },
      include: { college: { select: { id: true, name: true } }, answers: true },
    });

    return NextResponse.json({ ...question, answerCount: 0 }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create question" }, { status: 500 });
  }
}
