'use client'

import { motion } from 'framer-motion'
import { Building2, Stethoscope, ShoppingBag, Wrench, GraduationCap, Heart } from 'lucide-react'
import { AccessibleHeading } from '@/components/ui/accessible-heading'
import Link from 'next/link'

interface IndustrySpecializationsProps {
  dict: any
  lang: string
}

export default function IndustrySpecializations({ dict, lang }: IndustrySpecializationsProps) {
  const isEnglish = lang === 'en'
  
  const industries = [
    {
      icon: <Stethoscope className="h-8 w-8" />,
      name: isEnglish ? 'Dental Practices' : 'Tannlegekontorer',
      description: isEnglish ? 'Patient acquisition and appointment booking systems' : 'Pasientakquisisjon og timebestillingssystemer',
      link: '/tannlege-markedsforing',
      featured: true,
      partnerSite: 'godentalboost.com',
      results: isEnglish ? '350+ new patients per clinic' : '350+ nye pasienter per klinikk'
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      name: isEnglish ? 'Construction & Contracting' : 'Bygg & Anlegg',
      description: isEnglish ? 'Project lead generation for contractors' : 'Prosjektleadgenerering for entreprenører',
      link: '/lag-nettside',
      results: isEnglish ? '400% increase in project inquiries' : '400% økning i prosjekthenvendelser'
    },
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      name: isEnglish ? 'E-commerce' : 'E-handel',
      description: isEnglish ? 'E-commerce conversion and customer acquisition' : 'E-handelskonvertering og kundeakquisisjon',
      link: '/lag-nettside',
      results: isEnglish ? '250% boost in online sales' : '250% økning i netthandelssalg'
    }
  ]

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <AccessibleHeading level={2} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {isEnglish ? 'Industry-Focused Lead Generation' : 'Bransjespesialisert Leadgenerering'}
          </AccessibleHeading>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {isEnglish ? 
              'We deliver results by understanding exactly how your industry works, what drives your customers, and how to generate high-quality leads that convert.' :
              'Vi leverer resultater ved å forstå nøyaktig hvordan din bransje fungerer, hva som driver kundene dine, og hvordan vi genererer høykvalitets leads som konverterer.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/${lang}${industry.link}`}>
                <div className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  industry.featured ? 'ring-2 ring-brand-500 ring-offset-2' : ''
                }`}>
                  {industry.featured && (
                    <div className="absolute -top-3 right-4 bg-gradient-to-r from-brand-500 to-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {isEnglish ? 'Specialized' : 'Spesialisert'}
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                      {industry.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{industry.name}</h3>
                    <p className="text-gray-600 mb-4">{industry.description}</p>
                    
                    {industry.results && (
                      <div className="bg-green-50 text-green-700 text-sm font-medium px-3 py-2 rounded-full mb-3">
                        {industry.results}
                      </div>
                    )}
                    
                    {industry.partnerSite && (
                      <p className="text-sm text-brand-600 font-medium">
                        {isEnglish ? 'Partner site: ' : 'Partnerside: '}{industry.partnerSite}
                      </p>
                    )}
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            {isEnglish ? 
              "Don't see your industry? We work with all types of businesses." :
              "Ser du ikke din bransje? Vi jobber med alle typer bedrifter."}
          </p>
          <Link href={`/${lang}/kontakt`} className="text-brand-600 font-semibold hover:text-brand-700 inline-flex items-center mt-2">
            {isEnglish ? 'Contact us to discuss' : 'Kontakt oss for å diskutere'}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}