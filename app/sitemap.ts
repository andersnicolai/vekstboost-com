import { MetadataRoute } from 'next'

// CRITICAL: Force sitemap regeneration - Cache bust: July 3rd 2025 17:00 UTC
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vekstboost.com'
  // Use current date for proper search engine indexing
  const currentDate = new Date()
  
  // ONLY include pages that actually exist - NO 404s allowed!
  const locales = ['no', 'en', 'da', 'sv']
  
  // Language-specific routes
  const routes = {
    no: {
      '': { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
      'kontakt': { path: '/kontakt', priority: 0.9, changeFrequency: 'monthly' as const },
      'lag-nettside': { path: '/lag-nettside', priority: 0.8, changeFrequency: 'monthly' as const },
      'leads': { path: '/leads', priority: 0.8, changeFrequency: 'monthly' as const },
      'getstarted': { path: '/getstarted', priority: 0.9, changeFrequency: 'monthly' as const },
      'tannlege-markedsforing': { path: '/tannlege-markedsforing', priority: 0.7, changeFrequency: 'monthly' as const },
      'takk': { path: '/takk', priority: 0.3, changeFrequency: 'yearly' as const },
    },
    en: {
      '': { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
      'kontakt': { path: '/kontakt', priority: 0.9, changeFrequency: 'monthly' as const }, // Keep as kontakt for now
      'lag-nettside': { path: '/lag-nettside', priority: 0.8, changeFrequency: 'monthly' as const }, // Keep existing
      'leads': { path: '/leads', priority: 0.8, changeFrequency: 'monthly' as const },
      'getstarted': { path: '/getstarted', priority: 0.9, changeFrequency: 'monthly' as const },
      'tannlege-markedsforing': { path: '/tannlege-markedsforing', priority: 0.7, changeFrequency: 'monthly' as const },
      'takk': { path: '/takk', priority: 0.3, changeFrequency: 'yearly' as const },
    },
    da: {
      '': { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
      'kontakt': { path: '/kontakt', priority: 0.9, changeFrequency: 'monthly' as const },
      'lag-nettside': { path: '/lag-nettside', priority: 0.8, changeFrequency: 'monthly' as const },
      'leads': { path: '/leads', priority: 0.8, changeFrequency: 'monthly' as const },
      'getstarted': { path: '/getstarted', priority: 0.9, changeFrequency: 'monthly' as const },
      'tannlege-markedsforing': { path: '/tannlege-markedsforing', priority: 0.7, changeFrequency: 'monthly' as const },
      'takk': { path: '/takk', priority: 0.3, changeFrequency: 'yearly' as const },
    },
    sv: {
      '': { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
      'kontakt': { path: '/kontakt', priority: 0.9, changeFrequency: 'monthly' as const },
      'lag-nettside': { path: '/lag-nettside', priority: 0.8, changeFrequency: 'monthly' as const },
      'leads': { path: '/leads', priority: 0.8, changeFrequency: 'monthly' as const },
      'getstarted': { path: '/getstarted', priority: 0.9, changeFrequency: 'monthly' as const },
      'tannlege-markedsforing': { path: '/tannlege-markedsforing', priority: 0.7, changeFrequency: 'monthly' as const },
      'takk': { path: '/takk', priority: 0.3, changeFrequency: 'yearly' as const },
    }
  }
  
  // Generate sitemap entries
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  // Add main pages for each locale
  locales.forEach(locale => {
    const localeRoutes = routes[locale as keyof typeof routes]
    Object.values(localeRoutes).forEach(page => {
      const url = `${baseUrl}/${locale}${page.path}`
      
      // Generate alternates for all locales
      const alternates: Record<string, string> = {}
      locales.forEach(altLocale => {
        const altRoutes = routes[altLocale as keyof typeof routes]
        const altPage = Object.values(altRoutes).find(p => p.priority === page.priority)
        alternates[altLocale] = `${baseUrl}/${altLocale}${altPage?.path || page.path}`
      })
      
      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: alternates
        }
      })
    })
  })
  
  // Add root redirect (will redirect to /no)
  sitemapEntries.push({
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 1.0,
  })
  
  return sitemapEntries
} 