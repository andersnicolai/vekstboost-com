'use client'

import React from 'react'
import { 
  Search, 
  Paintbrush, 
  Code, 
  Rocket, 
  ArrowRight 
} from 'lucide-react'
import { AccessibleHeading } from '@/components/ui/accessible-heading'
import { AccessibleButton } from '@/components/ui/accessible-button'

interface WebProcessSectionProps {
  dict: any
  lang: string
  scrollToContact: () => void
}

export default function WebProcessSection({ dict, lang, scrollToContact }: WebProcessSectionProps) {
  const processSteps = [
    {
      title: dict.processSection?.steps?.[0]?.title || 'Strategisk Kartlegging',
      description: dict.processSection?.steps?.[0]?.description || 'Vi dykker ned i dine mål, målgruppe og unike salgspunkter. Vår grundige analyse sikrer at vi bygger en løsning som treffer perfekt.',
      icon: Search,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: dict.processSection?.steps?.[1]?.title || 'Design & Brukeropplevelse',
      description: dict.processSection?.steps?.[1]?.description || 'Vi designer en visuelt tiltalende og konverteringsoptimalisert løsning som reflekterer din merkevare og engasjerer besøkende.',
      icon: Paintbrush,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: dict.processSection?.steps?.[2]?.title || 'Teknisk Utvikling',
      description: dict.processSection?.steps?.[2]?.description || 'Vi bygger nettsiden med fokus på ytelse, sikkerhet og skreddersydd funksjonalitet, ved hjelp av de beste moderne teknologiene.',
      icon: Code,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: dict.processSection?.steps?.[3]?.title || 'Lansering & Optimalisering',
      description: dict.processSection?.steps?.[3]?.description || 'Vi sikrer en sømløs lansering og legger grunnlaget for fremtidig vekst med kontinuerlig optimalisering og støtte.',
      icon: Rocket,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div>
            <AccessibleHeading level={2} className="text-3xl md:text-4xl font-bold mb-6">
              {dict.processSection?.title}
            </AccessibleHeading>
            <p className="text-lg text-gray-600">
              {dict.processSection?.subtitle}
            </p>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="relative max-w-5xl mx-auto mb-20">
          {/* Connection Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-500 to-purple-500 hidden md:block"></div>

          {/* Process Steps */}
          <div className="space-y-16">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="relative"
              >
                <div className={`md:grid md:grid-cols-2 md:gap-8 items-center ${index % 2 === 1 ? 'md:rtl' : ''}`}>
                  {/* Step number */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden md:flex items-center justify-center">
                    <div className={`${step.bgColor} w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-md`}>
                      <span className={`font-bold ${step.color}`}>{index + 1}</span>
                    </div>
                  </div>

                  {/* Content for each step */}
                  <div className={`bg-white p-8 rounded-xl shadow-sm border border-gray-100 ${index % 2 === 1 ? 'md:ltr text-left' : 'text-left'}`}>
                    <div className="flex md:hidden items-center gap-4 mb-4">
                      <div className={`${step.bgColor} w-10 h-10 rounded-full flex items-center justify-center`}>
                        <span className={`font-bold ${step.color}`}>{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                    </div>
                    
                    <div className="hidden md:block mb-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                      <div className="flex items-center gap-2">
                        <step.icon className={`h-5 w-5 ${step.color}`} />
                        <span className={`text-sm font-medium ${step.color}`}>
                          {dict.common?.step || 'Steg'} {index + 1}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600">
                      {step.description}
                    </p>

                    {index === processSteps.length - 1 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-gray-700 font-medium">
                          {dict.processSection?.partnershipContinues}
                        </p>
                        <p className="text-gray-600 text-sm mt-2">
                          {dict.processSection?.afterLaunch}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Image/visualization side */}
                  <div className={`hidden md:block ${index % 2 === 1 ? 'md:ltr' : ''}`}>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 flex items-center justify-center h-64">
                      <div className={`${step.bgColor} p-4 rounded-lg inline-flex items-center justify-center`}>
                        <step.icon className={`h-12 w-12 ${step.color}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <p className="text-lg text-gray-700 mb-6">
              {dict.processSection?.readyToBuild}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AccessibleButton 
                onClick={scrollToContact}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-8 rounded-lg hover:opacity-90 transition-opacity"
                ariaLabel={dict.processSection?.bookCall}
              >
                {dict.processSection?.bookCall}
                <ArrowRight className="ml-2 h-5 w-5 inline-block" />
              </AccessibleButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 