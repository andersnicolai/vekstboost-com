'use client'

import { useState, useEffect } from 'react'
import { MotionDiv } from './MotionDiv'

const industries = [
  'VEKSTBOOST',
  'TANNBOOST', 
  'BYGGBOOST',
  'EIENDOMSBOOST',
  'ADVOKATBOOST',
  'VEKSTBOOST'
]

export default function AnimatedBrandText() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % industries.length)
    }, 2000) // Change every 2 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-24 sm:h-28 md:h-40 flex items-center justify-center overflow-hidden">
      {industries.map((industry, index) => (
        <MotionDiv
          key={`${industry}-${index}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: index === currentIndex ? 1 : 0,
            y: index === currentIndex ? 0 : 50
          }}
          transition={{ 
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-black text-white tracking-tight leading-none">
            {industry}
          </h2>
        </MotionDiv>
      ))}
    </div>
  )
} 