'use client'

import { useEffect, useState, useRef, lazy, Suspense } from 'react'
import { getDictionary } from '@/i18n/get-dictionary'
import { Locale } from '@/i18n/config'
import Header from '@/components/vekst/Header'
import ContactForm from '@/components/ContactForm'
import VekstBoostAutomation from '@/components/widgets/VekstBoostAutomation'
// Import critical above-the-fold components normally
import HeroV3 from './components/HeroV3'
import ClientLogosMarquee from '@/components/vekst/ClientLogosMarquee'

// Lazy load below-the-fold components
const WebProblemsSolution = lazy(() => import('./components/WebProblemsSolution'))
const WebProcessSection = lazy(() => import('./components/WebProcessSection'))
const IndustrySpecializations = lazy(() => import('./components/IndustrySpecializations'))
const ResultsMetrics = lazy(() => import('./components/ResultsMetrics'))
const ResultsCaseStudies = lazy(() => import('./components/ResultsCaseStudies'))

interface ClientPageProps {
  dict: any
  lang: Locale
}

// Simple loading component
const SectionLoader = () => (
  <div className="py-16 flex justify-center">
    <div className="animate-pulse bg-gray-200 h-32 w-full max-w-4xl rounded-lg"></div>
  </div>
)

export default function ClientPage({ dict, lang }: ClientPageProps) {
  const [isLoading, setIsLoading] = useState(false)
  const contactFormRef = useRef<HTMLElement>(null)

  const scrollToContact = () => {
    if (contactFormRef.current) {
      const yOffset = -100; // Adjust this value to compensate for header
      const element = contactFormRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  useEffect(() => {
    if (dict) return // Skip if we have dictionary

    const loadDictionary = async () => {
      setIsLoading(true)
      try {
        const dictionary = await getDictionary(lang)
      } catch (error) {
        console.error('Failed to load dictionary:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadDictionary()
  }, [lang, dict])

  // Ensure page starts at top on load/refresh
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <main className="min-h-screen bg-white">
      {dict && (
        <>
          {/* Critical above-the-fold content - loads immediately */}
          {/* @ts-ignore */}
          <Header dict={dict} lang={lang} scrollToContact={scrollToContact} />
          
          {/* Main hero with updated messaging for strategic websites */}
          <HeroV3 dict={dict} lang={lang} scrollToContact={scrollToContact} />
          
          {/* Client logos marquee - simple, no heavy animations */}
          <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  {dict.hero?.trustedBy || (lang === 'en' ? 'Trusted by leading businesses' : 'Klarert av ledende bedrifter')}
                </p>
              </div>
              <ClientLogosMarquee />
            </div>
          </section>
          
          {/* Results metrics section - high priority */}
          <Suspense fallback={<SectionLoader />}>
            <ResultsMetrics dict={dict} lang={lang} />
          </Suspense>
          
          {/* Lazy loaded sections below the fold */}
          <Suspense fallback={<SectionLoader />}>
            <WebProblemsSolution dict={dict} lang={lang} scrollToContact={scrollToContact} />
          </Suspense>
          
          {/* Industry Specializations - shows expertise */}
          <Suspense fallback={<SectionLoader />}>
            <IndustrySpecializations dict={dict} lang={lang} />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <WebProcessSection dict={dict} lang={lang} scrollToContact={scrollToContact} />
          </Suspense>
          
          {/* Results case studies */}
          <Suspense fallback={<SectionLoader />}>
            <ResultsCaseStudies dict={dict} lang={lang} />
          </Suspense>
          
          {/* Contact form - important, load normally */}
          <ContactForm ref={contactFormRef} dict={dict} lang={lang} />
          
          {/* HighLevel Chat Widget */}
          <VekstBoostAutomation 
            apiKey="vb_demo_2024" 
            environment="production"
            market="NO"
          />
        </>
      )}
    </main>
  )
} 