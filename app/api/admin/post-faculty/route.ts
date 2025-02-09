import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const data= await request.json();

    const faculty= await prisma.faculty.create({
        data:{
            name:data.name,
            hallNumber:data.hallNumber,
            building:data.building
        }
    })
    return NextResponse.json("faculty created")
}