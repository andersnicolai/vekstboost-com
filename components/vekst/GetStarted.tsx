'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { CheckCircle2 } from 'lucide-react'
import type { Dictionary } from '@/types/dictionary'

// Lazy load ReactPlayer to improve performance
const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-gray-500">Loading video player...</div>
    </div>
  ),
}) as any

interface GetStartedProps {
  dict: Dictionary
}

export function GetStarted({ dict }: GetStartedProps) {
  const { getStarted: content } = dict
  const [isClient, setIsClient] = useState(false)

  const videoUrl = content.video.url || "https://www.youtube.com/watch?v=S6CcEjLxCJ0"

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 pt-20 pb-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {content.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-gray-200 p-6 rounded-xl text-center shadow-sm"
          >
            <div className="text-3xl font-bold text-rose-500 mb-2">
              {content.stats.calls.number}
            </div>
            <div className="text-gray-600">{content.stats.calls.label}</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-gray-200 p-6 rounded-xl text-center shadow-sm"
          >
            <div className="text-3xl font-bold text-rose-500 mb-2">
              {content.stats.conversion.number}
            </div>
            <div className="text-gray-600">{content.stats.conversion.label}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-gray-200 p-6 rounded-xl text-center shadow-sm"
          >
            <div className="text-3xl font-bold text-rose-500 mb-2">
              {content.stats.satisfaction.number}
            </div>
            <div className="text-gray-600">{content.stats.satisfaction.label}</div>
          </motion.div>
        </div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            {content.video.title}
          </h3>
          {isClient && (
            <div className="aspect-video shadow-md rounded-xl overflow-hidden">
              <ReactPlayer
                url={videoUrl}
                width="100%"
                height="100%"
                controls
              />
            </div>
          )}
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-2xl mx-auto mt-16"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            {content.benefits.title}
          </h3>
          <div className="space-y-4">
            {content.benefits.items.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-rose-500 flex-shrink-0 mt-1" />
                <p className="text-gray-600">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
