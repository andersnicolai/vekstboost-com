'use client'

import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react'
import { scrollToContact } from '../../utils/scroll'
import type { Dictionary } from '@/types/dictionary'
import { getLocalizedPath } from "@/lib/utils"
import { languageNames } from '@/i18n/config'
import Image from 'next/image'
import AnimatedBrandText from './animations/AnimatedBrandText'

interface Props {
  dict: Dictionary
  lang?: string
}

export default function Footer({ dict, lang = 'no' }: Props) {
  // Create fallbacks for missing properties
  const footer = {
    company: {
      name: 'VekstBoost',
      tagline: 'Din vekstpartner',
      address: 'Oslo',
      zip: '1415',
      city: 'Oppegård',

      phone: '+47 411 66 326',
      ...dict.footer?.company
    },
    services: {
      title: dict.footer?.services?.title || 'Tjenester',
      items: dict.footer?.services?.items || [
        { label: dict.navigation?.digitalMarketing || 'Digital Markedsføring', href: '/lag-nettside' },
        { label: 'SEO', href: '/lag-nettside' },
        { label: dict.navigation?.websites || 'Nettsider', href: '/lag-nettside' }
      ]
    },
    resources: {
      title: dict.footer?.resources?.title || 'Ressurser',
      items: dict.footer?.resources?.items || [
        { label: dict.navigation?.aboutUs || 'Om oss', href: '/om-oss' },
        { label: dict.navigation?.contact || 'Kontakt', href: '/kontakt' }
      ]
    },
    contact: {
      title: 'Kontakt oss',
      address: ['Oslo', '1415 Oppegård'],
      ...dict.footer?.contact
    },
    legal: Array.isArray(dict.footer?.legal) ? dict.footer?.legal : [],
    legalText: {
      copyright: 'Alle rettigheter forbeholdt.',
      ...(typeof dict.footer?.legal === 'object' && !Array.isArray(dict.footer?.legal) ? dict.footer.legal : {})
    }
  }
  
  const { onedev } = dict

  const partOf = onedev?.partOf || 'En del av'
  const companyName = onedev?.companyName || 'Onedev Solutions'

  const legalLinks = Array.isArray(footer?.legal) ? footer.legal : []

  return (
    <footer className="bg-gray-900 text-white">
      {/* Animated Brand Section - Like Klarna */}
      <div className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="container mx-auto px-4">
                          <AnimatedBrandText />
        </div>
      </div>
      
      {/* Footer Content */}
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Bedriftsinformasjon */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 mb-4 bg-gray-800 text-white px-4 py-2 rounded-full group relative shadow-sm border border-gray-700">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm border border-gray-600">
                  {footer.company.name}
                </div>
                <div className="bg-gray-700 p-1 rounded-lg flex items-center justify-center">
                  <Image 
                    src="/logo/vekstboostlogo.png"
                    alt="VekstBoost Logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto"
                  />
                </div>
                <span className="text-gray-300">{partOf}</span>
                <a 
                  href="https://onedevconsultancy.no" 
                  className="text-rose-400 font-semibold hover:text-rose-300 flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {companyName}
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </a>
              </div>
              <p className="text-gray-300">
                {footer.company.tagline}
              </p>
              <div className="flex space-x-4 pt-4">
                <a href="https://facebook.com/vekstboost" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://instagram.com/vekstboost" className="text-gray-400 hover:text-pink-400 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com/company/vekstboost" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Tjenester */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-white">{footer.services.title}</h4>
              <ul className="space-y-2">
                {footer.services.items?.map((service) => (
                  <li key={service.href}>
                    <Link 
                      href={getLocalizedPath(service.href, lang as any)} 
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link 
                    href={getLocalizedPath('/tannlege-markedsforing', lang as any)} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {lang === 'en' ? 'Dental Marketing' : 'Tannlege Markedsføring'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Ressurser */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-white">{footer.resources.title}</h4>
              <ul className="space-y-2">
                {footer.resources.items?.map((resource) => (
                  <li key={resource.href}>
                    <Link 
                      href={getLocalizedPath(resource.href, lang as any)}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {resource.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontakt */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-white">{footer.contact.title}</h4>
              <div className="space-y-3">
                <Link href={getLocalizedPath('/kontakt', lang as any)} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <Mail className="h-4 w-4" />
                  {dict.navigation?.contactUs || 'Kontakt oss'}
                </Link>
                <a href={`tel:${footer.company.phone}`} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <Phone className="h-4 w-4" />
                  {footer.company.phone}
                </a>
                <div className="flex items-start gap-2 text-gray-300">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                  <div>
                    {Array.isArray(footer.contact.address) ? (
                      footer.contact.address.map((line, index) => (
                        <div key={index}>{line}</div>
                      ))
                    ) : (
                      <div>{footer.company.address}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bunntekst */}
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-300 text-sm">
              {footer.legalText.copyright || `© ${new Date().getFullYear()} ${footer.company.name}. Alle rettigheter forbeholdt.`}
            </div>
            <div className="flex gap-6 text-sm">
              {legalLinks.map((item) => (
                <Link 
                  key={item.href}
                  href={getLocalizedPath(item.href, lang as any)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Language Selector */}
          <div className="mt-8">
            <h3 className="font-semibold mb-4 text-white">
              {lang === 'no' ? 'Språk' : 'Languages'}
            </h3>
            <div className="flex flex-wrap gap-4">
              {Object.entries(languageNames).map(([code, name]) => (
                <a
                  key={code}
                  href={`/${code}`}
                  className={`text-gray-300 hover:text-white transition-colors ${
                    lang === code ? 'text-rose-400' : ''
                  }`}
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 