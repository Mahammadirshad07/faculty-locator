import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const semester = searchParams.get("semester");
  let courses;
  if (semester) {
    courses = await prisma.course.findMany({
      where: {
        semester: parseInt(semester),
      },
    });
  } else {
    courses = await prisma.course.findMany();
  }

  return NextResponse.json(courses);
}
