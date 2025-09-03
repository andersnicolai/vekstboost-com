// Language-specific URL routing
// This maps Norwegian URLs to their English equivalents

export const routes = {
  // Norwegian (default)
  no: {
    'lag-nettside': 'lag-nettside', // Keep Norwegian
    'kontakt': 'kontakt',
    'leads': 'leads', 
    'getstarted': 'getstarted',
    'takk': 'takk',
    'tannlege-markedsforing': 'tannlege-markedsforing'
  },
  
  // English translations
  en: {
    'lag-nettside': 'create-website', // Translated URL
    'kontakt': 'contact',
    'leads': 'leads',
    'getstarted': 'get-started', 
    'takk': 'thank-you',
    'tannlege-markedsforing': 'dental-marketing'
  },
  
  // Danish translations  
  da: {
    'lag-nettside': 'opret-hjemmeside',
    'kontakt': 'kontakt',
    'leads': 'leads',
    'getstarted': 'kom-i-gang',
    'takk': 'tak', 
    'tannlege-markedsforing': 'tandlaege-markedsfoering'
  },
  
  // Swedish translations
  sv: {
    'lag-nettside': 'skapa-hemsida',
    'kontakt': 'kontakt', 
    'leads': 'leads',
    'getstarted': 'komma-igang',
    'takk': 'tack',
    'tannlege-markedsforing': 'tandlakare-marknadsfoering'
  }
}

// Helper function to get localized route
export function getLocalizedRoute(path: string, locale: string): string {
  const routeMap = routes[locale as keyof typeof routes]
  if (!routeMap) return path
  
  // Remove leading slash and get the base path
  const cleanPath = path.replace('/', '')
  
  // Find the route mapping
  for (const [noPath, localizedPath] of Object.entries(routeMap)) {
    if (cleanPath === noPath) {
      return localizedPath
    }
  }
  
  return path
}

// Reverse mapping - get Norwegian path from localized path
export function getNorwegianRoute(localizedPath: string, locale: string): string {
  const routeMap = routes[locale as keyof typeof routes]
  if (!routeMap) return localizedPath
  
  for (const [noPath, localized] of Object.entries(routeMap)) {
    if (localized === localizedPath) {
      return noPath
    }
  }
  
  return localizedPath
}