'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Loader2 } from 'lucide-react'
import { AccessibleHeading } from '@/components/ui/accessible-heading'
import Link from 'next/link'
import CaseStudyArticle, { CaseStudy } from './CaseStudyArticle'

interface CaseStudyShowcaseProps {
  dict: any
  lang: string
  featuredOnly?: boolean
  category?: string
  limit?: number
}

export default function CaseStudyShowcase({ 
  dict, 
  lang, 
  featuredOnly = false,
  category,
  limit = 3
}: CaseStudyShowcaseProps) {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCaseStudies = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // Build the query string
        let queryParams = new URLSearchParams()
        
        if (featuredOnly) {
          queryParams.append('featured', 'true')
        }
        
        if (category) {
          queryParams.append('category', category)
        }
        
        if (limit) {
          queryParams.append('limit', limit.toString())
        }
        
        const response = await fetch(`/api/case-studies?${queryParams.toString()}`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch case studies: ${response.status}`)
        }
        
        const data = await response.json()
        setCaseStudies(data.caseStudies || [])
      } catch (error) {
        console.error('Error fetching case studies:', error)
        setError(error instanceof Error ? error.message : 'Failed to load case studies')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchCaseStudies()
  }, [featuredOnly, category, limit])

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <AccessibleHeading level={2} className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              {lang === 'no' 
                ? 'Suksesshistorier fra våre kunder' 
                : 'Success stories from our clients'}
            </AccessibleHeading>
            <p className="text-gray-700 text-lg">
              {lang === 'no' 
                ? 'Se hvordan vi har hjulpet bedrifter i ulike bransjer med å nå sine mål gjennom digitale strategier.'
                : 'See how we have helped businesses in various industries reach their goals through digital strategies.'}
            </p>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {lang === 'no' ? 'Prøv igjen' : 'Try again'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy) => (
              <CaseStudyArticle 
                key={caseStudy.id}
                caseStudy={caseStudy}
                lang={lang}
                featured={caseStudy.featured && caseStudies.length > 1} // Show as featured if it's marked as featured and there's more than one case study
              />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link 
            href={`/${lang}/ressurser/cases`}
            className="inline-flex items-center px-6 py-3 bg-white border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors group"
          >
            {lang === 'no' ? 'Se alle case studies' : 'View all case studies'}
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
} 