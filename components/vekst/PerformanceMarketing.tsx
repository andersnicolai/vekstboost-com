'use client'

import { motion } from 'framer-motion'
import { LineChart, Target, TrendingUp } from 'lucide-react'
import { LucideIcon } from 'lucide-react'





interface Props {
  dict: any
  lang?: string
  scrollToContact?: () => void
}

export default function PerformanceMarketing({ dict, lang = 'no', scrollToContact }: Props) {
  // Use translation dictionary instead of hardcoded content
  const content = dict?.performanceMarketing

  // Fallback content if translation is missing
  const fallbackContent = {
    title: "How it works:",
    steps: [
      {
        title: "1. We Set Up Advanced Tracking",
        description: "Using tools like Google Analytics 4, Facebook Pixel, and other tracking systems, we get full visibility of the customer journey - from first click to purchase."
      },
      {
        title: "2. We Let Data Guide Us",
        description: "By analyzing data in real-time, we can continuously optimize your campaigns. We identify which ads perform best, which audiences provide the highest ROI, and where we should adjust the strategy."
      }
    ],
    note: "Sounds complicated? It is for many - and that's why we're here. We handle the technical aspects, so you can focus on your business.",
    cta: "Start your data-driven journey today"
  }

  const displayContent = content || fallbackContent

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            {displayContent.title}
          </h2>

          <div className="space-y-12">
            {displayContent.steps?.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex gap-6 items-start"
              >
                <div className="bg-purple-500/10 p-4 rounded-xl">
                  {index === 0 ? (
                    <LineChart className="w-8 h-8 text-purple-500" />
                  ) : (
                    <Target className="w-8 h-8 text-purple-500" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-8 italic">
              {displayContent.note}
            </p>
            {scrollToContact && (
              <button
                onClick={scrollToContact}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                {displayContent.cta}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 