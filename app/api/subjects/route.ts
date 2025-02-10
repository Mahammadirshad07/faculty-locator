import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("courseId");
  let subject;
  if (courseId) {
    subject = await prisma.subject.findMany({
      where: {
        courseId: parseInt(courseId),
      },
    });
  } else {
    subject = await prisma.subject.findMany();
  }

  return NextResponse.json(subject);
}
