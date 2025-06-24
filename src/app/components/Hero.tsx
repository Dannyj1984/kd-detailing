'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[700px] mx-auto"
        >
          <div className="relative w-full aspect-[7/4]">
            <Image 
              src="/logo-wide.jpeg" 
              alt="KD Detailing" 
              fill
              className="object-contain rounded-lg" 
              priority
            />
          </div>
        </motion.div>
        <motion.p 
          className="text-xl md:text-2xl text-gray-600 mb-8 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          We don&apos;t just clean, we rejuvenate - our valeting services bring your car "back to life"
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            href="/work"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            View Our Work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
