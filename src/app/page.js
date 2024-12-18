'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-6xl font-bold mb-6">Discover Your Style</h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore our curated collection of premium fashion and accessories
            </p>
            <button className="bg-black text-white px-8 py-4 rounded-full w-fit hover:bg-gray-800 transition-colors">
              Shop Now
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px]"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 rounded-3xl overflow-hidden">
              <Image
                src="/hero-image.jpg"
                alt="Fashion Model"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
