'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Globe, ExternalLink, Monitor } from 'lucide-react'
import Image from 'next/image'
import { Dictionary } from '../../types/dictionary'
import { SupportedLanguage } from '@/types'

// Component for handling website screenshots with fallbacks
function WebsiteScreenshot({ 
  src, 
  alt, 
  fallbackColor, 
  title, 
  className = "" 
}: { 
  src: string; 
  alt: string; 
  fallbackColor: string; 
  title: string;
  className?: string;
}) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div className={`${fallbackColor} ${className} flex items-center justify-center text-white`}>
        <div className="text-center">
          <Monitor className="h-16 w-16 mx-auto mb-4 opacity-80" />
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-sm opacity-80 mt-2">Website Preview</div>
        </div>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover transition-transform duration-300 hover:scale-105 ${className}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onError={() => setImageError(true)}
      priority
    />
  )
}

const websites = [
  {
    id: "magnus-midtboe",
    titleKey: "magnusMidtboTitle",
    descriptionKey: "magnusMidtboDescription",
    url: "http://www.magnusmidtboe.com/",
    screenshot: "/images/showcase/magnus-midtboe.jpg",
    fallbackColor: "bg-gradient-to-br from-blue-500 to-blue-700",
    tags: ["SEO Optimization", "Content Strategy", "Search Rankings"],
    testimonial: "Jeg hadde aldri tid til å fokusere på nettsiden min, og det viste på rangeringen. Etter at Nettallianse tok over, har jeg fått mer tid til å fokusere på kernebedriften min, mens sidene mine rangerer bedre enn noensinne på Google.",
    clientName: "Magnus Midtbø",
    results: [
      { metric: "Organic Traffic", value: "+245%", period: "6 months" },
      { metric: "Conversion Rate", value: "+89%", period: "3 months" },
      { metric: "Page Load Speed", value: "2.1s", period: "Current" }
    ]
  },
  {
    id: "hjorth-arkitekter",
    titleKey: "hjorthArkitekterTitle",
    descriptionKey: "hjorthArkitekterDescription", 
    url: "https://hjortharkitekter.no/",
    screenshot: "/images/showcase/hjorth-arkitekter.jpg",
    fallbackColor: "bg-gradient-to-br from-gray-600 to-gray-800",
    tags: ["Professional Design", "SEO Strategy", "Modern Web"],
    testimonial: "Hjorth Arkitekter trengte en ny nettside som gjenspeiler deres minimalistiske stil og profesjonelle uttrykk.",
    clientName: "Hjorth Arkitekter",
    results: [
      { metric: "Local SEO Ranking", value: "#1", period: "Current" },
      { metric: "Mobile Performance", value: "95/100", period: "Lighthouse" },
      { metric: "Contact Form Leads", value: "+156%", period: "6 months" }
    ]
  },
  {
    id: "morten-bjerk",
    titleKey: "mortenBjerkTitle",
    descriptionKey: "mortenBjerkDescription",
    url: "https://www.mortenbjerkfoto.no/",
    screenshot: "/images/showcase/morten-bjerk.jpg",
    fallbackColor: "bg-gradient-to-br from-purple-500 to-purple-700",
    tags: ["Photography Portfolio", "SEO Strategy", "Professional"],
    testimonial: "Nettsiden vår hadde blitt nedprioritert i årevis. Nett Hinna kom inn og bygde en moderne, profesjonell nettside som virkelig reflekterer bedriften vår.",
    clientName: "Morten Bjerk",
    results: [
      { metric: "Portfolio Views", value: "+320%", period: "6 months" },
      { metric: "Booking Inquiries", value: "+178%", period: "3 months" },
      { metric: "Page Speed", value: "1.8s", period: "Current" }
    ]
  }
]

const DEFAULT_CONTENT = {
  title: 'Digitale opplevelser som gjør inntrykk',
  subtitle: 'Moderne, raske og brukervennlige nettsider som konverterer',
  magnusMidtboTitle: 'Magnus Midtbø',
  magnusMidtboDescription: 'SEO-optimalisering og søkerangering for outdoor-nettside',
  hjorthArkitekterTitle: 'Hjorth Arkitekter',
  hjorthArkitekterDescription: 'Profesjonell arkitektnettside med moderne uttrykk',
  mortenBjerkTitle: 'Morten Bjerk Foto',
  mortenBjerkDescription: 'Fotografportfolio med SEO-strategi',
  visitWebsite: 'Besøk nettside',
  viewResults: 'Se resultater',
  technicalStack: 'Teknisk stack',
  pressEscToClose: 'Trykk ESC for å lukke',
  results: 'Resultater',
  testimonial: 'Tilbakemelding'
} as const

