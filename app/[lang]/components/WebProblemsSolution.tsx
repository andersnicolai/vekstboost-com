'use client'

import React from 'react'
import { X, Check, PieChart, Clock, Zap, Monitor, Rocket, Database, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { AccessibleHeading } from '@/components/ui/accessible-heading'
import { AccessibleButton } from '@/components/ui/accessible-button'

interface WebProblemsSolutionProps {
  dict: any
  lang: string
  scrollToContact: () => void
}

export default function WebProblemsSolution({ dict, lang, scrollToContact }: WebProblemsSolutionProps) {
  const problems = [
    {
      title: dict.websiteProblems?.problems?.[0],
      icon: X,
      color: 'text-red-500'
    },
    {
      title: dict.websiteProblems?.problems?.[1],
      icon: X, 
      color: 'text-red-500'
    },
    {
      title: dict.websiteProblems?.problems?.[2],
      icon: X,
      color: 'text-red-500'
    },
    {
      title: dict.websiteProblems?.problems?.[3],
      icon: X,
      color: 'text-red-500'
    },
    {
      title: dict.websiteProblems?.problems?.[4],
      icon: X,
      color: 'text-red-500'
    },
    {
      title: dict.websiteProblems?.problems?.[5],
      icon: X,
      color: 'text-red-500'
    }
  ]

    const solutions = [
    {
      title: dict.websiteSolution?.features?.[0]?.title,
      description: dict.websiteSolution?.features?.[0]?.description,
      icon: PieChart,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: dict.websiteSolution?.features?.[1]?.title,
      description: dict.websiteSolution?.features?.[1]?.description,
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: dict.websiteSolution?.features?.[2]?.title,
      description: dict.websiteSolution?.features?.[2]?.description,
      icon: Rocket,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: dict.websiteSolution?.features?.[3]?.title,
      description: dict.websiteSolution?.features?.[3]?.description,
      icon: Database,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: dict.websiteSolution?.features?.[4]?.title,
      description: dict.websiteSolution?.features?.[4]?.description,
      icon: Shield,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      title: dict.websiteSolution?.features?.[5]?.title,
      description: dict.websiteSolution?.features?.[5]?.description,
      icon: Monitor,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <AccessibleHeading level={2} className="text-3xl md:text-4xl font-bold mb-6">
              {dict.websiteProblems?.title}
            </AccessibleHeading>
            <p className="text-lg text-gray-600">
              {dict.websiteProblems?.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-2 rounded-lg">
                  <problem.icon className={`h-6 w-6 ${problem.color}`} />
                </div>
                <p className="text-gray-700">{problem.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <AccessibleHeading level={2} className="text-3xl md:text-4xl font-bold mb-6">
              {dict.websiteSolution?.title}
            </AccessibleHeading>
            <p className="text-lg text-gray-600 mb-8">
              {dict.websiteSolution?.subtitle}
            </p>
            <AccessibleButton
              onClick={scrollToContact}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-8 rounded-lg hover:opacity-90 transition-opacity"
            >
              {dict.websiteSolution?.cta}
            </AccessibleButton>
          </motion.div>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`${solution.bgColor} p-3 rounded-lg inline-block mb-5`}>
                <solution.icon className={`h-6 w-6 ${solution.color}`} />
              </div>
              <AccessibleHeading level={3} className="text-xl font-bold mb-3 text-gray-800">
                {solution.title}
              </AccessibleHeading>
              <p className="text-gray-600">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 