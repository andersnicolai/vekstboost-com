// Server Component
import { getDictionary } from '@/i18n/get-dictionary';
import { Locale, i18n } from '@/i18n/config';
import { Metadata } from 'next';
import Script from 'next/script';
import ClientPage from './ClientPage';
import { getOrganizationSchema, getWebsiteSchema, getLocalBusinessSchema } from '@/lib/schema';

// ISR: Revalidate every 24 hours for better performance
export const revalidate = 86400; // 24 hours

// Enable static generation and edge runtime for better performance
export const dynamic = 'force-static'
export const runtime = 'nodejs' // Use Node.js runtime for complex operations

// Generate static params for better performance
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale,
  }));
}

// Server-side metadata generation for SEO
export async function generateMetadata(props): Promise<Metadata> {
  // Await params in Next.js 15
  const params = await props.params;
  
  // Use params.lang directly
  const dict = await getDictionary(params.lang);
  
  const title = dict.hero?.title ? `${dict.hero.title} | VekstBoost` : 'Nettsider som driver vekst | VekstBoost'
  const description = dict.hero?.description?.main || 'Vi bygger strategiske nettsider for ambisiøse bedrifter - fra digitalt visittkort til din mest effektive salgsmedarbeider.'
  
  return {
    title,
    description,
    keywords: 'nettside, webdesign, digital markedsføring, SEO, konverteringsoptimalisering, bedrift',
    openGraph: {
      title,
      description,
      url: `https://vekstboost.com/${params.lang}`,
      siteName: 'VekstBoost',
      images: [
        {
          url: '/images/website-og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'VekstBoost Nettsideutvikling',
        },
      ],
      locale: params.lang === 'no' ? 'no_NO' : params.lang === 'en' ? 'en_US' : params.lang === 'da' ? 'da_DK' : 'sv_SE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/website-og-image.jpg'],
      creator: '@vekstboost',
    },
    alternates: {
      canonical: `https://vekstboost.com/${params.lang}`,
      languages: {
        'no-NO': 'https://vekstboost.com/no',
        'en-US': 'https://vekstboost.com/en',
        'da-DK': 'https://vekstboost.com/da',
        'sv-SE': 'https://vekstboost.com/sv',
      },
    },
  };
}

// Default export er server component
export default async function Page(props) {
  // Await params in Next.js 15
  const params = await props.params;
  const dict = await getDictionary(params.lang);

  // Generate structured data schemas
  const organizationSchema = getOrganizationSchema(params.lang);
  const websiteSchema = getWebsiteSchema(params.lang);
  const localBusinessSchema = getLocalBusinessSchema(params.lang);

  return (
    <>
      {/* Structured Data for SEO */}
      <Script 
        id="organization-schema" 
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(organizationSchema)}
      </Script>
      <Script 
        id="website-schema" 
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(websiteSchema)}
      </Script>
      <Script 
        id="local-business-schema" 
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(localBusinessSchema)}
      </Script>
      
      <ClientPage dict={dict} lang={params.lang} />
    </>
  );
} 