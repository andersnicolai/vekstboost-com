import { NextRequest, NextResponse } from 'next/server'

// Use Edge Runtime for ultra-fast form processing
export const runtime = 'edge'

interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
  phone?: string
  service?: string
  budget?: string
  source?: string
}

export async function POST(request: NextRequest) {
  const start = Date.now()
  
  try {
    const body = await request.json() as ContactFormData
    
    // Get edge context for spam protection
    const country = request.headers.get('x-vercel-ip-country') || 'unknown'
    const userAgent = request.headers.get('user-agent') || ''
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const referer = request.headers.get('referer') || ''
    
    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }
    
    // Spam protection - basic checks
    const spamScore = calculateSpamScore(body, userAgent, country, referer)
    if (spamScore > 0.7) {
      console.log('Potential spam detected:', { spamScore, ip, country, userAgent: userAgent.substring(0, 100) })
      return NextResponse.json(
        { error: 'Request rejected by spam filter' },
        { status: 429 }
      )
    }
    
    // Enhanced form data for processing
    const enhancedFormData = {
      ...body,
      metadata: {
        timestamp: Date.now(),
        ip,
        country,
        userAgent: userAgent.substring(0, 200),
        referer,
        processingRegion: process.env.VERCEL_REGION || 'unknown',
        spamScore,
        processingTime: Date.now() - start
      }
    }
    
    // In a real implementation, you'd send this to your CRM, email service, etc.
    // For now, we'll just log it
    console.log('Edge Contact Form Submission:', JSON.stringify(enhancedFormData, null, 2))
    
    // Simulate processing time (in real implementation this would be sending to email service)
    await new Promise(resolve => setTimeout(resolve, 50))
    
    const response = NextResponse.json({
      success: true,
      message: 'Takk for din henvendelse! Vi tar kontakt snart.',
      id: generateSubmissionId(),
      metadata: {
        region: process.env.VERCEL_REGION || 'unknown',
        processingTime: Date.now() - start,
        country
      }
    })
    
    // Set appropriate headers
    response.headers.set('Cache-Control', 'no-store, must-revalidate')
    response.headers.set('X-Edge-Function', 'contact')
    response.headers.set('X-Processing-Time', `${Date.now() - start}ms`)
    response.headers.set('X-Spam-Score', spamScore.toString())
    
    return response
    
  } catch (error) {
    console.error('Edge Contact Form Error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to process contact form',
        message: 'Det oppstod en feil. Prøv igjen senere.',
        metadata: {
          processingTime: Date.now() - start
        }
      },
      { status: 500 }
    )
  }
}

// Spam protection scoring
function calculateSpamScore(
  data: ContactFormData,
  userAgent: string,
  country: string,
  referer: string
): number {
  let score = 0
  
  // Check for suspicious patterns in message
  const suspiciousPatterns = [
    /\b(viagra|cialis|casino|poker|bitcoin|crypto|investment|loan|SEO|backlink)\b/i,
    /https?:\/\/[^\s]+/g, // URLs in message
    /\b\d{10,}\b/g, // Phone numbers
    /@[^\s]+\.[^\s]+/g, // Email addresses
  ]
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(data.message)) {
      score += 0.2
    }
  }
  
  // Check message length (too short or too long)
  if (data.message.length < 10) score += 0.3
  if (data.message.length > 2000) score += 0.2
  
  // Check for missing name patterns
  if (data.name.length < 2) score += 0.3
  if (!/[a-zA-Z]/.test(data.name)) score += 0.3
  
  // Check for bot-like user agents
  if (/bot|crawler|spider|scraper/i.test(userAgent)) {
    score += 0.5
  }
  
  // Check for suspicious countries (adjust based on your target audience)
  const suspiciousCountries = ['XX', 'ZZ'] // Add actual country codes if needed
  if (suspiciousCountries.includes(country)) {
    score += 0.2
  }
  
  // Check for missing referer (might be bot)
  if (!referer || referer === '') {
    score += 0.1
  }
  
  // Check for duplicate content patterns
  if (data.name === data.email || data.name === data.message) {
    score += 0.4
  }
  
  return Math.min(score, 1.0) // Cap at 1.0
}

// Generate unique submission ID
function generateSubmissionId(): string {
  const timestamp = Date.now().toString(36)
  const randomPart = Math.random().toString(36).substring(2, 8)
  return `contact_${timestamp}_${randomPart}`
}

export async function GET(request: NextRequest) {
  // Health check endpoint
  return NextResponse.json({
    status: 'healthy',
    timestamp: Date.now(),
    region: process.env.VERCEL_REGION || 'unknown',
    country: request.headers.get('x-vercel-ip-country') || 'unknown'
  })
} 