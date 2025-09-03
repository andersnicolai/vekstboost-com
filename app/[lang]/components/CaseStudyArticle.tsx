'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Users, TrendingUp, Award } from 'lucide-react'
import { AccessibleHeading } from '@/components/ui/accessible-heading'

export interface CaseStudy {
  id: string
  title: string
  subtitle: string
  slug: string
  industry: string
  services: string[]
  metrics: {
    label: string
    value: string
    icon: string
  }[]
  description: string
  testimonial?: {
    quote: string
    author: string
    position: string
    avatar?: string
  }
  imageUrl: string
  featured?: boolean
}

interface CaseStudyArticleProps {
  caseStudy: CaseStudy
  lang: string
  featured?: boolean
}

export default function CaseStudyArticle({ caseStudy, lang, featured = false }: CaseStudyArticleProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users className="w-5 h-5" />
      case 'trending-up':
        return <TrendingUp className="w-5 h-5" />
      case 'calendar':
        return <Calendar className="w-5 h-5" />
      case 'award':
        return <Award className="w-5 h-5" />
      default:
        return <TrendingUp className="w-5 h-5" />
    }
  }

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100 ${featured ? 'col-span-2 md:flex' : ''}`}
    >
      <div className={`relative ${featured ? 'md:w-2/5' : 'w-full'}`}>
        <div className={`relative ${featured ? 'aspect-[4/3] h-full' : 'aspect-[16/9]'}`}>
          <Image 
            src={caseStudy.imageUrl} 
            alt={caseStudy.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium">
            {caseStudy.industry}
          </span>
        </div>
      </div>
      
      <div className={`p-6 ${featured ? 'md:w-3/5' : 'w-full'}`}>
        <div className="mb-4">
          <AccessibleHeading level={3} className="text-xl font-bold text-gray-900 mb-2">
            {caseStudy.title}
          </AccessibleHeading>
          <p className="text-gray-600">{caseStudy.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          {caseStudy.metrics.slice(0, 4).map((metric, index) => (
            <div key={index} className="flex items-start">
              <div className="mr-3 p-2 bg-indigo-50 rounded-md text-indigo-600">
                {getIcon(metric.icon)}
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                <div className="text-xs text-gray-500">{metric.label}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700 line-clamp-3">{caseStudy.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {caseStudy.services.map((service, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-700">
              {service}
            </span>
          ))}
        </div>
        
        <Link 
          href={`/${lang}/ressurser/cases/${caseStudy.slug}`}
          className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
        >
          {lang === 'no' ? 'Se hele case studien' : 'View full case study'} 
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </motion.article>
  )
} 