interface WebsiteShowcaseProps {
  dict: Dictionary;
  lang?: SupportedLanguage;
  scrollToContact?: () => void;
}

export default function WebsiteShowcase({ dict, lang = 'no', scrollToContact }: WebsiteShowcaseProps) {
  const [selectedSite, setSelectedSite] = useState<number | null>(null)

  const handleScrollToContact = () => {
    if (scrollToContact) {
      scrollToContact()
    } else {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const content = {
    title: dict?.websiteShowcase?.title ?? DEFAULT_CONTENT.title,
    subtitle: dict?.websiteShowcase?.subtitle ?? DEFAULT_CONTENT.subtitle,
    magnusMidtboTitle: DEFAULT_CONTENT.magnusMidtboTitle,
    magnusMidtboDescription: DEFAULT_CONTENT.magnusMidtboDescription,
    hjorthArkitekterTitle: DEFAULT_CONTENT.hjorthArkitekterTitle,
    hjorthArkitekterDescription: DEFAULT_CONTENT.hjorthArkitekterDescription,
    mortenBjerkTitle: DEFAULT_CONTENT.mortenBjerkTitle,
    mortenBjerkDescription: DEFAULT_CONTENT.mortenBjerkDescription,
    visitWebsite: dict?.websiteShowcase?.visitWebsite ?? DEFAULT_CONTENT.visitWebsite,
    viewResults: DEFAULT_CONTENT.viewResults,
    technicalStack: dict?.websiteShowcase?.technicalStack ?? DEFAULT_CONTENT.technicalStack,
    pressEscToClose: dict?.websiteShowcase?.pressEscToClose ?? DEFAULT_CONTENT.pressEscToClose,
    results: DEFAULT_CONTENT.results,
    testimonial: DEFAULT_CONTENT.testimonial
  }

  return (
    <section className="py-24 bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-800">
            {content.title}
          </h2>
          <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {websites.map((site, index) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              onClick={() => setSelectedSite(index)}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <WebsiteScreenshot
                  src={site.screenshot}
                  alt={`${content[site.titleKey]} screenshot`}
                  fallbackColor={site.fallbackColor}
                  title={content[site.titleKey]}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <ExternalLink className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{content[site.titleKey]}</h3>
                  <p className="text-sm opacity-90">{content[site.descriptionKey]}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {site.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="text-xs bg-brand-subtle text-brand-700 px-3 py-1 rounded-full border border-brand-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={handleScrollToContact}
            className="btn-brand py-4 px-8 rounded-full text-lg"
          >
            {lang === 'en' ? 'Get Started' : 'Kom i gang'}
          </button>
        </div>

        <AnimatePresence>
          {selectedSite !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedSite(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-6 border-b">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {content[websites[selectedSite].titleKey]}
                  </h3>
                  <button 
                    onClick={() => setSelectedSite(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                        <WebsiteScreenshot
                          src={websites[selectedSite].screenshot}
                          alt={`${content[websites[selectedSite].titleKey]} full preview`}
                          fallbackColor={websites[selectedSite].fallbackColor}
                          title={content[websites[selectedSite].titleKey]}
                        />
                      </div>
                      
                      <div className="flex justify-center">
                        <a 
                          href={websites[selectedSite].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-white bg-brand-600 hover:bg-brand-700 px-6 py-3 rounded-lg transition-colors"
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          {content.visitWebsite}
                        </a>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-bold text-gray-800 mb-4">
                          {content.results}
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          {websites[selectedSite].results.map((result, i) => (
                            <div key={i} className="bg-gray-50 p-4 rounded-lg">
                              <div className="text-2xl font-bold text-brand-600 mb-1">
                                {result.value}
                              </div>
                              <div className="text-sm text-gray-600">
                                {result.metric}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {result.period}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="text-lg font-bold text-gray-800 mb-2">
                          {content.testimonial}
                        </h4>
                        <p className="text-gray-600 italic mb-3">
                          "{websites[selectedSite].testimonial}"
                        </p>
                        <div className="text-sm font-semibold text-gray-800">
                          - {websites[selectedSite].clientName}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-gray-800 mb-3">
                          {content.technicalStack}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {websites[selectedSite].tags.map((tag, i) => (
                            <span 
                              key={i}
                              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 border-t flex justify-between items-center">
                  <div className="text-sm text-gray-500 italic">
                    {content.pressEscToClose}
                  </div>
                  <button 
                    onClick={handleScrollToContact}
                    className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    {lang === 'en' ? 'Start Your Project' : 'Start ditt prosjekt'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
} 