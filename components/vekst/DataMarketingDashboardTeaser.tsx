'use client'

import { motion } from 'framer-motion'
import { BarChart2, ArrowUpRight, Users, Target, TrendingUp } from 'lucide-react'

export default function DataMarketingDashboardTeaser() {
  // Simulerte data for graf
  const chartData = [25, 36, 30, 45, 35, 50, 70, 60, 80, 75]

  return (
    <motion.div
      className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-xl shadow-xl overflow-hidden border border-indigo-900/50 p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Dashboard preview header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-xs font-semibold text-indigo-400 mb-1">KOMMENDE FUNKSJONALITET</div>
          <h3 className="text-xl font-bold">Data Marketing Dashboard</h3>
          <p className="text-indigo-200 text-sm">Full kontroll over markedsføringen din</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 transition rounded text-xs font-medium flex items-center"
        >
          <span>Snart tilgjengelig</span>
          <ArrowUpRight className="ml-1 h-3 w-3" />
        </motion.button>
      </div>

      {/* Metrics preview */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        {[
          { icon: Target, value: '38', label: 'Konverteringer' },
          { icon: TrendingUp, value: '4.7x', label: 'ROAS' },
          { icon: BarChart2, value: '-22%', label: 'CPL' },
          { icon: Users, value: '3,219', label: 'Besøkende' }
        ].map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-indigo-900/30 rounded-lg p-3 text-center"
          >
            <metric.icon className="h-4 w-4 text-indigo-400 mx-auto mb-1" />
            <div className="text-lg font-bold">{metric.value}</div>
            <div className="text-xs text-indigo-300">{metric.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Simplified chart preview */}
      <div className="bg-indigo-900/20 rounded-xl p-4 h-24 overflow-hidden relative">
        <div className="flex items-end justify-between h-full">
          {chartData.map((val, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${val}%` }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-gradient-to-t from-indigo-600 to-indigo-400 w-4 rounded-t"
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-indigo-800/70 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-xs font-medium">Få innsikt i din markedsføring</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 