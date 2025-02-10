import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("Received data:", data);

    // Validate required fields
    if (
      !data.name ||
      !data.hallNumber ||
      !data.building ||
      !data.subjectId ||
      !data.phoneNumber
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if faculty already exists using phoneNumber
    let faculty = await prisma.faculty.findUnique({
      where: { phoneNumber: data.phoneNumber },
      include: { subjects: true },
    });

    if (faculty) {
      // Faculty exists, update their subjects
      faculty = await prisma.faculty.update({
        where: { phoneNumber: data.phoneNumber },
        data: {
          subjects: {
            connect: { id: Number(data.subjectId) },
          },
        },
        include: { subjects: true },
      });
      console.log("Faculty updated:", faculty);
      return NextResponse.json({
        message: "Faculty updated with new subject",
        faculty,
      });
    } else {
      // Faculty does not exist, create new one
      faculty = await prisma.faculty.create({
        data: {
          name: data.name,
          hallNumber: data.hallNumber,
          building: data.building,
          phoneNumber: data.phoneNumber,
          subjects: {
            connect: { id: Number(data.subjectId) },
          },
        },
        include: { subjects: true },
      });
      console.log("New faculty created:", faculty);
      return NextResponse.json({ message: "Faculty created", faculty });
    }
  } catch (error) {
    console.error("Error creating or updating faculty:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
