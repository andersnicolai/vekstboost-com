import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from './i18n/config'

// Remove the runtime export for middleware - it's handled automatically
// export const runtime = 'edge'

export function middleware(request: NextRequest) {
  const start = Date.now()
  const pathname = request.nextUrl.pathname
  const url = request.nextUrl.clone()
  
  // Skip all internal paths and static files with early return
  if (pathname.includes('/_next/') || 
      pathname.includes('/api/') || 
      pathname === '/favicon.ico' ||
      pathname === '/favicon.svg' ||
      pathname.match(/\.(jpg|jpeg|png|gif|svg|js|css|woff|woff2|ico|webp|avif)$/)) {
    return NextResponse.next()
  }
  
  // Allow direct access to sitemap and robots
  if (pathname === '/sitemap.xml' || pathname === '/robots.txt') {
    return NextResponse.next()
  }
  
  // Get geolocation and user info from headers
  const country = request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry') || 'NO'
  const city = request.headers.get('x-vercel-ip-city')
  const userAgent = request.headers.get('user-agent') || ''
  const isBot = /bot|crawler|spider|crawling/i.test(userAgent)
  
  // Smart www redirect with caching
  const host = request.headers.get('host')
  if (host?.startsWith('www.')) {
    const newUrl = url.clone()
    newUrl.host = host.replace('www.', '')
    const response = NextResponse.redirect(newUrl, 301)
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    return response
  }
  
  // Determine optimal locale based on geolocation
  let detectedLocale = i18n.defaultLocale
  if (!isBot) {
    switch (country) {
      case 'SE':
        detectedLocale = 'sv'
        break
      case 'DK':
        detectedLocale = 'dk'
        break
      case 'US':
      case 'GB':
      case 'CA':
      case 'AU':
        detectedLocale = 'en'
        break
      default:
        detectedLocale = 'no'
    }
  }
  
  // Check if path has a locale
  const pathnameHasLocale = i18n.locales.some(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )
  
  // If no locale, redirect to detected locale with caching
  if (!pathnameHasLocale) {
    url.pathname = `/${detectedLocale}${pathname.startsWith('/') ? '' : '/'}${pathname}`
    const response = NextResponse.redirect(url, 307) // Temporary redirect for geo-based routing
    
    // Add performance headers
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400')
    response.headers.set('Vary', 'Accept-Encoding, User-Agent, CF-IPCountry')
    
    return response
  }
  
  // Continue processing with edge optimizations
  const response = NextResponse.next()
  
  // Add edge performance headers
  response.headers.set('X-Edge-Location', country || 'unknown')
  response.headers.set('X-Edge-Cache', 'MISS')
  response.headers.set('X-Response-Time', `${Date.now() - start}ms`)
  
  // Add security headers at edge
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()')
  
  // Early hints for critical resources
  response.headers.set('Link', [
    '</assets/images/logo/onedev-logo.png>; rel=preload; as=image; fetchpriority=high',
    '<https://fonts.googleapis.com>; rel=preconnect',
    '<https://fonts.gstatic.com>; rel=preconnect; crossorigin',
    '<https://static.wixstatic.com>; rel=preconnect'
  ].join(', '))
  
  // Add canonical header for SEO
  const canonicalUrl = `https://vekstboost.com${pathname}`
  response.headers.set('Link', `<${canonicalUrl}>; rel="canonical"`)
  
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|favicon\\.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js)$).*)',
  ],
} 