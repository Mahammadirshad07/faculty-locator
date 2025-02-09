  import { NextRequest, NextResponse } from "next/server";
  import prisma from "@/lib/prisma";
  export async function POST(request: NextRequest) {
    try {
      const { name } = await request.json();
      const course = await prisma.course.create({
        data: {
          name: name,
        },
      });

      return NextResponse.json({ message: "subject created succesfully" });
    } catch (error) {
      return NextResponse.json({ error: "error:couldnt create subject" });
    }
  }
