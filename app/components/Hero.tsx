"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { AnimatedBackground } from "@/components/ui/animated-background"
export default function HeroSection() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#000513] to-[#001233]">
      <AnimatedBackground />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000513]/50 to-[#001233] pointer-events-none" />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pt-8 md:pt-12 flex justify-center"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#4BB5E8] to-[#8CC63F] rounded-full opacity-60 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200" />
            <Image
              src="/images/yenepoya_logo.jpg"
              alt="Yenepoya University Logo"
              width={120}
              height={120}
              className="relative h-auto w-auto"
              priority
            />
          </div>
        </motion.div>

        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto backdrop-blur-sm p-8 rounded-2xl bg-white/5"
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4BB5E8] to-[#8CC63F]">
                Struggling to Find
              </span>
              <br />
              <span className="text-white">Your Faculty?</span>
            </motion.h1>

            <motion.p
              className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-300 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Instantly locate faculty members with ease. No more confusion—find your professors, their offices, and
              contact details in just one click.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8"
            >
              <Link href="/locate-faculties">
                <Button size="lg" className="relative px-8 py-4 text-lg font-medium rounded-xl overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#4BB5E8] to-[#8CC63F] transition-transform duration-300 group-hover:scale-105" />
                  <span className="relative text-white group-hover:text-white">Locate Faculties Now</span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#4BB5E8] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-[#8CC63F] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-[#4BB5E8] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
    </div>
  )
}

