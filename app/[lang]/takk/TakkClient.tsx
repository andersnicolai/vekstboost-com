'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { CheckCircle, ArrowLeft, Mail, Phone } from 'lucide-react'

interface TakkClientProps {
  lang: Locale
}

export default function TakkClient({ lang }: TakkClientProps) {
  const [name, setName] = useState('')
  const [dict, setDict] = useState<any>(null)
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const phone = searchParams.get('phone')
  const company = searchParams.get('company')
  
  useEffect(() => {
    const ref = searchParams.get('ref')
    const nameParam = searchParams.get('name')
    
    if (nameParam) {
      setName(nameParam)
    } else if (ref) {
      try {
        const data = JSON.parse(atob(ref))
        setName(data.name)
      } catch (error) {
        console.error('Failed to parse ref:', error)
      }
    }
  }, [searchParams])

  useEffect(() => {
    async function loadDict() {
      const dictionary = await getDictionary(lang)
      setDict(dictionary)
    }
    loadDict()
  }, [lang])

  if (!dict) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>

            {/* Main Message */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {name ? dict.thankYouPage.titleWithName.replace('{name}', name) : dict.thankYouPage.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {dict.thankYouPage.subtitle}
            </p>

            {/* Contact Info Summary */}
            {(name || email || phone || company) && (
              <div className="bg-white rounded-lg p-6 shadow-sm mb-8 text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {dict.thankYouPage.contactInfoTitle}
                </h3>
                <div className="space-y-2 text-gray-600">
                  {name && <p><strong>{dict.thankYouPage.labels.name}</strong> {name}</p>}
                  {email && <p><strong>{dict.thankYouPage.labels.email}</strong> {email}</p>}
                  {phone && <p><strong>{dict.thankYouPage.labels.phone}</strong> {phone}</p>}
                  {company && <p><strong>{dict.thankYouPage.labels.company}</strong> {company}</p>}
                </div>
              </div>
            )}

            {/* What happens next */}
            <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {dict.thankYouPage.nextSteps.title}
              </h3>
              <div className="space-y-3 text-left">
                {dict.thankYouPage.nextSteps.steps.map((step: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-indigo-600 text-sm font-semibold">{index + 1}</span>
                    </div>
                    <p className="text-gray-600">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Options */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white mb-8">
              <h3 className="text-lg font-semibold mb-4">
                {dict.thankYouPage.contact.title}
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+4741166326"
                  className="flex items-center justify-center space-x-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{dict.thankYouPage.contact.phone}</span>
                </a>
                <a
                  href="mailto:nicolai@vekstboost.com"
                  className="flex items-center justify-center space-x-2 border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-indigo-600 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{dict.thankYouPage.contact.email}</span>
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${lang}`}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{dict.thankYouPage.navigation.backToHome}</span>
              </Link>
              
              <Link
                href={`/${lang}/lag-nettside`}
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {dict.thankYouPage.navigation.viewServices}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 