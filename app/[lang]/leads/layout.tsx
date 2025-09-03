import type { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'
import { Locale, i18n } from '@/i18n/config'
import { withCommonProps } from '@/components/hoc/withCommonProps'
import LeadGenerationPage from './page'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  // Await params in Next.js 15
  const { lang } = await params;
  
  try {
    const dict = await getDictionary(lang)
    
    return {
      title: `Datadrevet Markedsføring | VekstBoost`,
      description: 'Få flere kvalifiserte leads med datadrevet digital markedsføring. Øk konverteringsraten og reduser kostnad per lead.',
      openGraph: {
        title: `Datadrevet Markedsføring | VekstBoost`,
        description: 'Få flere kvalifiserte leads med datadrevet digital markedsføring. Øk konverteringsraten og reduser kostnad per lead.',
        url: `https://vekstboost.com/${lang}/leads`,
        siteName: 'VekstBoost',
        images: [
          {
            url: 'https://vekstboost.com/images/lead-gen-og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'VekstBoost Digital Marketing',
          },
        ],
        locale: lang,
        type: 'website',
      },
      alternates: {
        canonical: `https://vekstboost.com/${lang}/leads`,
        languages: {
          'en-US': `https://vekstboost.com/en/leads`,
          'no-NO': `https://vekstboost.com/no/leads`,
          'da-DK': `https://vekstboost.com/dk/leads`,
          'sv-SE': `https://vekstboost.com/sv/leads`,
        },
      },
    }
  } catch (error) {
    console.error('Error in generateMetadata for leads:', error)
    return {
      title: 'Datadrevet Markedsføring | VekstBoost',
      description: 'Få flere kvalifiserte leads med datadrevet digital markedsføring.',
    }
  }
}

export default async function LeadGenLayout(props) {
  // Await params in Next.js 15
  const params = await props.params;
  const children = props.children;
  
  return <>{children}</>
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
} 