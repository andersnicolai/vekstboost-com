import type { Dictionary } from '@/types/dictionary'
import no from '@/i18n/no.json'
import en from '@/i18n/en.json'
import sv from '@/i18n/sv'
import dk from '@/i18n/dk'

const dictionaries = {
  'no': no,
  'en': en,
  'sv': sv,
  'dk': dk
}

// Add missing properties to match the Dictionary type
const enhanceDict = (dict: any): Dictionary => {
  return {
    lang: dict.lang || 'no',
    title: dict.title || 'VekstBoost',
    metadata: dict.metadata || {
      title: 'VekstBoost - Digital Markedsføring',
      description: 'Vi hjelper bedrifter med å vokse gjennom digital markedsføring og teknologi.'
    },
    header: dict.header || {
      nav: {
        home: 'Hjem',
        services: 'Tjenester',
        about: 'Om Oss',
        contact: 'Kontakt',
        results: 'Resultater',
        pricing: 'Priser'
      },
      contact: {
        email: 'nicolai@vekstboost.com',
        phone: '+47 411 66 326'
      }
    },
    website: dict.website || {
      hero: {
        title: 'Vekst for din bedrift',
        subtitle: 'Vi hjelper deg å vokse digitalt',
        cta: 'Kontakt oss'
      }
    },
    services: dict.services || {},
    ...dict
  }
}

export async function getDictionary(locale: string): Promise<Dictionary> {
  // Ensure we have a valid locale, default to Norwegian
  const validLocale = locale in dictionaries ? locale : 'no'
  
  // Get the dictionary for the locale and enhance it
  const rawDictionary = dictionaries[validLocale as keyof typeof dictionaries]
  return enhanceDict(rawDictionary)
}

export { no, en, sv, dk } 