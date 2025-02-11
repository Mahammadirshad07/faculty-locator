import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id"); 

  
  if (!id || isNaN(parseInt(id))) {
    return NextResponse.json({ error: "Invalid or missing ID" }, { status: 400 });
  }

  
  const faculty = await prisma.faculty.findUnique({
    where: { id: parseInt(id) },
  });

  if (!faculty) {
    return NextResponse.json({ error: "Faculty not found" }, { status: 404 });
  }

  return NextResponse.json(faculty);
}
