'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Sparkles, Rocket, Star } from 'lucide-react'
import { AccessibleHeading } from '@/components/ui/accessible-heading'
import { AccessibleButton } from '@/components/ui/accessible-button'

interface WebInvestmentPackagesProps {
  dict: any
  lang: string
  scrollToContact: () => void
}

export default function WebInvestmentPackages({ dict, lang, scrollToContact }: WebInvestmentPackagesProps) {
  const investmentPackages = [
    {
      title: dict.investmentPackages?.packages?.[0]?.title,
      monthlyPrice: dict.investmentPackages?.packages?.[0]?.monthlyPrice,
      totalPrice: dict.investmentPackages?.packages?.[0]?.totalPrice,
      description: dict.investmentPackages?.packages?.[0]?.description,
      features: dict.investmentPackages?.packages?.[0]?.features || [],
      icon: Star,
      accentColor: 'from-blue-500 to-indigo-600',
      shadowColor: 'shadow-blue-200',
      buttonColor: 'bg-indigo-600 hover:bg-indigo-700',
      popularTag: false,
      investmentValue: '70000-120000'
    },
    {
      title: dict.investmentPackages?.packages?.[1]?.title,
      monthlyPrice: dict.investmentPackages?.packages?.[1]?.monthlyPrice,
      totalPrice: dict.investmentPackages?.packages?.[1]?.totalPrice,
      description: dict.investmentPackages?.packages?.[1]?.description,
      features: dict.investmentPackages?.packages?.[1]?.features || [],
      icon: Sparkles,
      accentColor: 'from-purple-500 to-indigo-600',
      shadowColor: 'shadow-purple-200',
      buttonColor: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90',
      popularTag: true,
      investmentValue: '120000-200000'
    },
    {
      title: dict.investmentPackages?.packages?.[2]?.title,
      monthlyPrice: dict.investmentPackages?.packages?.[2]?.monthlyPrice,
      totalPrice: dict.investmentPackages?.packages?.[2]?.totalPrice,
      description: dict.investmentPackages?.packages?.[2]?.description,
      features: dict.investmentPackages?.packages?.[2]?.features || [],
      icon: Rocket,
      accentColor: 'from-indigo-600 to-purple-700',
      shadowColor: 'shadow-indigo-200',
      buttonColor: 'bg-gradient-to-r from-indigo-700 to-purple-700 hover:opacity-90',
      popularTag: false,
      investmentValue: '120000+'
    }
  ]

  // Funksjon for å håndtere klikk på pakkeknapper
  const handlePackageClick = (pkg: typeof investmentPackages[0]) => {
    // Lagre valgt investeringsverdi i localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedInvestment', pkg.investmentValue);
      localStorage.setItem('selectedPackage', pkg.title);
    }
    
    // Scroll til kontaktskjemaet
    scrollToContact();
  }

  return (
    <section id="investment" className="py-20 bg-gradient-to-b from-white to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <AccessibleHeading level={2} className="text-3xl md:text-4xl font-bold mb-6">
              {dict.investmentPackages?.title}
            </AccessibleHeading>
            <p className="text-lg text-gray-600 mb-4">
              {dict.investmentPackages?.subtitle}
            </p>
            <p className="text-sm text-gray-500 italic">
              {dict.investmentPackages?.hoverTip}
            </p>
          </motion.div>
        </div>

        {/* Package Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {investmentPackages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative flex flex-col h-full group"
            >
              {/* Popular tag */}
              {pkg.popularTag && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs uppercase font-bold py-1 px-3 rounded-full shadow-lg transform rotate-3 z-10">
                  {dict.investmentPackages?.packages?.[1]?.popularTag}
                </div>
              )}

              <div className={`bg-white rounded-2xl shadow-xl ${pkg.shadowColor} border border-gray-100 overflow-hidden flex flex-col h-full relative transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105`}>
                {/* Header */}
                <div className={`p-6 bg-gradient-to-r ${pkg.accentColor} text-white`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{pkg.title}</h3>
                      <p className="text-white/80 text-sm">{pkg.description}</p>
                    </div>
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                      <pkg.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Price with hover effect */}
                <div className="p-6 border-b border-gray-100 relative">
                  {/* Default price (total) */}
                  <div className="group-hover:opacity-0 transition-opacity duration-300">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-900">{pkg.totalPrice}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{dict.common?.totalPrice}</p>
                  </div>
                  
                  {/* Hover price (monthly) */}
                  <div className="absolute inset-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-green-700">{pkg.monthlyPrice}</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1 font-medium">
                      {dict.investmentPackages?.monthlyIncludes || (lang === 'en' ? '✨ Includes hosting, maintenance and support' : 
                        lang === 'dk' ? '✨ Inkluderer hosting, vedligeholdelse og support' : '✨ Inkluderer hosting, vedlikehold og support')}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="p-6 flex-grow">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="p-6 mt-auto">
                  <AccessibleButton
                    onClick={() => handlePackageClick(pkg)}
                    className={`w-full py-3 px-4 text-white ${pkg.buttonColor} transition-all duration-300 rounded-lg flex items-center justify-center gap-2 group-hover:shadow-lg`}
                    ariaLabel={index === 2 ? (dict.investmentPackages?.packages?.[2]?.cta || (lang === 'en' ? 'Request a tailored quote' : 
                      lang === 'dk' ? 'Anmod om et skræddersyet tilbud' : 'Be om et skreddersydd tilbud')) : 
                      (dict.investmentPackages?.packages?.[0]?.cta || (lang === 'en' ? 'Book a strategic consultation' : 
                        lang === 'dk' ? 'Book en strategisk konsultation' : 'Book en strategisk konsultasjon'))}
                  >
                    {index === 2 ? (dict.investmentPackages?.packages?.[2]?.cta || (lang === 'en' ? 'Request a tailored quote' : 
                      lang === 'dk' ? 'Anmod om et skræddersyet tilbud' : 'Be om et skreddersydd tilbud')) : 
                      (dict.investmentPackages?.packages?.[0]?.cta || (lang === 'en' ? 'Book a strategic consultation' : 
                        lang === 'dk' ? 'Book en strategisk konsultation' : 'Book en strategisk konsultasjon'))}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </AccessibleButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* What affects pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-16 bg-white rounded-xl shadow-md p-8 border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {dict.investmentPackages?.pricingFactors?.title}
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <span className="text-gray-700">{lang === 'en' ? 'Number of pages and complexity' : 
                    lang === 'dk' ? 'Antal sider og kompleksitet' : 'Antall sider og kompleksitet'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <span className="text-gray-700">{lang === 'en' ? 'Level of tailored design' : 
                    lang === 'dk' ? 'Niveau af skræddersyet design' : 'Nivå av skreddersydd design'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <span className="text-gray-700">{lang === 'en' ? 'Need for custom functionality' : 
                    lang === 'dk' ? 'Behov for custom funktionalitet' : 'Behov for custom funksjonalitet'}</span>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <span className="text-gray-700">{lang === 'en' ? 'Complexity in integrations' : 
                    lang === 'dk' ? 'Kompleksitet i integrationer' : 'Kompleksitet i integrasjoner'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <span className="text-gray-700">{lang === 'en' ? 'Need for advanced content migration' : 
                    lang === 'dk' ? 'Behov for avanceret indholdsmigrering' : 'Behov for avansert innholdsmigrering'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <span className="text-gray-700">{lang === 'en' ? 'Timeline and prioritization' : 
                    lang === 'dk' ? 'Tidslinje og prioritering' : 'Tidslinje og prioritering'}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-800">
              <strong>{dict.common?.tips}</strong> {dict.investmentPackages?.pricingFactors?.tip}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 