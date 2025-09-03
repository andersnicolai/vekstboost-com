import { NextRequest, NextResponse } from 'next/server'

// Use Edge Runtime for maximum performance
export const runtime = 'edge'

interface OptimizationRequest {
  page: string
  component?: string
  experiment?: string
}

interface OptimizationResponse {
  variant: string
  config: Record<string, any>
  personalization: Record<string, any>
  performance: {
    region: string
    processingTime: number
  }
}

export async function POST(request: NextRequest) {
  const start = Date.now()
  
  try {
    const body = await request.json() as OptimizationRequest
    
    // Get edge context
    const country = request.headers.get('x-vercel-ip-country') || 'NO'
    const city = request.headers.get('x-vercel-ip-city')
    const userAgent = request.headers.get('user-agent') || ''
    const region = process.env.VERCEL_REGION || 'fra1'
    
    // Determine device type for optimization
    const isMobile = /Mobile|Android|iPhone/i.test(userAgent)
    const isTablet = /Tablet|iPad/i.test(userAgent)
    const isBot = /bot|crawler|spider/i.test(userAgent)
    
    // A/B Testing Logic
    let variant = 'control'
    if (!isBot) {
      // Simple hash-based A/B testing
      const hash = await hashString(request.headers.get('x-forwarded-for') || 'default')
      const testGroup = hash % 100
      
      switch (body.experiment) {
        case 'hero-cta':
          variant = testGroup < 50 ? 'variant-a' : 'variant-b'
          break
        case 'pricing-display':
          variant = testGroup < 33 ? 'control' : testGroup < 66 ? 'variant-a' : 'variant-b'
          break
        default:
          variant = 'control'
      }
    }
    
    // Personalization based on geolocation
    const personalization: Record<string, any> = {
      currency: getCurrencyByCountry(country),
      language: getLanguageByCountry(country),
      timezone: getTimezoneByCountry(country),
      localizedContent: getLocalizedContent(country, body.page),
      priorityFeatures: getPriorityFeatures(country, isMobile)
    }
    
    // Performance optimizations
    const config: Record<string, any> = {
      enableLazyLoading: isMobile,
      imageQuality: isMobile ? 75 : 85,
      enableWebP: true,
      enableAVIF: !isMobile, // AVIF for desktop only for now
      prefetchStrategy: isMobile ? 'minimal' : 'aggressive',
      criticalCSS: getCriticalCSS(body.page, isMobile),
      deferNonCritical: isMobile
    }
    
    const response: OptimizationResponse = {
      variant,
      config,
      personalization,
      performance: {
        region,
        processingTime: Date.now() - start
      }
    }
    
    const nextResponse = NextResponse.json(response)
    
    // Cache optimization results for 1 hour
    nextResponse.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600')
    nextResponse.headers.set('Vary', 'User-Agent, X-Vercel-IP-Country')
    nextResponse.headers.set('X-Edge-Function', 'optimize')
    nextResponse.headers.set('X-Variant', variant)
    nextResponse.headers.set('X-Country', country)
    nextResponse.headers.set('X-Processing-Time', `${Date.now() - start}ms`)
    
    return nextResponse
    
  } catch (error) {
    console.error('Edge Optimization Error:', error)
    
    return NextResponse.json(
      { 
        error: 'Optimization failed',
        variant: 'control',
        config: getDefaultConfig(),
        personalization: getDefaultPersonalization(),
        performance: {
          region: process.env.VERCEL_REGION || 'unknown',
          processingTime: Date.now() - start
        }
      },
      { status: 500 }
    )
  }
}

// Helper functions
async function hashString(str: string): Promise<number> {
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = new Uint8Array(hashBuffer)
  return hashArray[0] + (hashArray[1] << 8) + (hashArray[2] << 16)
}

function getCurrencyByCountry(country: string): string {
  const currencyMap: Record<string, string> = {
    'NO': 'NOK',
    'SE': 'SEK',
    'DK': 'DKK',
    'US': 'USD',
    'GB': 'GBP',
    'DE': 'EUR',
    'FR': 'EUR',
    'ES': 'EUR',
    'IT': 'EUR'
  }
  return currencyMap[country] || 'NOK'
}

function getLanguageByCountry(country: string): string {
  const languageMap: Record<string, string> = {
    'NO': 'no',
    'SE': 'sv',
    'DK': 'dk',
    'US': 'en',
    'GB': 'en',
    'CA': 'en',
    'AU': 'en'
  }
  return languageMap[country] || 'no'
}

function getTimezoneByCountry(country: string): string {
  const timezoneMap: Record<string, string> = {
    'NO': 'Europe/Oslo',
    'SE': 'Europe/Stockholm',
    'DK': 'Europe/Copenhagen',
    'US': 'America/New_York',
    'GB': 'Europe/London'
  }
  return timezoneMap[country] || 'Europe/Oslo'
}

function getLocalizedContent(country: string, page: string): Record<string, any> {
  return {
    showLocalTestimonials: ['NO', 'SE', 'DK'].includes(country),
    showInternationalCaseStudies: ['US', 'GB', 'CA'].includes(country),
    emphasizeLocalPresence: country === 'NO',
    showCurrencyInPricing: true,
    localBusinessHours: getBusinessHours(country)
  }
}

function getPriorityFeatures(country: string, isMobile: boolean): string[] {
  const baseFeatures = ['performance', 'security', 'seo']
  
  if (isMobile) {
    baseFeatures.push('mobile-optimization', 'fast-loading')
  }
  
  if (['NO', 'SE', 'DK'].includes(country)) {
    baseFeatures.push('gdpr-compliance', 'local-hosting')
  }
  
  return baseFeatures
}

function getCriticalCSS(page: string, isMobile: boolean): string[] {
  const baseCritical = ['layout', 'typography', 'colors']
  
  if (page === 'homepage') {
    baseCritical.push('hero', 'navigation')
  }
  
  if (isMobile) {
    baseCritical.push('mobile-nav', 'touch-targets')
  }
  
  return baseCritical
}

function getBusinessHours(country: string): string {
  const hoursMap: Record<string, string> = {
    'NO': '09:00-17:00 CET',
    'SE': '09:00-17:00 CET',
    'DK': '09:00-17:00 CET',
    'US': '09:00-17:00 EST',
    'GB': '09:00-17:00 GMT'
  }
  return hoursMap[country] || '09:00-17:00 CET'
}

function getDefaultConfig(): Record<string, any> {
  return {
    enableLazyLoading: true,
    imageQuality: 85,
    enableWebP: true,
    enableAVIF: false,
    prefetchStrategy: 'minimal',
    criticalCSS: ['layout', 'typography'],
    deferNonCritical: true
  }
}

function getDefaultPersonalization(): Record<string, any> {
  return {
    currency: 'NOK',
    language: 'no',
    timezone: 'Europe/Oslo',
    localizedContent: {
      showLocalTestimonials: true,
      emphasizeLocalPresence: true
    },
    priorityFeatures: ['performance', 'security']
  }
} 