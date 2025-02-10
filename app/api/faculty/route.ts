import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subjectId = searchParams.get("subjectId");

  if (!subjectId) {
    return NextResponse.json({ error: "subjectId is required" }, { status: 400 });
  }

  try {
    const faculty = await prisma.faculty.findMany({
      where: {
        subjects: {
          some: {
            id: parseInt(subjectId),
          },
        },
      },
      include: {
        subjects: true, 
      },
    });

    return NextResponse.json(faculty);
  } catch (error) {
    console.error("Error fetching faculty:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
