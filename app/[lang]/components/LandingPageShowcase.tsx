'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Check, MousePointer, Users, TrendingUp, MapPin } from 'lucide-react'
import { AccessibleHeading } from '@/components/ui/accessible-heading'

interface LandingPageShowcaseProps {
  dict: any
  lang: string
}

export default function LandingPageShowcase({ dict, lang }: LandingPageShowcaseProps) {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  // Metrics for the showcase
  const metrics = [
    { 
      id: 'conversion',
      icon: <MousePointer className="w-10 h-10 text-indigo-500" />,
      value: '12.4%',
      label: dict.performanceSection?.conversionRate || (lang === 'no' ? 'Konverteringsrate' : 'Conversion Rate'),
      description: dict.caseStudies?.landingPage?.conversionDescription || (lang === 'no' ? 'Fra besøkende til leads' : 'From visitors to leads')
    },
    { 
      id: 'traffic',
      icon: <Users className="w-10 h-10 text-purple-500" />,
      value: '350+',
      label: lang === 'no' ? 'Nye pasienter' : 'New patients',
      description: lang === 'no' ? 'Første 3 måneder' : 'First 3 months'
    },
    { 
      id: 'roi',
      icon: <TrendingUp className="w-10 h-10 text-emerald-500" />,
      value: '680%',
      label: 'ROI',
      description: lang === 'no' ? 'Avkastning på investering' : 'Return on investment'
    }
  ]

  // Benefits of landing pages
  const benefits = [
    lang === 'no' ? 'Målrettet mot spesifikke kundegrupper' : 'Targeted to specific customer segments',
    dict.caseStudies?.landingPage?.higherConversionRates || (lang === 'no' ? 'Høyere konverteringsrater enn vanlige nettsider' : 'Higher conversion rates than standard websites'),
    lang === 'no' ? 'Raskere resultater for kampanjer' : 'Faster results for campaigns',
    lang === 'no' ? 'Optimalisert for å generere leads' : 'Optimized for lead generation',
    lang === 'no' ? 'Ideell for tidsbegrensede tilbud' : 'Ideal for time-limited offers',
    lang === 'no' ? 'Lettere å måle resultater' : 'Easier to measure results'
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <AccessibleHeading level={2} className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              {lang === 'no' 
                ? 'Konverterende landingssider som genererer leads' 
                : 'Converting landing pages that generate leads'}
            </AccessibleHeading>
            <p className="text-gray-700 text-lg md:text-xl mb-4">
              {lang === 'no' 
                ? 'Se hvordan vi hjalp DiDent Tannlegesenter med å få 350+ nye pasienter gjennom en spesialtilpasset kampanjeside'
                : 'See how we helped DiDent Dental Center get 350+ new patients through a custom campaign page'}
            </p>
            <div className="flex items-center justify-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
              <span className="text-base font-medium">Oslo, Norge</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Landing Page Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            className="relative overflow-hidden rounded-xl shadow-2xl border border-gray-100 bg-white"
          >
            <div className="aspect-[16/20] w-full">
                          <iframe 
              src="https://landingdental.vercel.app/"
              className="w-full h-full border-0"
              title="DiDent Tannklinikk Kampanje"
                loading="lazy"
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </div>
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-6">
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                Case Study
              </span>
              <h4 className="text-xl md:text-2xl font-bold text-white mt-2">
                DiDent Tannklinikk
              </h4>
            </div>
          </motion.div>

          {/* Right Side - Results and Benefits */}
          <div>
            {/* Results Metrics */}
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              {metrics.map((metric) => (
                <motion.div 
                  key={metric.id}
                  variants={item}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="mb-3">{metric.icon}</div>
                  <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
                  <div className="text-sm font-medium text-gray-900">{metric.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{metric.description}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <AccessibleHeading level={3} className="text-xl font-bold mb-4 text-gray-900">
                {lang === 'no' ? 'Hvorfor landingssider fungerer?' : 'Why landing pages work?'}
              </AccessibleHeading>
              
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 mt-1">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              <a 
                href={`/${lang}/kontakt`}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors group"
              >
                {lang === 'no' ? 'Få din egen landingsside' : 'Get your own landing page'}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Client Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
        >
          <div className="text-gray-500 mb-4">
            <svg className="w-10 h-10 text-indigo-200" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 8c-2.209 0-4 1.791-4 4v10c0 2.209 1.791 4 4 4h10c2.209 0 4-1.791 4-4v-6c0-1.105-0.895-2-2-2h-6c-1.105 0-2-0.895-2-2v-2c0-1.105 0.895-2 2-2h2c1.105 0 2 0.895 2 2v1h4v-1c0-3.314-2.686-6-6-6h-2c-3.314 0-6 2.686-6 6v2c0 3.314 2.686 6 6 6h6c1.105 0 2 0.895 2 2v6c0 1.105-0.895 2-2 2h-10c-1.105 0-2-0.895-2-2v-10c0-1.105 0.895-2 2-2h2v-4h-4z"></path>
            </svg>
          </div>
          <blockquote className="text-lg text-gray-700 mb-4">
            {lang === 'no' 
              ? 'Jeg trengte en kampanjeside som kunne konvertere besøkende til pasienter på en profesjonell måte. VekstBoost leverte en løsning som ikke bare så fantastisk ut, men som også ga oss konkrete resultater fra dag én. Vi har fått flere bookinger enn noen gang, og kvaliteten på leads er betydelig bedre enn tidligere kampanjer. Vi hadde undersøkt andre som VekstLoop osv, men de var for dyre - wow, jeg fikk mer enn jeg noen gang kunne betalt de andre for pluss litt til! ;)'
              : 'I needed a campaign page that could convert visitors to patients in a professional way. VekstBoost delivered a solution that not only looked fantastic, but also gave us concrete results from day one. We have received more bookings than ever, and the quality of leads is significantly better than previous campaigns. We had looked at others like VekstLoop etc, but they were too expensive - wow, I got more than I could ever have paid the others for plus a bit more! ;)'}
          </blockquote>
          <div className="flex items-center">
            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
              <Image 
                src="https://www.cdn.tv2.no/images/17261519.webp?imageId=17261519&x=12.00&y=2.95&cropw=88.00&croph=85.83&width=375&height=244"
                alt="Mohamad Alhousain - Daglig Leder hos DiDent Tannlegesenter"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-bold text-gray-900">Mohamad Alhousain</div>
              <div className="text-sm text-gray-500">{lang === 'no' ? 'Daglig Leder, DiDent Tannlegesenter' : 'Director, DiDent Dental Center'}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 