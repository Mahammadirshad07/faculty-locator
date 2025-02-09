import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    if (!request.body) {
      return new Response(JSON.stringify({ error: "Empty request body" }), { status: 400 });
    }

    const body = await request.json();
    console.log("Received body:", body);

    if (!body.name || !body.semester || !body.courseId) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const subjectData: any = {
      name: body.name,
      semester: Number(body.semester),
      course: { connect: { id: Number(body.courseId) } },
    };

    // Only add faculty relation if facultyId is provided
    if (body.facultyId) {
      subjectData.faculty = { connect: { id: Number(body.facultyId) } };
    }

    const subject = await prisma.subject.create({ data: subjectData });

    return new Response(JSON.stringify(subject), { status: 201 });
  } catch (error) {
    console.error("Error creating subject:", error);
    return new Response(JSON.stringify({ error: "Failed to create subject" }), { status: 500 });
  }
}
