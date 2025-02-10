import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    if (!request.body) {
      return new Response(JSON.stringify({ error: "Empty request body" }), {
        status: 400,
      });
    }

    const body = await request.json();
    console.log("Received body:", body);

    if (!body.name || !body.courseId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const subject = await prisma.subject.create({
      data: {
        name: body.name,
       
        course: {
          connect: {
            id: body.courseId,
          },
        },
      },
    });

    return new Response(JSON.stringify(subject), { status: 201 });
  } catch (error) {
    console.error("Error creating subject:", error);
    return new Response(JSON.stringify({ error: "Failed to create subject" }), {
      status: 500,
    });
  }
}
