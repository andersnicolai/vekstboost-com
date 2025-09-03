'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Code, 
  Globe, 
  Rocket, 
  BarChart, 
  TrendingUp, 
  Clock, 
  Zap, 
  Users, 
  ArrowRight,
  Monitor,
  ExternalLink,
  Award
} from 'lucide-react'
import { AccessibleHeading } from '@/components/ui/accessible-heading'
import { AccessibleButton } from '@/components/ui/accessible-button'
import Image from 'next/image'
import { Dictionary } from '../../../types/dictionary'
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
      className={`object-cover ${className}`}
      sizes="(max-width: 768px) 100vw, 50vw"
      onError={() => setImageError(true)}
      priority
    />
  )
}

interface EnhancedWebsiteShowcaseProps {
  dict: Dictionary
  lang: SupportedLanguage
  scrollToContact?: () => void
}

export default function EnhancedWebsiteShowcase({ dict, lang, scrollToContact }: EnhancedWebsiteShowcaseProps) {
  const [selectedSite, setSelectedSite] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = ['all', 'Outdoor & Sport', 'Architecture', 'Photography']
  
  const filteredWebsites = activeCategory === 'all' 
    ? websites 
    : websites.filter(site => site.category === activeCategory)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedSite(null)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

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

  // Enhanced website data with business impact and results
  const websites = [
    {
      id: 'magnus-midtboe',
      title: 'Magnus Midtbø',
      description: 'SEO-optimalisering og søkerangering for outdoor-nettside',
      url: 'http://www.magnusmidtboe.com/',
      screenshot: '/images/showcase/magnus-midtboe.jpg',
      fallbackColor: 'bg-gradient-to-br from-blue-500 to-blue-700',
      category: 'Outdoor & Sport',
      technologies: ['Next.js', 'Tailwind CSS', 'Vercel'],
      metrics: [
        { label: 'Organic Traffic', value: '+245%', icon: TrendingUp },
        { label: 'Conversion Rate', value: '+89%', icon: Award },
        { label: 'Page Speed', value: '2.1s', icon: Monitor }
      ],
      features: [
        'Mobile-first design',
        'Advanced SEO optimization',
        'Performance optimization',
        'Analytics integration'
      ]
    },
    {
      id: 'hjorth-arkitekter',
      title: 'Hjorth Arkitekter',
      description: 'Profesjonell arkitektnettside med moderne uttrykk',
      url: 'https://hjortharkitekter.no/',
      screenshot: '/images/showcase/hjorth-arkitekter.jpg',
      fallbackColor: 'bg-gradient-to-br from-gray-600 to-gray-800',
      category: 'Architecture',
      technologies: ['WordPress', 'Custom Theme', 'Cloudflare'],
      metrics: [
        { label: 'Local SEO', value: '#1', icon: Award },
        { label: 'Performance', value: '95/100', icon: Monitor },
        { label: 'Lead Growth', value: '+156%', icon: TrendingUp }
      ],
      features: [
        'Minimalist design',
        'Portfolio showcase',
        'Contact optimization',
        'Local SEO focus'
      ]
    },
    {
      id: 'morten-bjerk',
      title: 'Morten Bjerk Foto',
      description: 'Fotografportfolio med SEO-strategi',
      url: 'https://www.mortenbjerkfoto.no/',
      screenshot: '/images/showcase/morten-bjerk.jpg',
      fallbackColor: 'bg-gradient-to-br from-purple-500 to-purple-700',
      category: 'Photography',
      technologies: ['React', 'Next.js', 'Sanity CMS'],
      metrics: [
        { label: 'Portfolio Views', value: '+320%', icon: Users },
        { label: 'Bookings', value: '+178%', icon: TrendingUp },
        { label: 'Speed Score', value: '1.8s', icon: Monitor }
      ],
      features: [
        'Image optimization',
        'Gallery management',
        'Booking system',
        'SEO optimization'
      ]
    }
  ]

  const metrics = [
    { 
      value: dict?.websiteShowcase?.metrics?.roi?.value || '3.8x', 
      label: dict?.websiteShowcase?.metrics?.roi?.label || (lang === 'no' ? 'Gjennomsnittlig ROI' : lang === 'sv' ? 'Genomsnittlig ROI' : lang === 'dk' ? 'Gennemsnitlig ROI' : 'Average ROI'), 
      description: dict?.websiteShowcase?.metrics?.roi?.description || (lang === 'no' ? 'på nettside-investeringen' : lang === 'sv' ? 'på webbplatsinvesteringen' : lang === 'dk' ? 'på hjemmeside-investeringen' : 'on website investment'),
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-100'
    },
    { 
      value: dict?.websiteShowcase?.metrics?.conversionRate?.value || '+75%', 
      label: dict?.websiteShowcase?.metrics?.conversionRate?.label || (lang === 'no' ? 'Økt konverteringsrate' : lang === 'sv' ? 'Ökad konverteringsgrad' : lang === 'dk' ? 'Øget konverteringsrate' : 'Increased conversion rate'), 
      description: dict?.websiteShowcase?.metrics?.conversionRate?.description || (lang === 'no' ? 'sammenlignet med tidligere nettsider' : lang === 'sv' ? 'jämfört med tidigare webbplatser' : lang === 'dk' ? 'sammenlignet med tidligere hjemmesider' : 'compared to previous websites'),
      icon: BarChart,
      color: 'text-indigo-500', 
      bgColor: 'bg-indigo-100'
    },
    { 
      value: dict?.websiteShowcase?.metrics?.loadingTime?.value || '0.9s', 
      label: dict?.websiteShowcase?.metrics?.loadingTime?.label || (lang === 'no' ? 'Gjennomsnittlig lastetid' : lang === 'sv' ? 'Genomsnittlig laddningstid' : lang === 'dk' ? 'Gennemsnitlig indlæsningstid' : 'Average loading time'), 
      description: dict?.websiteShowcase?.metrics?.loadingTime?.description || (lang === 'no' ? 'optimalisert for best mulig ytelse' : lang === 'sv' ? 'optimerad för bästa möjliga prestanda' : lang === 'dk' ? 'optimeret for bedst mulige ydeevne' : 'optimized for best possible performance'),
      icon: Zap,
      color: 'text-amber-500',
      bgColor: 'bg-amber-100'
    },
    { 
      value: dict?.websiteShowcase?.metrics?.leads?.value || '+60%', 
      label: dict?.websiteShowcase?.metrics?.leads?.label || (lang === 'no' ? 'Flere kvalifiserte leads' : lang === 'sv' ? 'Fler kvalificerade leads' : lang === 'dk' ? 'Flere kvalificerede leads' : 'More qualified leads'), 
      description: dict?.websiteShowcase?.metrics?.leads?.description || (lang === 'no' ? 'for våre klienter' : lang === 'sv' ? 'för våra klienter' : lang === 'dk' ? 'for vores klienter' : 'for our clients'),
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-neutral-800"
          >
            Digitale opplevelser som gjør inntrykk
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-neutral-600 leading-relaxed"
          >
            Moderne, raske og brukervennlige nettsider som konverterer besøkende til kunder
          </motion.p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-xl border border-gray-200">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-brand-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category === 'all' ? 'Alle' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Website Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <AnimatePresence>
            {filteredWebsites.map((site, index) => (
              <motion.div
                key={site.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedSite(websites.indexOf(site))}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <WebsiteScreenshot
                    src={site.screenshot}
                    alt={`${site.title} screenshot`}
                    fallbackColor={site.fallbackColor}
                    title={site.title}
                    className="group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="inline-block bg-white/20 text-xs px-2 py-1 rounded-full mb-2 backdrop-blur-sm">
                      {site.category}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{site.title}</h3>
                    <p className="text-sm opacity-90">{site.description}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {site.metrics.map((metric, i) => (
                      <div key={i} className="text-center">
                        <div className="flex justify-center mb-1">
                          <metric.icon className="h-4 w-4 text-brand-600" />
                        </div>
                        <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                        <div className="text-xs text-gray-500">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {site.technologies.slice(0, 2).map((tech, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                    {site.technologies.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{site.technologies.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={handleScrollToContact}
            className="btn-brand py-4 px-8 rounded-full text-lg"
          >
            {lang === 'en' ? 'Start Your Project' : 'Start ditt prosjekt'}
          </motion.button>
        </div>

        {/* Enhanced Modal */}
        <AnimatePresence>
          {selectedSite !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedSite(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-6 border-b bg-gray-50">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {websites[selectedSite].title}
                    </h3>
                    <p className="text-gray-600">{websites[selectedSite].category}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedSite(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left side - Website preview */}
                    <div className="space-y-6">
                      <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                        <WebsiteScreenshot
                          src={websites[selectedSite].screenshot}
                          alt={`${websites[selectedSite].title} full preview`}
                          fallbackColor={websites[selectedSite].fallbackColor}
                          title={websites[selectedSite].title}
                        />
                      </div>
                      
                      <div className="text-center">
                        <a 
                          href={websites[selectedSite].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-white bg-brand-600 hover:bg-brand-700 px-6 py-3 rounded-lg transition-colors"
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Besøk nettside
                        </a>
                      </div>
                    </div>

                    {/* Right side - Details */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-bold text-gray-800 mb-4">Resultater</h4>
                        <div className="grid grid-cols-1 gap-4">
                          {websites[selectedSite].metrics.map((metric, i) => (
                            <div key={i} className="flex items-center bg-gray-50 p-4 rounded-lg">
                              <metric.icon className="h-8 w-8 text-brand-600 mr-4" />
                              <div>
                                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                                <div className="text-sm text-gray-600">{metric.label}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-gray-800 mb-3">Teknologier</h4>
                        <div className="flex flex-wrap gap-2">
                          {websites[selectedSite].technologies.map((tech, i) => (
                            <span key={i} className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-gray-800 mb-3">Funksjoner</h4>
                        <ul className="space-y-2">
                          {websites[selectedSite].features.map((feature, i) => (
                            <li key={i} className="flex items-center text-gray-600">
                              <div className="w-2 h-2 bg-brand-600 rounded-full mr-3"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 border-t flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Trykk ESC for å lukke
                  </div>
                  <button 
                    onClick={handleScrollToContact}
                    className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    Start ditt prosjekt
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