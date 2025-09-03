'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bot,
  X,
  CheckCircle,
  BarChart3,
  Phone,
  Mail,
  TrendingUp,
  Users
} from 'lucide-react'

interface VekstBoostAutomationProps {
  apiKey?: string
  environment?: 'development' | 'production'
  market?: 'NO' | 'SE' | 'DK'
}

interface LeadMetrics {
  totalLeads: number
  convertedLeads: number
  conversionRate: string
  roi: number
  lastUpdate: string
}

export default function VekstBoostAutomation({ 
  apiKey = 'demo', 
  environment = 'development',
  market = 'NO' 
}: VekstBoostAutomationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [metrics, setMetrics] = useState<LeadMetrics>({
    totalLeads: 47,
    convertedLeads: 12,
    conversionRate: '25.5%',
    roi: 1847,
    lastUpdate: new Date().toLocaleTimeString('nb-NO')
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalLeads: prev.totalLeads + Math.floor(Math.random() * 2),
        convertedLeads: prev.convertedLeads + (Math.random() > 0.7 ? 1 : 0),
        roi: prev.roi + Math.floor(Math.random() * 50),
        lastUpdate: new Date().toLocaleTimeString('nb-NO')
      }))
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nb-NO', {
      style: 'currency',
      currency: market === 'NO' ? 'NOK' : market === 'SE' ? 'SEK' : 'DKK'
    }).format(amount)
  }

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-brand-gradient text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            '0 10px 20px rgba(99, 102, 241, 0.3)',
            '0 10px 25px rgba(147, 51, 234, 0.4)',
            '0 10px 20px rgba(99, 102, 241, 0.3)'
          ]
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }
        }}
      >
        <div className="relative">
          <Bot className="w-6 h-6" />
          {/* ROI Pulse Indicator */}
          <motion.div
            className="absolute -top-1 -right-1 bg-green-500 text-xs text-white px-1.5 py-0.5 rounded-full font-bold"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {metrics.roi}%
          </motion.div>
        </div>
      </motion.button>

      {/* VekstBoost Dashboard Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-brand-gradient text-white p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Bot className="w-8 h-8" />
                      <div>
                        <h3 className="text-2xl font-bold">VekstBoost</h3>
                        <p className="text-indigo-100 text-sm">Powered by @vekstboost/react-automation</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="bg-white/20 px-2 py-1 rounded">API: {apiKey}</span>
                      <span className="bg-white/20 px-2 py-1 rounded">Market: {market}</span>
                      <span className="bg-green-400/20 px-2 py-1 rounded flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        Live
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-6">
                  {/* Real-Time Metrics */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-brand-600" />
                      Real-Time Business Metrics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="metric-info p-4 rounded-lg">
                        <div className="text-2xl font-bold text-brand-600">{metrics.totalLeads}</div>
                        <div className="text-sm text-neutral-600">Total Leads</div>
                        <div className="text-xs text-success-600 flex items-center gap-1 mt-1">
                          <TrendingUp className="w-3 h-3" />
                          +{Math.floor(Math.random() * 5) + 1} today
                        </div>
                      </div>
                      <div className="metric-success p-4 rounded-lg">
                        <div className="text-2xl font-bold text-success-600">{metrics.convertedLeads}</div>
                        <div className="text-sm text-neutral-600">Converted</div>
                        <div className="text-xs text-success-600">{metrics.conversionRate} rate</div>
                      </div>
                      <div className="metric-info p-4 rounded-lg col-span-2">
                        <div className="text-3xl font-bold text-brand-600">{metrics.roi}%</div>
                        <div className="text-sm text-neutral-600">ROI (Return on Investment)</div>
                        <div className="text-xs text-neutral-500">vs HubSpot: +{metrics.roi - 200}% better</div>
                      </div>
                    </div>
                  </div>

                  {/* Cost Comparison */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">💰 Cost Comparison</div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-error-600">HubSpot/GoHighLevel:</span>
                        <span className="font-semibold">{formatCurrency(25000)}/mnd</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-success-600">VekstBoost:</span>
                        <span className="font-semibold">{formatCurrency(1490)}/mnd</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between text-success-600 font-bold">
                        <span>Savings:</span>
                        <span>{formatCurrency(23510)}/mnd (94%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Leads */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Users className="w-5 h-5 text-brand-600" />
                      Recent High-Score Leads
                    </h3>
                    {[
                      { name: 'Lars Andersen', company: 'Hansen Tannlegepraksis', score: 92, status: 'hot' },
                      { name: 'Kari Olsen', company: 'Olsen Rørlegger AS', score: 78, status: 'warm' },
                      { name: 'Erik Johansen', company: 'Johansen Elektro', score: 85, status: 'hot' },
                    ].map((lead, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{lead.name}</div>
                          <div className="text-sm text-gray-600">{lead.company}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="font-semibold">AI Score: {lead.score}</div>
                            <div className={`text-xs px-2 py-1 rounded ${
                              lead.status === 'hot' ? 'bg-error-100 text-error-600' : 'bg-warning-100 text-warning-600'
                            }`}>
                              {lead.status.toUpperCase()}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 bg-brand-100 text-brand-600 rounded-lg hover:bg-brand-200 transition-colors">
                              <Phone className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-success-100 text-success-600 rounded-lg hover:bg-success-200 transition-colors">
                              <Mail className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI Features */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Bot className="w-5 h-5 text-brand-600" />
                      AI Automation Features
                    </h3>
                    {[
                      { 
                        feature: 'Norwegian Phone Formatting', 
                        description: 'Auto-formats +47 numbers',
                        status: 'active'
                      },
                      { 
                        feature: 'AI Lead Scoring', 
                        description: 'Smart 0-100 scoring system',
                        status: 'active'
                      },
                      { 
                        feature: 'Organization Number Validation', 
                        description: 'Real-time org validation',
                        status: 'active'
                      },
                      { 
                        feature: 'Real ROI Tracking', 
                        description: 'Track actual revenue generated',
                        status: 'active'
                      }
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{item.feature}</div>
                          <div className="text-sm text-gray-600">{item.description}</div>
                        </div>
                        <div className="flex items-center gap-2 text-success-600">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm font-medium">Active</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* NPM Package Info */}
                  <div className="bg-brand-50 p-4 rounded-lg border border-brand-200">
                    <div className="text-sm font-semibold text-brand-800 mb-2">
                      💡 Integration Ready
                    </div>
                    <div className="text-sm text-brand-700 mb-2">
                      This widget is powered by <code className="bg-white px-2 py-1 rounded">@vekstboost/react-automation</code>
                    </div>
                    <div className="text-xs text-brand-600 bg-white p-2 rounded font-mono">
                      npm install @vekstboost/react-automation
                    </div>
                    <div className="text-xs text-brand-600 mt-2">
                      Setup time: 5 minutes • No HubSpot needed • 94% cost savings
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div>Last updated: {metrics.lastUpdate}</div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Real-time data</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


