// @ts-nocheck
import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'
import { Locale, i18n } from '@/i18n/config'
import { GetStarted } from '@/components/vekst/GetStarted'

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
    no: 'Kom i gang - Få gratis vekstanalyse | VekstBoost',
    en: 'Get Started - Free Growth Analysis | VekstBoost',
    dk: 'Kom i gang - Gratis vækstanalyse | VekstBoost',
    sv: 'Kom igång - Gratis tillväxtanalys | VekstBoost'
  }
  
  const descriptions = {
    no: 'Book en gratis vekstanalyse og se hvordan vi kan hjelpe din bedrift å vokse. Få detaljert analyse av din digitale tilstedeværelse.',
    en: 'Book a free growth analysis and see how we can help your business grow. Get detailed analysis of your digital presence.',
    dk: 'Book en gratis vækstanalyse og se hvordan vi kan hjælpe din virksomhed med at vokse. Få detaljeret analyse af din digitale tilstedeværelse.',
    sv: 'Boka en gratis tillväxtanalys och se hur vi kan hjälpa ditt företag att växa. Få detaljerad analys av din digitala närvaro.'
  }
  
  return {
    title: titles[lang] || titles.no,
    description: descriptions[lang] || descriptions.no,
    openGraph: {
      title: titles[lang] || titles.no,
      description: descriptions[lang] || descriptions.no,
    },
  }
}

export default async function GetStartedPage(props) {
  // Await params in Next.js 15
  const params = await props.params;
  const dict = await getDictionary(params.lang);
  
  return <GetStarted dict={dict} />
}
