'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MousePointer, Activity, Users } from 'lucide-react'
import { AccessibleHeading } from '@/components/ui/accessible-heading'

interface DataVisualizationProps {
  dict: any
  lang: string
}

export default function DataVisualization({ dict, lang }: DataVisualizationProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  
  const visualizations = [
    {
      title: lang === 'no' ? 'Facebook Pixel Sporing' : lang === 'en' ? 'Facebook Pixel Tracking' : 'Facebook Pixel Sporing',
      description: lang === 'no' ? 'Se hvordan vi sporer brukerinteraksjoner på tvers av enheter' : lang === 'en' ? 'See how we track user interactions across devices' : 'Se hvordan vi sporer brugerinteraktioner på tværs af enheder',
      icon: MousePointer,
      metrics: [
        { label: lang === 'no' ? 'Sidevisninger' : lang === 'en' ? 'Page views' : 'Sidevisninger', value: '12,453' },
        { label: lang === 'no' ? 'Unike brukere' : lang === 'en' ? 'Unique users' : 'Unikke brugere', value: '5,234' },
        { label: lang === 'no' ? `Ekte ${dict.common?.conversion || 'konvertering'}er` : lang === 'en' ? 'Real conversions' : 'Ægte konverteringer', value: '342' }
      ]
    },
    {
      title: lang === 'no' ? 'Google Analytics Innsikt' : lang === 'en' ? 'Google Analytics Insights' : 'Google Analytics Indsigt',
      description: lang === 'no' ? 'Detaljert analyse av brukeratferd og konverteringer' : lang === 'en' ? 'Detailed analysis of user behavior and conversions' : 'Detaljeret analyse af brugeradfærd og konverteringer',
      icon: Activity,
      metrics: [
        { label: lang === 'no' ? 'Gj.snitt tid' : lang === 'en' ? 'Avg. time' : 'Gns. tid', value: '2:45' },
        { label: 'Bounce rate', value: '32%' },
        { label: lang === 'no' ? 'Kvalifiserte leads' : lang === 'en' ? 'Qualified leads' : 'Kvalificerede leads', value: '891' }
      ]
    },
    {
      title: lang === 'no' ? 'Målgruppe Segmentering' : lang === 'en' ? 'Audience Segmentation' : 'Målgruppe Segmentering',
      description: lang === 'no' ? 'Hvordan vi finner og når din ideelle kundegruppe' : lang === 'en' ? 'How we find and reach your ideal customer group' : 'Hvordan vi finder og når din ideelle kundegruppe',
      icon: Users,
      metrics: [
        { label: lang === 'no' ? 'Målgruppe' : lang === 'en' ? 'Audience' : 'Målgruppe', value: '250K' },
        { label: lang === 'no' ? 'Engasjement' : lang === 'en' ? 'Engagement' : 'Engagement', value: '8.3%' },
        { label: 'ROAS', value: '4.2x' }
      ]
    }
  ]
  
  const activeViz = visualizations[activeIndex]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-950 text-white">
      <div className="container mx-auto px-4">
        <AccessibleHeading level={2} className="text-3xl font-bold text-center mb-8">
          {lang === 'no' ? 'Data-drevet Markedsføring' : lang === 'en' ? 'Data-driven Marketing' : 'Data-drevet Markedsføring'}
        </AccessibleHeading>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {visualizations.map((viz, index) => (
            <motion.button
              key={index}
              className={`p-6 rounded-xl transition-all duration-300 border ${
                activeIndex === index 
                  ? 'bg-purple-600 border-purple-500' 
                  : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
              }`}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex justify-center mb-4">
                <viz.icon className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-2">{viz.title}</h4>
              <p className="text-sm text-gray-300">{viz.description}</p>
            </motion.button>
          ))}
        </div>

        <motion.div 
          className="bg-gray-800 p-6 rounded-xl border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-3 gap-4">
            {activeViz.metrics.map((metric, i) => (
              <motion.div 
                key={i}
                className="text-center p-4 rounded-lg bg-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-300">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 