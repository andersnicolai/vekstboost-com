import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

// Use Node.js runtime for revalidation API
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')
  const secret = searchParams.get('secret')
  
  // Validate secret to prevent unauthorized revalidation
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }
  
  try {
    // Revalidate specific path or all paths
    if (path) {
      revalidatePath(path)
    } else {
      // Revalidate all main paths
      const paths = [
        '/no',
        '/en', 
        '/da',
        '/sv',
        '/no/kontakt',
        '/en/kontakt',
        '/da/kontakt',
        '/sv/kontakt',
        '/no/lag-nettside',
        '/en/lag-nettside',
        '/da/lag-nettside',
        '/no/leads',
        '/en/leads',
        '/da/leads',
        '/sv/leads',
        '/no/getstarted',
        '/en/getstarted',
        '/da/getstarted',
        '/sv/getstarted',
      ]
      
      paths.forEach(path => revalidatePath(path))
    }
    
    return NextResponse.json({ 
      message: 'Revalidation successful', 
      timestamp: new Date().toISOString(),
      path: path || 'all paths'
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ 
      message: 'Revalidation failed', 
      error: error.message 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
} 