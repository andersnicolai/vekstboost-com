'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Mail } from 'lucide-react'
import type { Dictionary } from '@/types/dictionary'
import { getLocalizedPath } from "@/lib/utils"
import LanguageSwitcher from './LanguageSwitcher'
import { Locale } from '@/i18n/config'

interface Props {
  dict: Dictionary
  lang?: Locale
  scrollToContact?: () => void
}

export default function Header({ dict, lang = 'no', scrollToContact }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const nav = dict.header?.nav || {
    home: 'Hjem',
    services: 'Tjenester',
    about: 'Om Oss',
    contact: 'Kontakt',
    results: 'Resultater',
    pricing: 'Priser'
  }
  const [svgError, setSvgError] = useState(false)

  const navigation = [
    {
      name: nav.services || 'Tjenester',
      href: getLocalizedPath('/lag-nettside', lang),
      submenu: [
        { name: dict.services?.website?.title || 'Nettsider', href: getLocalizedPath('/lag-nettside', lang) }
      ]
    },
    {
      name: nav.contact || 'Kontakt',
      href: getLocalizedPath('/kontakt', lang)
    }
  ]

  const additionalItems = []

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo og CTA til venstre */}
          <div className="flex items-center gap-6">
            <Link href={`/${lang}`} className="flex-shrink-0 -ml-3 group">
              <div className="px-3 py-2 flex items-center">
                <Image 
                  src="/logo/vekstboostlogo.png"
                  alt="VekstBoost Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto transition-opacity duration-300 group-hover:opacity-0"
                />
                <Image 
                  src="/logo/vekstboostbrol.png"
                  alt="VekstBoost Roaring Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto absolute transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                />
              </div>
            </Link>
            <button
              onClick={scrollToContact}
              className="hidden md:block bg-error-500 hover:bg-error-600 text-white px-6 py-2 rounded-md transition-all duration-300"
            >
              {dict.website?.hero?.cta || 'Kom i gang'}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium"
                >
                  {item.name}
                </Link>
                
                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform -translate-x-1/4">
                    <div className="py-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Språkvelger og menyknapp til høyre */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center">
              <LanguageSwitcher dict={dict} lang={lang} />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-4">
              <LanguageSwitcher dict={dict} lang={lang} />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-gray-200 p-2"
              >
                <span className="sr-only">Åpne meny</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                    <div className="pt-5 pb-6 px-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <Image 
                            src="/logo/vekstboostlogo.png"
                            alt="VekstBoost Logo"
                            width={32}
                            height={32}
                            className="h-8 w-auto"
                          />
                        </div>
                        <div className="-mr-2">
                          <button
                            onClick={() => setIsOpen(false)}
                            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                          >
                            <span className="sr-only">Lukk meny</span>
                            <X className="h-6 w-6" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-6">
                        <nav className="grid gap-y-4">
                          {/* Tjenester - alltid åpen */}
                          <div>
                            <div className="text-base font-medium text-gray-900">
                              {nav.services || 'Tjenester'}
                            </div>
                            <div className="mt-2 ml-4">
                              <Link href={getLocalizedPath('/lag-nettside', lang)} className="block text-sm text-gray-500 hover:text-gray-900 py-2">
                                {dict.services?.website?.title || 'Nettsider'}
                              </Link>
                            </div>
                          </div>

                          {/* Collapsable seksjoner */}
                          {[
                            // Midlertidig fjernet bransjer siden disse sidene ikke eksisterer ennå
                          ].map((section) => (
                            <div key={section.name} className="border-t pt-4">
                              <button
                                onClick={() => {
                                  const elem = document.getElementById(`mobile-${section.name}`);
                                  if (elem) {
                                    elem.classList.toggle('hidden');
                                  }
                                }}
                                className="flex justify-between items-center w-full text-base font-medium text-gray-900"
                              >
                                {section.name}
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                              <div id={`mobile-${section.name}`} className="hidden mt-2 ml-4">
                                {section.items.map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block text-sm text-gray-500 hover:text-gray-900 py-2"
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}

                          {/* CTA Knapp */}
                          <button
                            onClick={() => {
                              setIsOpen(false);
                              scrollToContact && scrollToContact();
                            }}
                            className="mt-4 w-full bg-red-600 text-white px-4 py-3 rounded-md font-medium hover:bg-red-500 transition-colors"
                          >
                            {dict.website?.hero?.cta || 'Kom i gang'}
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
} 