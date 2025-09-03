import { getDictionary } from '@/i18n/get-dictionary'
import { Locale } from '@/i18n/config'
import { Metadata } from 'next'
import KontaktClient from './KontaktClient'

export function generateStaticParams() {
  return [
    { lang: 'no' },
    { lang: 'en' },
    { lang: 'dk' },
    { lang: 'sv' }
  ]
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  
  // Language-specific SEO-optimized titles and descriptions
  const titles = {
    no: 'Kontakt oss | Vekstboost – Eksperter på digital markedsføring',
    en: 'Contact us | Vekstboost – Digital marketing experts',
    dk: 'Kontakt os | Vekstboost – Digitale marketingeksperter',
    sv: 'Kontakta oss | Vekstboost – Experter på digital marknadsföring'
  }
  
  const descriptions = {
    no: 'Ta kontakt med oss i Vekstboost for hjelp med digital markedsføring, SEO og annonsering. Vi hjelper din bedrift å vokse på nett.',
    en: 'Contact Vekstboost for help with digital marketing, SEO, and advertising. We help your business grow online.',
    dk: 'Kontakt Vekstboost for hjælp med digital marketing, SEO og annoncering. Vi hjælper din virksomhed med at vokse online.',
    sv: 'Kontakta Vekstboost för hjälp med digital marknadsföring, SEO och annonsering. Vi hjälper ditt företag att växa online.'
  }
  
  return {
    title: titles[lang] || titles.no,
    description: descriptions[lang] || descriptions.no,
    openGraph: {
      title: titles[lang] || titles.no,
      description: descriptions[lang] || descriptions.no,
      url: `https://vekstboost.com/${lang}/kontakt`,
      siteName: 'VekstBoost',
      images: [
        {
          url: '/images/contact-og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Contact VekstBoost',
        },
      ],
      locale: lang === 'no' ? 'no_NO' : lang === 'en' ? 'en_US' : lang === 'dk' ? 'da_DK' : 'sv_SE',
      type: 'website',
    },
    alternates: {
      canonical: `https://vekstboost.com/${lang}/kontakt`,
      languages: {
        'no-NO': 'https://vekstboost.com/no/kontakt',
        'en-US': 'https://vekstboost.com/en/kontakt',
        'da-DK': 'https://vekstboost.com/dk/kontakt',
        'sv-SE': 'https://vekstboost.com/sv/kontakt',
      },
    },
  }
}

export default async function KontaktPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return <KontaktClient dict={dict} lang={lang} />
} 