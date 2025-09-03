// @ts-nocheck
import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'
import { Locale, i18n } from '@/i18n/config'
import LeadGenClientPage from './client'

// Generate static params for better performance
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale,
  }));
}

// Server-side metadata generation for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}): Promise<Metadata> {
  const { lang } = await params
  
  const titles = {
    no: 'Lead-generering Dashboard | VekstBoost',
    en: 'Lead Generation Dashboard | VekstBoost',
    dk: 'Lead-generering Dashboard | VekstBoost'
  }
  
  const descriptions = {
    no: 'Administrer og følg opp dine leads med VekstBoost sitt avanserte CRM-system. Se konverteringsrater og optimaliser din salgsprosess.',
    en: 'Manage and follow up your leads with VekstBoost\'s advanced CRM system. View conversion rates and optimize your sales process.',
    dk: 'Administrer og følg op på dine leads med VekstBoosts avancerede CRM-system. Se konverteringsrater og optimer din salgsproces.'
  }
  
  return {
    title: titles[lang] || titles.no,
    description: descriptions[lang] || descriptions.no,
    robots: 'noindex, nofollow', // Dashboard pages should not be indexed
    openGraph: {
      title: titles[lang] || titles.no,
      description: descriptions[lang] || descriptions.no,
    },
  }
}

export default async function LeadGenerationPage(props) {
  // Await params in Next.js 15
  const params = await props.params;
  const dict = await getDictionary(params.lang);
  
  return <LeadGenClientPage dict={dict} lang={params.lang} />
}
