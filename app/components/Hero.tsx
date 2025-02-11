"use client"
import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <Link href="/locate-faculties">
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 text-center py-20">
      <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-blue-700 to-blue-400 dark:from-blue-300 dark:to-white text-3xl md:text-5xl lg:text-7xl font-sans font-bold tracking-tight">
        Struggling to Find Your Faculty?
      </h2>
      <p className="max-w-2xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 mt-4">
        Instantly locate faculty members with ease. No more confusion—find 
        your professors, their offices, and contact details in just one click.
      </p>
      
        <Button
          className="mt-6 px-6 py-3 text-lg font-medium rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
        >
          Locate Faculties Now
        </Button>
      
    </BackgroundLines>
    </Link>
  );
}