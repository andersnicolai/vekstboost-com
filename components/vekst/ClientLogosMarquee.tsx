'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const clientLogos = [
  {
    name: "Ergohjelp",
    logo: "/logo/vekstboostlogo.png",
  },
  {
    name: "Magnus Midtbø",
    logo: "/logo/vekstboostlogo.png",
  },
  {
    name: "Hjorth Arkitekter",
    logo: "/logo/vekstboostlogo.png",
  },
  {
    name: "Grimstad Akupunktur",
    logo: "/logo/vekstboostlogo.png",
  }
]

// Triple the array for seamless scroll
const scrollingLogos = [...clientLogos, ...clientLogos, ...clientLogos]

interface ClientLogosMarqueeProps {
  className?: string
  speed?: number
}

export default function ClientLogosMarquee({ className = '', speed = 25 }: ClientLogosMarqueeProps) {
  return (
    <div className={`relative overflow-hidden py-8 ${className}`}>
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 w-16 h-full z-10 bg-gradient-to-r from-white to-transparent"></div>
      <div className="absolute right-0 top-0 w-16 h-full z-10 bg-gradient-to-l from-white to-transparent"></div>
      
      {/* Scrolling container */}
      <motion.div
        className="flex space-x-12 items-center"
        animate={{
          x: [0, -100 / 3 + '%']
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        style={{ width: '300%' }}
      >
        {scrollingLogos.map((client, index) => (
          <div
            key={`${client.name}-${index}`}
            className="flex-shrink-0 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
          >
            <div className="relative w-24 h-12 md:w-32 md:h-16 flex items-center justify-center bg-gray-100 rounded-lg">
              <span className="text-xs text-gray-600 font-medium text-center px-2">
                {client.name}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
} 