'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Clock, Quote } from 'lucide-react'

interface ResultsCaseStudiesProps {
  dict: any
  lang: string
}

export default function ResultsCaseStudies({ dict, lang }: ResultsCaseStudiesProps) {
  const [activeCase, setActiveCase] = useState(0)

  const cases = [
    {
      client: dict.websiteShowcase?.websites?.dident || {
        title: "DiDent Tannlegesenter",
        businessChallenge: "Trengte flere pasienter i et konkurranseutsatt marked",
        solution: "Implementerte datadrevet leadgenerering med målrettet markedsføring",
        businessImpact: "Økte antall nye pasienter med 350+ og oppnådde 680% ROI",
        clientQuote: "VekstBoost har revolusjonert hvordan vi får nye pasienter. Resultatene snakker for seg selv.",
        clientName: "Dr. Sarah Hansen",
        clientRole: "Klinikkeier, DiDent"
      },
      metrics: {
        leadIncrease: "350+",
        roi: "680%",
        timeFrame: "6 måneder"
      }
    },
    {
      client: dict.websiteShowcase?.websites?.vaskefirma || {
        title: "Vaskefirma Oslo",
        businessChallenge: "Trengte en profesjonell online tilstedeværelse for å skille seg ut",
        solution: "Bygget konverteringsoptimalisert nettside med online booking",
        businessImpact: "45% økning i leads og doblet konverteringsrate i løpet av 3 måneder",
        clientQuote: "Nettsiden jobber for oss 24/7. Vi får konstant nye henvendelser.",
        clientName: "Patrick Hansen", 
        clientRole: "Daglig leder, Pat Vaskehjelp"
      },
      metrics: {
        leadIncrease: "45%",
        roi: "240%",
        timeFrame: "3 måneder"
      }
    },
    {
      client: dict.websiteShowcase?.websites?.malerfirma || {
        title: "Malerfirma Oslo",
        businessChallenge: "Utdatert nettside som ikke genererte leads",
        solution: "Utviklet moderne løsning med integrert booking og betalingssystem",
        businessImpact: "120% økning i lead-generering og betydelig redusert administrasjonstid",
        clientQuote: "Den nye nettsiden har transformert vår forretning fullstendig.",
        clientName: "Kristian Eriksen",
        clientRole: "Eier, XK Malerfirma"
      },
      metrics: {
        leadIncrease: "120%",
        roi: "380%", 
        timeFrame: "4 måneder"
      }
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {dict.resultsCase?.title || 'Dokumenterte resultater fra våre kunder'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {dict.resultsCase?.subtitle || 'Se hvordan vi har hjulpet bedrifter å oppnå målbare vekstresultater'}
            </p>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Case Study Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {cases.map((caseStudy, index) => (
              <button
                key={index}
                onClick={() => setActiveCase(index)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeCase === index
                    ? 'bg-brand-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {caseStudy.client.title}
              </button>
            ))}
          </div>

          {/* Active Case Study */}
          <motion.div
            key={activeCase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left side - Story */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  {cases[activeCase].client.title}
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {dict.resultsCase?.challenge || 'Utfordringen:'}
                    </h4>
                    <p className="text-gray-600">
                      {cases[activeCase].client.businessChallenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {dict.resultsCase?.solution || 'Løsningen:'}
                    </h4>
                    <p className="text-gray-600">
                      {cases[activeCase].client.solution}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {dict.resultsCase?.impact || 'Resultatet:'}
                    </h4>
                    <p className="text-gray-600">
                      {cases[activeCase].client.businessImpact}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <div className="mt-8 p-6 bg-brand-50 rounded-lg">
                  <Quote className="w-8 h-8 text-brand-600 mb-3" />
                  <p className="text-gray-700 italic mb-4">
                    "{cases[activeCase].client.clientQuote}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {cases[activeCase].client.clientName}
                    </div>
                    <div className="text-sm text-gray-600">
                      {cases[activeCase].client.clientRole}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Metrics */}
              <div>
                <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-xl p-8">
                  <h4 className="text-xl font-bold mb-6">
                    {dict.resultsCase?.metricsTitle || 'Målbare resultater:'}
                  </h4>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div className="bg-white rounded-lg p-6 text-center">
                      <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        {cases[activeCase].metrics.leadIncrease}
                      </div>
                      <div className="text-sm text-gray-600">
                        {dict.resultsCase?.leadGrowth || 'Økning i leads'}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 text-center">
                      <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        {cases[activeCase].metrics.roi}
                      </div>
                      <div className="text-sm text-gray-600">
                        {dict.resultsCase?.returnInvestment || 'ROI på investering'}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 text-center">
                      <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-purple-600 mb-1">
                        {cases[activeCase].metrics.timeFrame}
                      </div>
                      <div className="text-sm text-gray-600">
                        {dict.resultsCase?.timeToResults || 'Tid til resultater'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-brand w-full"
                  >
                    {dict.resultsCase?.cta || 'Få lignende resultater for din bedrift'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}