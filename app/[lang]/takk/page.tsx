import { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { Suspense } from 'react'
import TakkClient from './TakkClient'

export function generateStaticParams() {
  return [{ lang: 'no' }, { lang: 'en' }, { lang: 'dk' }]
}

// Server-side metadata generation for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}): Promise<Metadata> {
  const { lang } = await params
  
  const titles = {
    no: 'Takk for din henvendelse | VekstBoost',
    en: 'Thank you for your inquiry | VekstBoost',
    dk: 'Tak for din henvendelse | VekstBoost'
  }
  
  const descriptions = {
    no: 'Vi har mottatt din henvendelse og tar kontakt innen kort tid. Utforsk våre ressurser mens du venter.',
    en: 'We have received your inquiry and will contact you shortly. Explore our resources while you wait.',
    dk: 'Vi har modtaget din henvendelse og kontakter dig inden for kort tid. Udforsk vores ressourcer mens du venter.'
  }
  
  return {
    title: titles[lang] || titles.no,
    description: descriptions[lang] || descriptions.no,
    robots: 'noindex, nofollow', // Thank you pages should not be indexed
    openGraph: {
      title: titles[lang] || titles.no,
      description: descriptions[lang] || descriptions.no,
    },
  }
}

interface TakkPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function TakkPage({ params }: TakkPageProps) {
  const { lang } = await params
  
  return (
    <Suspense fallback={<div>Laster...</div>}>
      <TakkClient lang={lang} />
    </Suspense>
  )
} 