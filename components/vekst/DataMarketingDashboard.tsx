'use client'

import { motion } from 'framer-motion'
import { BarChart2, ArrowUpRight, Users, Target, LineChart, TrendingUp, Eye } from 'lucide-react'

interface DataMetric {
  title: string
  value: string
  change: string
  isPositive: boolean
  icon: any
  color: string
}

export default function DataMarketingDashboard() {
  const metrics: DataMetric[] = [
    {
      title: 'Konverteringer',
      value: '38',
      change: '+14%',
      isPositive: true,
      icon: Target,
      color: 'blue'
    },
    {
      title: 'ROAS',
      value: '4.7x',
      change: '+0.8x',
      isPositive: true,
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Kostnad per lead',
      value: '248 kr',
      change: '-22%',
      isPositive: true,
      icon: BarChart2,
      color: 'purple'
    },
    {
      title: 'Unike besøkende',
      value: '3,219',
      change: '+9%',
      isPositive: true,
      icon: Users,
      color: 'orange'
    }
  ]

  // Simulerte data for graf
  const chartData = [25, 36, 30, 45, 35, 50, 70, 60, 80, 75]

  // Kampanje-data
  const campaigns = [
    { name: 'Google Search', performance: 87, budget: '15,000 kr', status: 'Aktiv' },
    { name: 'Facebook Leads', performance: 92, budget: '12,000 kr', status: 'Aktiv' },
    { name: 'Instagram Retargeting', performance: 78, budget: '8,000 kr', status: 'Aktiv' }
  ]

  return (
    <div className="bg-slate-900 text-white rounded-xl shadow-xl overflow-hidden border border-slate-800">
      {/* Dashboard header */}
      <div className="p-6 border-b border-slate-800 flex justify-between items-center">
        <div>
          <div className="text-xs font-semibold text-blue-400 mb-1">SAAS DASHBOARD</div>
          <h3 className="text-xl font-bold">Markedsføringsresultater</h3>
          <p className="text-slate-400 text-sm">Siste 30 dager</p>
        </div>
        <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 transition rounded text-xs font-medium flex items-center">
          <span>Til komplett dashboard</span>
          <ArrowUpRight className="ml-1 h-3 w-3" />
        </button>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-4 gap-0">
        {metrics.map((metric, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 border-r border-b border-slate-800 last:border-r-0"
          >
            <div className="flex items-center mb-2">
              <div className={`p-2 rounded-lg bg-${metric.color}-500/10 mr-3`}>
                <metric.icon className={`h-4 w-4 text-${metric.color}-500`} />
              </div>
              <span className="text-sm text-slate-300">{metric.title}</span>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className={`text-xs font-medium ${metric.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {metric.change}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart section */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium text-slate-200">Konverteringsutvikling</h4>
          <div className="text-xs font-medium text-blue-400">Ukentlig oversikt</div>
        </div>
        <div className="h-32 flex items-end justify-between">
          {chartData.map((val, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${val}%` }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-gradient-to-t from-blue-600 to-blue-400 w-8 rounded-t"
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-500">
          <span>Uke 1</span>
          <span>Uke 2</span>
          <span>Uke 3</span>
          <span>Uke 4</span>
          <span>Uke 5</span>
          <span>Uke 6</span>
          <span>Uke 7</span>
          <span>Uke 8</span>
          <span>Uke 9</span>
          <span>Uke 10</span>
        </div>
      </div>

      {/* Campaigns table */}
      <div className="p-6">
        <h4 className="font-medium text-slate-200 mb-4">Aktive kampanjer</h4>
        <div className="overflow-hidden rounded-lg border border-slate-800">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="text-left p-3 text-xs font-medium text-slate-400">Kampanje</th>
                <th className="text-left p-3 text-xs font-medium text-slate-400">Ytelse</th>
                <th className="text-left p-3 text-xs font-medium text-slate-400">Budsjett</th>
                <th className="text-left p-3 text-xs font-medium text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((camp, i) => (
                <tr key={i} className="border-t border-slate-800">
                  <td className="p-3 text-sm">{camp.name}</td>
                  <td className="p-3">
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden mr-2">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{ width: `${camp.performance}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{camp.performance}%</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm">{camp.budget}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full">
                      {camp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 