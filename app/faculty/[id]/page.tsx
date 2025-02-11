"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Faculty } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Phone, Building, MapPin } from 'lucide-react';
import { motion } from "framer-motion";

export default function FacultyDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFaculty() {
      try {
        const response = await fetch(`/api/faculty/${id}`);
        if (!response.ok) throw new Error("Faculty not found");
        const data = await response.json();
        setFaculty(data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        setLoading(false);
      }
    }

    if (id) fetchFaculty();
  }, [id]);

  const MotionCard = motion(Card);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8 flex items-center justify-center">
      <MotionCard 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Faculty Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-3/5" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">{error}</div>
          ) : faculty ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Phone className="text-purple-600" />
                  <p className="text-lg">
                    <span className="font-semibold">Name:</span> {faculty.name}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="text-purple-600" />
                  <p className="text-lg">
                    <span className="font-semibold">Phone:</span> {faculty.phoneNumber}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="text-purple-600" />
                  <p className="text-lg">
                    <span className="font-semibold">Building:</span> {faculty.building}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="text-purple-600" />
                  <p className="text-lg">
                    <span className="font-semibold">Hall Number:</span> {faculty.hallNumber}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-gray-500 p-4">No faculty data available</div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => router.push("/locate-faculties")}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Search
          </Button>
        </CardFooter>
      </MotionCard>
    </div>
  );
}
