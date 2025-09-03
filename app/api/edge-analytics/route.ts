import { NextRequest, NextResponse } from 'next/server'

// Use Edge Runtime for ultra-fast response
export const runtime = 'edge'

interface AnalyticsEvent {
  event: string
  page: string
  timestamp: number
  country?: string
  userAgent?: string
  performance?: {
    lcp?: number
    fcp?: number
    cls?: number
    fid?: number
  }
}

export async function POST(request: NextRequest) {
  const start = Date.now()
  
  try {
    const body = await request.json() as AnalyticsEvent
    
    // Get edge location info
    const country = request.headers.get('x-vercel-ip-country') || 'unknown'
    const city = request.headers.get('x-vercel-ip-city') || 'unknown'
    const userAgent = request.headers.get('user-agent') || ''
    
    // Enhance event with edge data
    const enhancedEvent = {
      ...body,
      timestamp: Date.now(),
      country,
      city,
      userAgent: userAgent.substring(0, 200), // Truncate for performance
      edgeRegion: process.env.VERCEL_REGION || 'unknown',
      edgeProcessingTime: Date.now() - start
    }
    
    // For demo purposes, just log the event
    // In production, you'd send this to your analytics service
    console.log('Edge Analytics Event:', JSON.stringify(enhancedEvent, null, 2))
    
    // Return success response with edge headers
    const response = NextResponse.json({ 
      success: true, 
      timestamp: enhancedEvent.timestamp,
      region: enhancedEvent.edgeRegion,
      processingTime: enhancedEvent.edgeProcessingTime
    })
    
    // Add performance headers
    response.headers.set('Cache-Control', 'no-store, must-revalidate')
    response.headers.set('X-Edge-Function', 'analytics')
    response.headers.set('X-Processing-Time', `${Date.now() - start}ms`)
    
    return response
    
  } catch (error) {
    console.error('Edge Analytics Error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process analytics event',
        processingTime: Date.now() - start
      },
      { status: 400 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Health check endpoint
  const start = Date.now()
  
  return NextResponse.json({
    status: 'healthy',
    timestamp: Date.now(),
    region: process.env.VERCEL_REGION || 'unknown',
    country: request.headers.get('x-vercel-ip-country') || 'unknown',
    processingTime: Date.now() - start
  })
} 