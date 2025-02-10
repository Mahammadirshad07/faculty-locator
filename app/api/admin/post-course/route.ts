  import { NextRequest, NextResponse } from "next/server";
  import prisma from "@/lib/prisma";
  export async function POST(request: NextRequest) {
    try {
      const body = await request.json();
      await prisma.course.create({
        data: {
          name: body.name,
          semester:parseInt(body.semester),
        },
      });

      return NextResponse.json({ message: "course created succesfully" });
    } catch (error) {
      return NextResponse.json({ error});
    }
  }
