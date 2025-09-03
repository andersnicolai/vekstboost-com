'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Check, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { AccessibleHeading, AccessibleButton, Button } from './imports'

interface HeroV3Props {
  dict: any
  lang: string
  scrollToContact: () => void
}

export default function HeroV3({ dict, lang, scrollToContact }: HeroV3Props) {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section className="relative py-24 md:py-36 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      {/* Modern background effects */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--brand-primary))_0%,transparent_50%)] animate-gradient"></div>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--brand-secondary))_0%,transparent_50%)] animate-gradient"></div>
        <div className="absolute inset-0 opacity-8 bg-[radial-gradient(hsl(var(--brand-primary))_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Main content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AccessibleHeading level={1} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 tracking-tight leading-[1.1] text-white">
                {dict.hero?.title}
              </AccessibleHeading>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {dict.hero?.description?.main}
              </p>
              
              {/* Key metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto lg:mx-0">
                <div className="text-center md:text-left">
                  <div className="text-4xl md:text-5xl font-bold text-brand-400 mb-1">{dict.hero?.metrics?.leadIncrease?.value}</div>
                  <div className="text-sm text-gray-400">{dict.hero?.metrics?.leadIncrease?.label}</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-4xl md:text-5xl font-bold text-brand-400 mb-1">{dict.hero?.metrics?.conversionRate?.value}</div>
                  <div className="text-sm text-gray-400">{dict.hero?.metrics?.conversionRate?.label}</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-4xl md:text-5xl font-bold text-brand-400 mb-1">{dict.hero?.metrics?.daysToResults?.value}</div>
                  <div className="text-sm text-gray-400">{dict.hero?.metrics?.daysToResults?.label}</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <AccessibleButton 
                  size="lg" 
                  className="btn-brand text-lg px-10 py-4 font-semibold tracking-wide"
                  onClick={scrollToContact}
                  ariaLabel={dict.hero?.cta}
                >
                  {dict.hero?.cta}
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </AccessibleButton>
                
                <AccessibleButton 
                  variant="outline" 
                  size="lg" 
                  className="btn-brand-outline text-lg px-10 py-4 font-semibold tracking-wide"
                  onClick={() => scrollToContact()}
                  ariaLabel={dict.hero?.readMore}
                >
                  {dict.hero?.readMore}
                  <ChevronRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </AccessibleButton>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-gray-300">
                <div className="flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-600">
                  <Check className="h-5 w-5 text-brand-400" aria-hidden="true" />
                  <span className="font-medium">{dict.hero?.trustBadges?.resultsIn90Days}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-600">
                  <Check className="h-5 w-5 text-brand-400" aria-hidden="true" />
                  <span className="font-medium">{dict.hero?.trustBadges?.noContracts}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-600">
                  <Check className="h-5 w-5 text-brand-400" aria-hidden="true" />
                  <span className="font-medium">{dict.hero?.trustBadges?.performanceBased}</span>
                </div>
              </div>

              {/* Free value proposition */}
              <motion.div 
                className="mt-8 bg-gradient-to-r from-brand-50 to-brand-100 p-6 rounded-xl shadow-sm max-w-md mx-auto lg:mx-0 border border-brand-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-brand-600 text-white p-2 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold">{dict.hero?.freeAudit?.title}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{dict.hero?.freeAudit?.subtitle}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Right side - Website illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-brand-gradient rounded-2xl blur opacity-20"></div>
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-brand-100">
              <div className="p-2 bg-brand-gradient">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="w-full bg-indigo-800 rounded-md p-1 text-xs text-center text-white/80">
                    {dict.common?.domain || (lang === 'en' ? 'yourdomain.com' : 
                      lang === 'dk' ? 'ditdomæne.dk' : 'dittdomene.no')}
                  </div>
                </div>
              </div>
              <div className="aspect-[16/10] bg-gray-50 relative">
                {/* Website mockup */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/40 flex flex-col p-8">
                  <div className="h-2 w-24 bg-indigo-600 rounded-full mb-4"></div>
                  <div className="h-8 w-64 bg-gray-800 rounded-lg mb-6 shadow"></div>
                  <div className="h-4 w-full max-w-sm bg-gray-200 rounded-full mb-3"></div>
                  <div className="h-4 w-full max-w-md bg-gray-200 rounded-full mb-3"></div>
                  <div className="h-4 w-full max-w-xs bg-gray-200 rounded-full mb-6"></div>
                  <div className="h-10 w-40 bg-brand-gradient rounded-lg shadow"></div>
                  
                  <div className="flex-1 flex items-end">
                    <div className="grid grid-cols-3 gap-4 w-full">
                      <div className="h-24 bg-gray-100 rounded-lg shadow-sm"></div>
                      <div className="h-24 bg-gray-100 rounded-lg shadow-sm"></div>
                      <div className="h-24 bg-gray-100 rounded-lg shadow-sm"></div>
                    </div>
                  </div>
                </div>
                
                {/* Performance indicators */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-indigo-100">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-700">99/100 PageSpeed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="text-xs text-gray-700">
                        +135% {dict.common?.conversion || (lang === 'en' ? 'conversion' : 
                          lang === 'dk' ? 'konvertering' : 'konvertering')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Statistics */}
            <div className="absolute -bottom-10 -left-10 bg-white rounded-lg shadow-lg p-4 border border-indigo-100 transform rotate-[358deg]">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500">
                  3.5x {dict.common?.roiInvestment || (lang === 'en' ? 'ROI on investment' : 
                    lang === 'dk' ? 'ROI på investering' : 'ROI på investeringen')}
                </span>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full w-[85%]"></div>
                </div>
              </div>
            </div>
            
            {/* Rating */}
            <div className="absolute -top-6 -right-6 bg-white rounded-full shadow-lg px-4 py-2 border border-indigo-100 transform rotate-[5deg]">
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-gray-700">
                  {dict.common?.customerSatisfaction || (lang === 'en' ? 'Customer satisfaction' : 
                    lang === 'dk' ? 'Kundetilfredshed' : 'Kundetilfredshet')}
                </span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 