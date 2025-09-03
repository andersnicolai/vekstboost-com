'use client'

import { useRef } from 'react'
import { SupportedLanguage } from '@/types'
import Header from '@/components/vekst/Header'
import ContactForm from '@/components/ContactForm'
import VekstBoostAutomation from '@/components/widgets/VekstBoostAutomation'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart, Target, Users, Zap, CheckCircle, ArrowUpRight } from 'lucide-react'
import { AccessibleHeading } from '@/components/ui/accessible-heading'
import { MotionDiv } from '@/components/vekst/animations/MotionDiv'
import PerformanceMarketing from '@/components/vekst/PerformanceMarketing'
import DataVisualization from '@/components/vekst/DataVisualization'
import SimpleNewsletterForm from '@/components/vekst/SimpleNewsletterForm'
import MarketingEducation from '@/components/vekst/MarketingEducation'
import WebsiteShowcase from '@/components/vekst/WebsiteShowcase'
import DataMarketingDashboard from '@/components/vekst/DataMarketingDashboard'
import DataMarketingDashboardTeaser from '@/components/vekst/DataMarketingDashboardTeaser'
import Link from 'next/link'

interface LeadGenClientPageProps {
  dict: any
  lang: SupportedLanguage
}

export default function LeadGenClientPage({ dict, lang }: LeadGenClientPageProps) {
  const contactFormRef = useRef<HTMLElement>(null)

  const scrollToContact = () => {
    if (contactFormRef.current) {
      const yOffset = -100; // Adjust this value to compensate for header
      const element = contactFormRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* @ts-ignore */}
      <Header dict={dict} lang={lang} scrollToContact={scrollToContact} />
      
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-indigo-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block py-1 px-3 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-4">
                  {dict.leadsPage?.badge}
                </span>
                <AccessibleHeading level={1} className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                  {dict.leadsPage?.heroTitle}
                </AccessibleHeading>
                <p className="text-lg md:text-xl text-gray-700 mb-8 md:pr-10">
                  {dict.leadsPage?.heroSubtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={scrollToContact}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center group"
                  >
                    {dict.leadsPage?.heroButtons?.primary}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <Link
                    href="/kontakt"
                    className="px-6 py-3 border border-indigo-200 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all flex items-center justify-center"
                  >
                    {dict.leadsPage?.heroButtons?.secondary}
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl border border-indigo-100 shadow-2xl shadow-indigo-200/20 overflow-hidden"
            >
              <DataMarketingDashboardTeaser />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Lead Magnet / Newsletter - Moved up */}
      <section className="py-20 bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <AccessibleHeading level={2} className="text-3xl md:text-4xl font-bold mb-6">
                  {dict.leadsPage?.leadMagnet?.title}
                </AccessibleHeading>
                <h3 className="text-xl md:text-2xl font-bold mb-6 text-indigo-200">
                  {dict.leadsPage?.leadMagnet?.guideTitle}
                </h3>
                <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
                  {dict.leadsPage?.leadMagnet?.description}
                </p>
              </motion.div>
            </div>
            
            <SimpleNewsletterForm 
              title={dict.leadsPage?.leadMagnet?.newsletterTitle}
              description={dict.leadsPage?.leadMagnet?.newsletterDescription}
              buttonText={dict.leadsPage?.leadMagnet?.buttonText}
              source="leads-page"
              compact={true}
              showInterests={true}
              className="bg-indigo-800/40 border border-indigo-700 shadow-lg"
            />
            
            <div className="mt-10 text-center">
              <p className="text-indigo-200 text-sm flex items-center justify-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                {dict.leadsPage?.leadMagnet?.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Proof / Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block py-1 px-3 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                {dict.leadsPage?.stats?.badge}
              </span>
              <AccessibleHeading level={2} className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                {dict.leadsPage?.stats?.title}
              </AccessibleHeading>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                {dict.leadsPage?.stats?.subtitle}
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 * 0.1, duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{dict.leadsPage?.stats?.items?.conversion?.value}</h3>
              <p className="font-medium text-gray-800 mb-3">{dict.leadsPage?.stats?.items?.conversion?.label}</p>
              <p className="text-sm text-gray-600">{dict.leadsPage?.stats?.items?.conversion?.description}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 * 0.1, duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{dict.leadsPage?.stats?.items?.leads?.value}</h3>
              <p className="font-medium text-gray-800 mb-3">{dict.leadsPage?.stats?.items?.leads?.label}</p>
              <p className="text-sm text-gray-600">{dict.leadsPage?.stats?.items?.leads?.description}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 2 * 0.1, duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{dict.leadsPage?.stats?.items?.costPerLead?.value}</h3>
              <p className="font-medium text-gray-800 mb-3">{dict.leadsPage?.stats?.items?.costPerLead?.label}</p>
              <p className="text-sm text-gray-600">{dict.leadsPage?.stats?.items?.costPerLead?.description}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 3 * 0.1, duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{dict.leadsPage?.stats?.items?.roi?.value}</h3>
              <p className="font-medium text-gray-800 mb-3">{dict.leadsPage?.stats?.items?.roi?.label}</p>
              <p className="text-sm text-gray-600">{dict.leadsPage?.stats?.items?.roi?.description}</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How it works section */}
      <PerformanceMarketing lang={lang} dict={dict} />
      
      {/* Data visualization section */}
      <DataVisualization lang={lang} dict={dict} />
      
      {/* Marketing Education */}
      <MarketingEducation lang={lang} dict={dict} />
      
      {/* Showcase of success stories */}
      <WebsiteShowcase lang={lang} dict={dict} />
      
      {/* Contact form */}
      <ContactForm ref={contactFormRef} dict={dict} lang={lang} />
    </main>
  )
} 