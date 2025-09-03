// @ts-nocheck
import { getDictionary } from '@/i18n/get-dictionary'
import { Locale, i18n } from '@/i18n/config'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import Footer from '@/components/vekst/Footer'
import Header from '@/components/vekst/Header'
import GoogleTagManager from '@/components/GoogleTagManager'
import '../globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Prevents font blocking rendering
  preload: true,
  variable: '--font-inter'
})

export async function generateMetadata(props): Promise<Metadata> {
  try {
    // Await params in Next.js 15
    const params = await props.params;
    
    if (!params || !params.lang) {
      return {
        title: 'VekstBoost'
      }
    }

    // Use params.lang directly in functions
    const dict = await getDictionary(params.lang)
    const defaultTitle = dict?.metadata?.title || 'Nettsider som driver vekst | VekstBoost'
    const description = dict?.metadata?.description || 'Vi bygger strategiske nettsider for ambisiøse bedrifter - fra digitalt visittkort til din mest effektive salgsmedarbeider.'
    
    // Generate alternates for all languages
    const alternates: Record<string, string> = {}
    i18n.locales.forEach(locale => {
      alternates[locale === 'no' ? 'no-NO' : locale === 'en' ? 'en-US' : locale === 'da' ? 'da-DK' : 'sv-SE'] = `https://vekstboost.com/${locale}`
    })
    
    return {
      title: {
        default: defaultTitle,
        template: `%s | VekstBoost`
      },
      description,
      keywords: dict?.metadata?.keywords || 'nettside, webdesign, digital markedsføring, SEO, konverteringsoptimalisering, bedrift',
      authors: [{ name: 'VekstBoost Team' }],
      creator: 'VekstBoost',
      publisher: 'VekstBoost',
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL('https://vekstboost.com'),
      alternates: {
        canonical: `https://vekstboost.com/${params.lang}`,
        languages: alternates
      },
      openGraph: {
        title: defaultTitle,
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
        title: defaultTitle,
        description,
        images: ['/images/website-og-image.jpg'],
        creator: '@vekstboost',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      verification: {
        google: process.env.GOOGLE_SITE_VERIFICATION,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'VekstBoost',
      description: 'VekstBoost - Din partner for digital vekst'
    }
  }
}

export default async function Layout(props) {
  try {
    // Await params in Next.js 15
    const params = await props.params;
    const children = props.children;
    
    // Validate language parameter
    if (!params || !params.lang) {
      console.warn('Missing language parameter, defaulting to Norwegian')
      // Don't call notFound() for missing params, just default to Norwegian
      const defaultDict = await getDictionary('no')
      return (
        <html lang="no" className={inter.className}>
          <head>
            {/* Preconnect to external domains for performance */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            
            {/* Favicon */}
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            
            {/* DNS prefetch for performance */}
            <link rel="dns-prefetch" href="//www.google-analytics.com" />
            <link rel="dns-prefetch" href="//connect.facebook.net" />
            
            {/* Hreflang tags for multilingual SEO */}
            {i18n.locales.map(locale => (
              <link
                key={locale}
                rel="alternate"
                hrefLang={locale === 'no' ? 'no-NO' : locale === 'en' ? 'en-US' : locale === 'da' ? 'da-DK' : 'sv-SE'}
                href={`https://vekstboost.com/${locale}`}
              />
            ))}
            <link rel="alternate" hrefLang="x-default" href="https://vekstboost.com/no" />
          </head>
          <body>
            <GoogleTagManager lang="no" />
            <Header dict={defaultDict} lang="no" />
            <main className="min-h-screen pt-16">
              {children}
            </main>
            <Footer dict={defaultDict} lang="no" />
          </body>
        </html>
      )
    }
    
    // Only call notFound for truly invalid languages
    if (!i18n.locales.includes(params.lang)) {
      console.warn(`Invalid language: ${params.lang}, calling notFound()`)
      notFound()
    }

    // Get dictionary with fallback
    let dict
    try {
      dict = await getDictionary(params.lang)
    } catch (dictError) {
      console.warn(`Failed to load dictionary for ${params.lang}, falling back to Norwegian:`, dictError)
      dict = await getDictionary('no')
    }

    return (
      <html lang={params.lang} className={inter.className}>
        <head>
          {/* Preconnect to external domains for performance */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          
          {/* DNS prefetch for performance */}
          <link rel="dns-prefetch" href="//www.google-analytics.com" />
          <link rel="dns-prefetch" href="//connect.facebook.net" />
          
          {/* Hreflang tags for multilingual SEO */}
          {i18n.locales.map(locale => (
            <link
              key={locale}
              rel="alternate"
              hrefLang={locale === 'no' ? 'no-NO' : locale === 'en' ? 'en-US' : locale === 'da' ? 'da-DK' : 'sv-SE'}
              href={`https://vekstboost.com/${locale}`}
            />
          ))}
          <link rel="alternate" hrefLang="x-default" href="https://vekstboost.com/no" />
        </head>
        <body>
          <GoogleTagManager lang={params.lang} />
          <Header dict={dict} lang={params.lang} />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer dict={dict} lang={params.lang} />
        </body>
      </html>
    )
  } catch (error) {
    console.error('Critical error in layout:', error)
    // Instead of notFound(), return a minimal fallback layout  
    return (
      <html lang="no" className={inter.className}>
        <head>
          <title>VekstBoost</title>
          <meta name="description" content="VekstBoost - Din partner for digital vekst" />
        </head>
        <body>
          <main className="min-h-screen pt-16">
            <div className="container mx-auto px-4 py-16">
              <h1>Laster...</h1>
              <p>Nettsiden laster, vennligst prøv igjen.</p>
            </div>
          </main>
        </body>
      </html>
    )
  }
}

// Generate static parameters for all supported languages
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale
  }))
}
