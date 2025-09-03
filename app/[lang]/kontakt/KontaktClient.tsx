'use client'

import { useState } from 'react'
import { Locale } from '@/i18n/config'
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react'

interface KontaktClientProps {
  dict: any
  lang: Locale
}

export default function KontaktClient({ dict, lang }: KontaktClientProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        // Redirect to thank you page with user data
        const params = new URLSearchParams({
          ...(formData.name && { name: formData.name }),
          ...(formData.email && { email: formData.email }),
          ...(formData.phone && { phone: formData.phone }),
          ...(formData.company && { company: formData.company })
        })
        
        // Redirect after a short delay to show success message
        setTimeout(() => {
          window.location.href = `/${lang}/takk?${params.toString()}`
        }, 1500)
        
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
        setErrorMessage(result.error || 'Noe gikk galt. Prøv igjen senere.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Noe gikk galt. Prøv igjen senere.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {dict.contact?.title || 'Kontakt Vekstboost – Vi hjelper din bedrift å vokse'}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {dict.contact?.subtitle || 'Ta kontakt med oss i Vekstboost for hjelp med digital markedsføring, SEO og annonsering. Vi hjelper din bedrift å vokse på nett.'}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Ta kontakt
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-indigo-600 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">E-post</h3>
                      <p className="text-gray-600">
                        Bruk kontaktskjemaet for å sende oss en melding
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-indigo-600 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Telefon</h3>
                      <a href="tel:+4741166326" className="text-gray-600 hover:text-indigo-600">
                        +47 411 66 326
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-indigo-600 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Adresse</h3>
                      <p className="text-gray-600">
                        Oslo
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Åpningstider
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Mandag - Fredag</span>
                      <span>09:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lørdag - Søndag</span>
                      <span>Stengt</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Send oss en melding
                </h3>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="text-green-800">
                      Takk for din henvendelse! Vi kontakter deg snart.
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <p className="text-red-800">{errorMessage}</p>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Navn *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ditt navn"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-post *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="din@epost.no"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bedrift
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Bedriftsnavn"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="+47 123 45 678"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hva kan vi hjelpe deg med?
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Velg tjeneste</option>
                      <option value="nettside">Ny nettside</option>
                      <option value="digital-marketing">Digital markedsføring</option>
                      <option value="seo">SEO optimalisering</option>
                      <option value="consulting">Konsultasjon</option>
                      <option value="other">Annet</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Melding *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Fortell oss om ditt prosjekt og dine behov..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 disabled:opacity-50 text-white px-6 py-3 rounded-md font-medium transition-opacity"
                  >
                    {isSubmitting ? 'Sender...' : 'Send melding'}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Vi svarer vanligvis innen 24 timer
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Klar for å starte ditt neste prosjekt?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              La oss hjelpe deg med å ta bedriften din til neste nivå
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+4741166326"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Ring oss nå
              </a>
              <button
                onClick={() => {
                  document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Send melding
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 