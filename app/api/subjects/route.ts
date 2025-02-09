import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
   const subject= await prisma.subject.findMany();
   return NextResponse.json(subject);
}