'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Loading() {
  const [showBrool, setShowBrool] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowBrool(prev => !prev);
    }, 150); // Bytter hver 150ms for en superrask effekt

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 transition-all duration-300 ease-in-out">
            <Image
              src={showBrool ? "/logo/vekstboostbrol.png" : "/logo/vekstboostlogo.png"}
              alt="VekstBoost Logo"
              width={96}
              height={96}
              className="object-contain animate-pulse"
              priority
            />
          </div>
          
          {/* Subtle rotating ring around logo */}
          <div className="absolute inset-0 border-2 border-transparent border-t-blue-500 rounded-full animate-spin opacity-30"></div>
        </div>
        
        <div className="space-y-2">
          <p className="text-gray-700 font-medium text-lg">Laster inn...</p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
} 