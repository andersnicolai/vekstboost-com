import { MetadataRoute } from 'next'

// CRITICAL: Force sitemap regeneration - Cache bust: July 3rd 2025 17:00 UTC
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vekstboost.com'
  // Use current date for proper search engine indexing
  const currentDate = new Date()
  
  // ONLY include pages that actually exist - NO 404s allowed!
  const locales = ['no', 'en', 'da', 'sv']
  
  // CONFIRMED EXISTING PAGES ONLY
  const existingPages = [
    {
      path: '',
      priority: 1.0,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/kontakt',
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/lag-nettside',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/leads',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/getstarted',
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/tannlege-markedsforing',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/takk',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
  ]
  
  // Generate sitemap entries
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  // Add main pages for each locale
  locales.forEach(locale => {
    existingPages.forEach(page => {
      const url = `${baseUrl}/${locale}${page.path}`
      
      // Generate alternates for all locales
      const alternates: Record<string, string> = {}
      locales.forEach(altLocale => {
        alternates[altLocale] = `${baseUrl}/${altLocale}${page.path}`
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