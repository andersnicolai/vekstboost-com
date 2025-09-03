'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface EdgeOptimization {
  variant: string
  config: Record<string, any>
  personalization: Record<string, any>
  performance: {
    region: string
    processingTime: number
  }
}

interface EdgeAnalytics {
  success: boolean
  timestamp: number
  region: string
  processingTime: number
}

export default function EdgePerformanceOptimizer() {
  const pathname = usePathname()
  const [optimization, setOptimization] = useState<EdgeOptimization | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [performanceMetrics, setPerformanceMetrics] = useState<any>(null)

  useEffect(() => {
    // Initialize edge optimization
    const initializeOptimization = async () => {
      try {
        const response = await fetch('/api/edge-optimize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: pathname,
            experiment: 'hero-cta'
          })
        })

        if (response.ok) {
          const data = await response.json()
          setOptimization(data)
          
          // Apply optimizations immediately
          applyOptimizations(data)
        }
      } catch (error) {
        console.error('Failed to initialize edge optimization:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeOptimization()
  }, [pathname])

  useEffect(() => {
    // Track performance metrics
    const trackPerformanceMetrics = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        const paint = performance.getEntriesByType('paint')
        
        const metrics = {
          lcp: 0,
          fcp: 0,
          cls: 0,
          fid: 0,
          ttfb: navigation.responseStart - navigation.requestStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart
        }

        // Get First Contentful Paint
        const fcp = paint.find(p => p.name === 'first-contentful-paint')
        if (fcp) metrics.fcp = fcp.startTime

        // Get Largest Contentful Paint
        if ('LargestContentfulPaint' in window) {
          new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries()
            const lastEntry = entries[entries.length - 1]
            if (lastEntry) {
              metrics.lcp = lastEntry.startTime
              setPerformanceMetrics(metrics)
              sendAnalytics(metrics)
            }
          }).observe({ entryTypes: ['largest-contentful-paint'] })
        }

        // Get Cumulative Layout Shift
        if ('LayoutShift' in window) {
          let clsValue = 0
          new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value
              }
            }
            metrics.cls = clsValue
          }).observe({ entryTypes: ['layout-shift'] })
        }

        // Get First Input Delay
        if ('FirstInputDelay' in window) {
          new PerformanceObserver((entryList) => {
            const firstInput = entryList.getEntries()[0]
            if (firstInput) {
              metrics.fid = (firstInput as any).processingStart - firstInput.startTime
            }
          }).observe({ entryTypes: ['first-input'] })
        }

        // Send initial metrics after a delay
        setTimeout(() => {
          setPerformanceMetrics(metrics)
          sendAnalytics(metrics)
        }, 3000)
      }
    }

    trackPerformanceMetrics()
  }, [])

  const applyOptimizations = (data: EdgeOptimization) => {
    if (typeof window === 'undefined') return

    // Apply image quality optimizations
    if (data.config.enableWebP) {
      document.documentElement.classList.add('webp-enabled')
    }
    
    if (data.config.enableAVIF) {
      document.documentElement.classList.add('avif-enabled')
    }

    // Apply lazy loading preferences
    if (data.config.enableLazyLoading) {
      document.documentElement.classList.add('lazy-loading-enabled')
    }

    // Apply device-specific optimizations
    if (data.config.deferNonCritical) {
      document.documentElement.classList.add('defer-non-critical')
    }

    // Apply personalization
    if (data.personalization.currency) {
      document.documentElement.setAttribute('data-currency', data.personalization.currency)
    }

    if (data.personalization.language) {
      document.documentElement.setAttribute('data-language', data.personalization.language)
    }

    // Apply A/B test variant
    if (data.variant !== 'control') {
      document.documentElement.setAttribute('data-variant', data.variant)
    }

    // Log optimization applied
    console.log('Edge optimizations applied:', {
      variant: data.variant,
      region: data.performance.region,
      processingTime: data.performance.processingTime,
      optimizations: Object.keys(data.config).filter(key => data.config[key])
    })
  }

  const sendAnalytics = async (metrics: any) => {
    try {
      const response = await fetch('/api/edge-analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: 'performance-metrics',
          page: pathname,
          timestamp: Date.now(),
          performance: metrics
        })
      })

      if (response.ok) {
        const analyticsData = await response.json()
        console.log('Analytics sent to edge:', analyticsData)
      }
    } catch (error) {
      console.error('Failed to send analytics:', error)
    }
  }

  // This component doesn't render anything - it's purely for optimization
  return null
} 