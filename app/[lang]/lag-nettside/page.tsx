import { Metadata } from 'next'
import { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import InstantWebsiteGenerator from '@/components/onboarding/InstantWebsiteGenerator';

// Generate static params for better performance
export async function generateStaticParams() {
  return [
    { lang: 'no' },
    { lang: 'en' },
    { lang: 'dk' }
  ]
}

// Server-side metadata generation for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}): Promise<Metadata> {
  const { lang } = await params
  
  const titles = {
    no: 'Lag nettside med AI på 5 minutter | VekstBoost',
    en: 'Create AI website in 5 minutes | VekstBoost', 
    dk: 'Lav hjemmeside med AI på 5 minutter | VekstBoost'
  }
  
  const descriptions = {
    no: 'Få din AI-genererte nettside på 5 minutter. Komplett med SEO-optimalisert innhold, lead-capture widgets og analytics. Fra kun 2,999kr/måned.',
    en: 'Get your AI-generated website in 5 minutes. Complete with SEO-optimized content, lead-capture widgets and analytics. From only 2,999kr/month.',
    dk: 'Få din AI-genererede hjemmeside på 5 minutter. Komplet med SEO-optimeret indhold, lead-capture widgets og analytics. Fra kun 2,999kr/måned.'
  }
  
  return {
    title: titles[lang] || titles.no,
    description: descriptions[lang] || descriptions.no,
    openGraph: {
      title: titles[lang] || titles.no,
      description: descriptions[lang] || descriptions.no,
      images: [
        {
          url: '/images/ai-website-generator.jpg',
          width: 1200,
          height: 630,
          alt: 'VekstBoost AI Website Generator',
        },
      ],
    },
  }
}

export default async function WebsiteBuilderPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  // Language-specific path mapping
  const pathMap = {
    no: 'lag-nettside',
    en: 'create-website', 
    dk: 'lav-hjemmeside',
    sv: 'skapa-webbplats'
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🚀 {dict?.websiteBuilder?.badge || 'AI-Powered Website Builder'}
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {lang === 'en' ? (
              <>Get your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI-generated</span><br />website in <span className="text-green-600">5 minutes</span></>
            ) : lang === 'dk' ? (
              <>Få din <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI-genererede</span><br />hjemmeside på <span className="text-green-600">5 minutter</span></>
            ) : (
              <>Få din <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI-genererte</span><br />nettside på <span className="text-green-600">5 minutter</span></>
            )}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {dict?.websiteBuilder?.heroSubtitle}
          </p>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white" />
                ))}
              </div>
              <span className="text-sm text-gray-600">500+ {dict?.websiteBuilder?.socialProof?.satisfiedCustomers}</span>
            </div>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => (
                <span key={i} className="text-yellow-400 text-lg">⭐</span>
              ))}
              <span className="text-sm text-gray-600 ml-2">4.9/5 i {dict?.websiteBuilder?.socialProof?.customerSatisfaction}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{dict?.websiteBuilder?.features?.aiContent?.title || 'AI-Generert Innhold'}</h3>
            <p className="text-gray-600 text-sm">
              {dict?.websiteBuilder?.features?.aiContent?.description || 'Claude AI skriver SEO-optimaliserte artikler tilpasset din bransje og lokasjon'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📧</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{dict?.websiteBuilder?.features?.leadCapture?.title || 'Smart Lead Capture'}</h3>
            <p className="text-gray-600 text-sm">
              {dict?.websiteBuilder?.features?.leadCapture?.description || 'Widgets som konverterer besøkende til kunder automatisk'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold mb-3">{dict?.websiteBuilder?.features?.analytics?.title || 'Live Analytics'}</h3>
            <p className="text-gray-600 text-sm">
              {dict?.websiteBuilder?.features?.analytics?.description || 'Se hvor mange leads og salg nettsiden din genererer i sanntid'}
            </p>
          </div>
        </div>

        {/* Pricing Teaser */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            {dict?.websiteBuilder?.pricing?.title || 'Fra kun 2,999kr/måned'}
          </h3>
          <p className="text-gray-600 mb-8">
            {dict?.websiteBuilder?.pricing?.subtitle || 'Mindre enn du bruker på kaffe, men gir deg 10x flere kunder'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-white border rounded-lg p-4">
              <h4 className="font-semibold text-blue-600">{dict?.websiteBuilder?.pricing?.plans?.starter?.title || 'Starter'}</h4>
              <div className="text-2xl font-bold mb-2">{dict?.websiteBuilder?.pricing?.plans?.starter?.price || '2,999kr'}</div>
              <p className="text-sm text-gray-600">{dict?.websiteBuilder?.pricing?.plans?.starter?.description || '1 artikkel/uke + basic widgets'}</p>
            </div>
            
            <div className="bg-blue-600 text-white border rounded-lg p-4 transform scale-105">
              <h4 className="font-semibold">{dict?.websiteBuilder?.pricing?.plans?.professional?.title || 'Professional ⭐'}</h4>
              <div className="text-2xl font-bold mb-2">{dict?.websiteBuilder?.pricing?.plans?.professional?.price || '4,999kr'}</div>
              <p className="text-sm opacity-90">{dict?.websiteBuilder?.pricing?.plans?.professional?.description || '1 artikkel/dag + alle widgets'}</p>
            </div>
            
            <div className="bg-white border rounded-lg p-4">
              <h4 className="font-semibold text-purple-600">{dict?.websiteBuilder?.pricing?.plans?.enterprise?.title || 'Enterprise'}</h4>
              <div className="text-2xl font-bold mb-2">{dict?.websiteBuilder?.pricing?.plans?.enterprise?.price || '9,999kr'}</div>
              <p className="text-sm text-gray-600">{dict?.websiteBuilder?.pricing?.plans?.enterprise?.description || 'Custom AI + white-label'}</p>
            </div>
          </div>
        </div>

        {/* Main CTA */}
        <div className="bg-white rounded-2xl shadow-lg border p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {dict?.websiteBuilder?.cta?.title || 'Klar til å starte?'}
            </h3>
            <p className="text-gray-600">
              {dict?.websiteBuilder?.cta?.subtitle || 'Taste inn business-info → Velg plan → Få din nettside'}
            </p>
          </div>
          
          <InstantWebsiteGenerator dict={dict} lang={lang} />
        </div>

        {/* Industry Examples */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {dict?.websiteBuilder?.industries?.title || 'Perfekt for alle bransjer'}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {dict?.websiteBuilder?.industries?.list?.map((industry, idx) => (
              <div key={idx} className="bg-white rounded-lg border p-4 text-center hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">{industry.emoji}</div>
                <div className="text-sm font-medium">{industry.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            {dict?.websiteBuilder?.successStories?.title || 'Suksesshistorier'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dict?.websiteBuilder?.successStories?.stories?.map((story, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {story.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-semibold">{story.name}</h4>
                    <p className="text-sm text-gray-600">{story.location}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  "{story.quote}"
                </p>
                <div className="text-green-600 font-semibold text-sm">
                  {story.result}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            {dict?.websiteBuilder?.faq?.title || 'Ofte stilte spørsmål'}
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {dict?.websiteBuilder?.faq?.questions?.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg border p-6">
                <h4 className="font-semibold mb-2">{faq.q}</h4>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 