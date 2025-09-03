'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Target, Clock } from 'lucide-react'

interface ResultsMetricsProps {
  dict: any
  lang: string
}

export default function ResultsMetrics({ dict, lang }: ResultsMetricsProps) {
  const metrics = [
    {
      icon: TrendingUp,
      value: dict.resultsMetrics?.avgLeadIncrease?.value || '400%',
      label: dict.resultsMetrics?.avgLeadIncrease?.label || 'Økning i kvalifiserte leads',
      description: dict.resultsMetrics?.avgLeadIncrease?.description || 'gjennomsnitt for våre kunder'
    },
    {
      icon: Target,
      value: dict.resultsMetrics?.conversionImprovement?.value || '250%',
      label: dict.resultsMetrics?.conversionImprovement?.label || 'Bedre konverteringsrate',
      description: dict.resultsMetrics?.conversionImprovement?.description || 'fra besøkende til kunder'
    },
    {
      icon: Users,
      value: dict.resultsMetrics?.clientSuccess?.value || '93%',
      label: dict.resultsMetrics?.clientSuccess?.label || 'Fornøyde kunder',
      description: dict.resultsMetrics?.clientSuccess?.description || 'som når sine vekstmål'
    },
    {
      icon: Clock,
      value: dict.resultsMetrics?.timeToResults?.value || '90',
      label: dict.resultsMetrics?.timeToResults?.label || 'Dager til resultater',
      description: dict.resultsMetrics?.timeToResults?.description || 'synlige forbedringer garantert'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {dict.resultsMetrics?.title || 'Resultater som taler for seg selv'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {dict.resultsMetrics?.subtitle || 'Vi fokuserer på én ting: å levere målbare resultater som driver din bedrift fremover'}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-brand-50 p-3 rounded-lg">
                    <metric.icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-4xl lg:text-5xl font-bold text-brand-600">
                      {metric.value}
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {metric.label}
                </h3>
                <p className="text-sm text-gray-600">
                  {metric.description}
                </p>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -z-10 -bottom-2 -right-2 w-full h-full bg-brand-100 rounded-2xl opacity-20"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-700 mb-8">
            {dict.resultsMetrics?.cta?.title || 'Klar for å se lignende resultater for din bedrift?'}
          </p>
          <button
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-brand text-lg px-8 py-4"
          >
            {dict.resultsMetrics?.cta?.button || 'Få din gratis vekstanalyse'}
          </button>
        </motion.div>
      </div>
    </section>
  )
}