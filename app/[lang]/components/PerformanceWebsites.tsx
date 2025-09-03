'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Zap, LineChart, ArrowRight, BarChart } from 'lucide-react'
import { AccessibleHeading } from '@/components/ui/accessible-heading'
import { AccessibleButton } from '@/components/ui/accessible-button'

interface PerformanceWebsitesProps {
  dict: any
  lang: string
  scrollToContact: () => void
}

export default function PerformanceWebsites({ dict, lang, scrollToContact }: PerformanceWebsitesProps) {
  // Sample performance data
  const performanceData = [
    { 
      label: dict.performanceSection?.loadTime || 'Ladetid', 
      standard: 3.5, 
      optimalisert: 0.8, 
      unit: dict.performanceSection?.seconds || 'sekunder' 
    },
    { 
      label: dict.performanceSection?.conversionRate || 'Konverteringsrate', 
      standard: 2.1, 
      optimalisert: 5.3, 
      unit: '%' 
    },
    { 
      label: dict.performanceSection?.bounceRate || 'Bounce Rate', 
      standard: 65, 
      optimalisert: 32, 
      unit: '%' 
    },
    { 
      label: dict.performanceSection?.pageSpeedScore || 'Google PageSpeed Score', 
      standard: 48, 
      optimalisert: 96, 
      unit: '/100' 
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-indigo-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mb-4">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">{dict.performanceSection?.title}</span>
            </div>
            
            <AccessibleHeading level={2} className="text-3xl md:text-4xl font-bold mb-6">
              {dict.performanceSection?.subtitle}
            </AccessibleHeading>
            
            <p className="text-lg text-gray-600">
              {dict.performanceSection?.description}
            </p>
          </motion.div>
        </div>

        {/* Performance Metrics Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left side - Metrics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {performanceData.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{metric.label}</span>
                  <div className="flex items-center gap-6">
                    <span className="text-gray-500 text-sm">{metric.standard} {metric.unit}</span>
                    <ArrowRight className="w-4 h-4 text-indigo-400" />
                    <span className="font-bold text-indigo-600">{metric.optimalisert} {metric.unit}</span>
                  </div>
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(metric.optimalisert / (metric.label.includes('PageSpeed') ? 100 : (metric.label.includes('Bounce') ? 100 : 10))) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                    className="absolute h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right side - Browser mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
              <div className="bg-gray-100 p-2 border-b border-gray-200 flex items-center">
                <div className="flex gap-1.5 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 bg-white rounded-md h-6 flex items-center justify-center text-xs text-gray-500">
                  https://dinbedrift.no
                </div>
              </div>
              <div className="p-4">
                <div className="relative px-6 py-8 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg text-white">
                  <BarChart className="w-8 h-8 mb-4 text-indigo-300" />
                  <AccessibleHeading level={3} className="text-xl font-bold mb-2">
                    {dict.performanceSection?.benefits}
                  </AccessibleHeading>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <span>+80% {dict.performanceSection?.moreConversions}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <span>-50% bounce rate</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <span>+25% {dict.performanceSection?.betterGoogleRanking}</span>
                    </li>
                  </ul>
                  <div className="absolute -bottom-3 -right-3 bg-yellow-400 text-indigo-900 font-bold text-sm px-3 py-1 rounded-lg transform rotate-3">
                    {dict.performanceSection?.actualResults}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating performance indicator */}
            <motion.div 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: [-10, 0, -10], opacity: 1 }}
              transition={{ 
                y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                opacity: { duration: 0.5, delay: 1 }
              }}
              className="absolute -top-6 -right-6 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium text-sm px-4 py-2 rounded-full shadow-lg"
            >
              100/100 Google PageSpeed
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg text-gray-600 mb-6">
              {dict.performanceSection?.investmentDescription}
            </p>
            <AccessibleButton
              onClick={scrollToContact}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-8 rounded-full hover:opacity-90 transition-opacity"
              ariaLabel={dict.performanceSection?.cta}
            >
              {dict.performanceSection?.cta}
              <ArrowRight className="ml-2 h-5 w-5 inline-block" />
            </AccessibleButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 