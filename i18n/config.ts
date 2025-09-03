export type Locale = 'no' | 'en' | 'sv' | 'dk'

export const i18n = {
  defaultLocale: 'no' as Locale,
  locales: ['no', 'en', 'sv', 'dk'] as Locale[],
} as const;

export const localeLabels: Record<Locale, string> = {
  no: 'Norsk',
  en: 'English',
  sv: 'Svenska',
  dk: 'Dansk'
};

export const localeFlags: Record<Locale, string> = {
  no: '🇳🇴',
  en: '🇬🇧',
  sv: '🇸🇪',
  dk: '🇩🇰'
};

export const languageNames: Record<Locale, string> = {
  no: 'Norsk',
  en: 'English',
  sv: 'Svenska',
  dk: 'Dansk'
};

export const routeMap: Record<Locale, Record<string, string>> = {
  no: {
    'about': 'om-oss',
    'services': 'tjenester',
    'contact': 'kontakt',
    'case-studies': 'kundehistorier',
    'articles': 'artikler',
    'pricing': 'priser',
    'results': 'resultater'
  },
  en: {
    'om-oss': 'about',
    'services': 'services',
    'contact': 'contact',
    'case-studies': 'case-studies',
    'artikler': 'articles',
    'pricing': 'pricing',
    'results': 'results'
  },
  sv: {
    'om-oss': 'om-oss',
    'services': 'tjenester',
    'contact': 'kontakt',
    'case-studies': 'kundehistorier',
    'articles': 'artikler',
    'pricing': 'priser',
    'results': 'resultater'
  },
  dk: {
    'om-oss': 'om-oss',
    'services': 'tjenester',
    'contact': 'kontakt',
    'case-studies': 'kundehistorier',
    'articles': 'artikler',
    'pricing': 'priser',
    'results': 'resultater'
  }
};