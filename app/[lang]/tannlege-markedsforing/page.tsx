import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'
import { AccessibleHeading } from '@/components/ui/accessible-heading'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, TrendingUp, Users, Calendar, Star } from 'lucide-react'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: params.lang === 'en' ? 'Dental Practice Marketing - VekstBoost' : 'Markedsføring for Tannleger - VekstBoost',
    description: params.lang === 'en' ? 
      'Specialized digital marketing for dental practices. Get more patients with proven strategies.' : 
      'Spesialisert digital markedsføring for tannlegekontorer. Få flere pasienter med beviselige strategier.',
  }
}

export default async function DentalMarketingPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)
  const isEnglish = params.lang === 'en'

  const benefits = [
    {
      icon: <Users className="h-6 w-6" />,
      title: isEnglish ? "More Patient Bookings" : "Flere Pasientbookinger",
      description: isEnglish ? "Average 40% increase in new patients" : "Gjennomsnittlig 40% økning i nye pasienter"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: isEnglish ? "Better Online Reviews" : "Bedre Nettanmeldelser",
      description: isEnglish ? "Automated review collection system" : "Automatisert system for anmeldelser"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: isEnglish ? "Full Appointment Calendar" : "Full Timebok",
      description: isEnglish ? "Strategic booking optimization" : "Strategisk optimalisering av bookinger"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: isEnglish ? "Measurable ROI" : "Målbar Avkastning",
      description: isEnglish ? "Track every marketing dollar spent" : "Spor hver markedsføringskrone"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50/20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AccessibleHeading level={1} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
              {isEnglish ? 'Digital Marketing for Dental Practices' : 'Digital Markedsføring for Tannlegekontorer'}
            </AccessibleHeading>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              {isEnglish ? 
                'We help dental practices attract more patients and grow their business with specialized digital marketing strategies.' :
                'Vi hjelper tannlegekontorer med å tiltrekke flere pasienter og vokse virksomheten med spesialiserte digitale markedsføringsstrategier.'}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="btn-brand text-lg px-8 py-4"
                asChild
              >
                <Link href={`/${params.lang}/kontakt`}>
                  {isEnglish ? 'Get More Patients' : 'Få Flere Pasienter'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              {/* Subtle link to GodentalBoost */}
              <Button 
                variant="outline" 
                size="lg" 
                className="btn-brand-outline text-lg px-8 py-4"
                asChild
              >
                <a href="https://godentalboost.com" target="_blank" rel="noopener noreferrer">
                  {isEnglish ? 'See Dental Specialist' : 'Se Tannlegespesialist'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <AccessibleHeading level={2} className="text-3xl md:text-4xl font-bold mb-4">
                {isEnglish ? 'Why Dental Practices Choose Us' : 'Hvorfor Tannleger Velger Oss'}
              </AccessibleHeading>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {isEnglish ? 
                  'We understand the unique challenges dental practices face in digital marketing.' :
                  'Vi forstår de unike utfordringene tannlegekontorer møter i digital markedsføring.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-600">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GodentalBoost Mention */}
      <section className="py-16 bg-gradient-to-r from-brand-50 to-brand-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AccessibleHeading level={2} className="text-2xl md:text-3xl font-bold mb-4">
              {isEnglish ? 'Specialized Dental Marketing Solutions' : 'Spesialiserte Markedsføringsløsninger for Tannleger'}
            </AccessibleHeading>
            <p className="text-lg text-gray-700 mb-6">
              {isEnglish ? 
                'Through our specialized division GodentalBoost, we offer tailored marketing packages designed specifically for dental practices.' :
                'Gjennom vår spesialiserte avdeling GodentalBoost, tilbyr vi skreddersydde markedsføringspakker designet spesifikt for tannlegekontorer.'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <span className="bg-white/80 px-4 py-2 rounded-full flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-brand-600" />
                {isEnglish ? 'Google Ads for Dentists' : 'Google Ads for Tannleger'}
              </span>
              <span className="bg-white/80 px-4 py-2 rounded-full flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-brand-600" />
                {isEnglish ? 'Patient Review Management' : 'Pasientanmeldelser'}
              </span>
              <span className="bg-white/80 px-4 py-2 rounded-full flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-brand-600" />
                {isEnglish ? 'Dental SEO' : 'SEO for Tannleger'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <AccessibleHeading level={2} className="text-3xl md:text-4xl font-bold mb-6">
              {isEnglish ? 'Ready to Grow Your Practice?' : 'Klar for å Vokse Din Praksis?'}
            </AccessibleHeading>
            <p className="text-lg text-gray-600 mb-8">
              {isEnglish ? 
                'Let us show you how we can help fill your appointment book with ideal patients.' :
                'La oss vise deg hvordan vi kan hjelpe deg fylle timeboken med ideelle pasienter.'}
            </p>
            <Button 
              size="lg" 
              className="btn-brand text-lg px-10 py-4"
              asChild
            >
              <Link href={`/${params.lang}/kontakt`}>
                {isEnglish ? 'Book Free Consultation' : 'Book Gratis Konsultasjon'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}