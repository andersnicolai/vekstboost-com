import type { Locale } from '@/i18n/config'

interface SchemaData {
  organization: any
  website: any
  localBusiness: any
  services: any[]
}

export function generateSchemaData(locale: Locale): SchemaData {
  const baseUrl = 'https://vekstboost.com'
  
  // Lokaliserte data
  const localizedData = {
    no: {
      name: 'VekstBoost',
      description: 'Vi bygger strategiske nettsider for ambisiøse bedrifter - fra digitalt visittkort til din mest effektive salgsmedarbeider.',
      services: [
        'Nettside utvikling',
        'Digital markedsføring', 
        'SEO optimalisering',
        'Konverteringsoptimalisering',
        'Webdesign'
      ],
      address: {
        streetAddress: 'Oslo',
        postalCode: '1415',
        addressLocality: 'Oslo',
        addressCountry: 'NO'
      }
    },
    en: {
      name: 'VekstBoost',
      description: 'We build strategic websites for ambitious companies - from digital business cards to your most effective sales employee.',
      services: [
        'Website development',
        'Digital marketing',
        'SEO optimization', 
        'Conversion optimization',
        'Web design'
      ],
      address: {
        streetAddress: 'Oslo',
        postalCode: '1415',
        addressLocality: 'Oslo',
        addressCountry: 'NO'
      }
    },
    da: {
      name: 'VekstBoost',
      description: 'Vi bygger strategiske hjemmesider for ambitiøse virksomheder - fra digitalt visitkort til din mest effektive sælger.',
      services: [
        'Hjemmeside udvikling',
        'Digital markedsføring',
        'SEO optimering',
        'Konverteringsoptimering', 
        'Webdesign'
      ],
      address: {
        streetAddress: 'Oslo',
        postalCode: '1415',
        addressLocality: 'Oslo',
        addressCountry: 'NO'
      }
    },
    sv: {
      name: 'VekstBoost',
      description: 'Vi bygger strategiska webbplatser för ambitiösa företag - från digitala visitkort till din mest effektiva säljare.',
      services: [
        'Webbutveckling',
        'Digital marknadsföring',
        'SEO optimering',
        'Konverteringsoptimering',
        'Webbdesign'
      ],
      address: {
        streetAddress: 'Oslo',
        postalCode: '1415',
        addressLocality: 'Oslo',
        addressCountry: 'NO'
      }
    }
  }

  const data = localizedData[locale] || localizedData.no

  // Organization Schema
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    description: data.description,
    url: `${baseUrl}/${locale}`,
    logo: `${baseUrl}/images/vekstboost-logo.png`,
    image: `${baseUrl}/images/website-og-image.jpg`,
    telephone: '+47 411 66 326',
    email: 'nicolai@vekstboost.com',
    address: {
      '@type': 'PostalAddress',
      ...data.address
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '59.7848',
      longitude: '10.7911'
    },
    sameAs: [
      'https://facebook.com/vekstboost',
      'https://instagram.com/vekstboost', 
      'https://linkedin.com/company/vekstboost'
    ],
    founder: {
      '@type': 'Organization',
      name: 'Onedev Consultancy AS',
      url: 'https://onedevconsultancy.no'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Norway'
    },
    knowsAbout: data.services
  }

  // Website Schema
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    description: data.description,
    url: `${baseUrl}/${locale}`,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/${locale}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: data.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/vekstboost-logo.png`
      }
    },
    inLanguage: locale === 'no' ? 'nb-NO' : locale === 'en' ? 'en-US' : locale === 'da' ? 'da-DK' : 'sv-SE'
  }

  // LocalBusiness Schema
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#localbusiness`,
    name: data.name,
    description: data.description,
    url: `${baseUrl}/${locale}`,
    telephone: '+47 411 66 326',
    email: 'nicolai@vekstboost.com',
    address: {
      '@type': 'PostalAddress',
      ...data.address
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '59.7848',
      longitude: '10.7911'
    },
    openingHours: 'Mo-Fr 09:00-17:00',
    priceRange: '$$',
    currenciesAccepted: 'NOK',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    image: `${baseUrl}/images/website-og-image.jpg`,
    logo: `${baseUrl}/images/vekstboost-logo.png`,
    sameAs: [
      'https://facebook.com/vekstboost',
      'https://instagram.com/vekstboost',
      'https://linkedin.com/company/vekstboost'
    ]
  }

  // Service Schemas
  const services = data.services.map((serviceName, index) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}/#service-${index}`,
    name: serviceName,
    description: `Profesjonell ${serviceName.toLowerCase()} for bedrifter som ønsker vekst`,
    provider: {
      '@type': 'Organization',
      name: data.name,
      url: `${baseUrl}/${locale}`
    },
    areaServed: {
      '@type': 'Country',
      name: 'Norway'
    },
    serviceType: serviceName,
    category: 'Digital Marketing'
  }))

  return {
    organization,
    website,
    localBusiness,
    services
  }
}

export function generateSchemaScript(locale: Locale): string {
  const schemas = generateSchemaData(locale)
  
  // Kombiner alle schemas i en JSON-LD struktur
  const combinedSchema = [
    schemas.organization,
    schemas.website,
    schemas.localBusiness,
    ...schemas.services
  ]

  return JSON.stringify(combinedSchema, null, 2)
}


// Individual schema functions for page component
export function getOrganizationSchema(locale: Locale) {
  const schemas = generateSchemaData(locale)
  return schemas.organization
}

export function getWebsiteSchema(locale: Locale) {
  const schemas = generateSchemaData(locale)
  return schemas.website
}

export function getLocalBusinessSchema(locale: Locale) {
  const schemas = generateSchemaData(locale)
  return schemas.localBusiness
}
