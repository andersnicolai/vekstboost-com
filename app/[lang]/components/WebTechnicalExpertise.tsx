'use client'

import React from 'react'
import Image from 'next/image'
import { Code, Database, Server, Shield, Cpu, Globe } from 'lucide-react'
import { AccessibleHeading } from '@/components/ui/accessible-heading'

interface WebTechnicalExpertiseProps {
  dict: any
  lang: string
}

export default function WebTechnicalExpertise({ dict, lang }: WebTechnicalExpertiseProps) {
  const technicalSkills = [
    {
      title: dict.technicalExpertise?.technologies?.[0]?.title || 'Moderne Frontend',
      description: dict.technicalExpertise?.technologies?.[0]?.description || 'Vi bruker React, Next.js og andre moderne rammeverk for å bygge raske, responsive nettsider.',
      icon: Code,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: dict.technicalExpertise?.technologies?.[1]?.title || 'Skalerbar Backend',
      description: dict.technicalExpertise?.technologies?.[1]?.description || 'Våre arkitekter bygger robuste, skalerbare backend-løsninger som håndterer vekst.',
      icon: Server,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: dict.technicalExpertise?.technologies?.[2]?.title || 'Sikkerhet i fokus',
      description: dict.technicalExpertise?.technologies?.[2]?.description || 'Alle nettsider bygges med enterprise-nivå sikkerhet for å beskytte din virksomhet og dine kunder.',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: dict.technicalExpertise?.technologies?.[3]?.title || 'Integrasjoner',
      description: dict.technicalExpertise?.technologies?.[3]?.description || 'Vi kobler nettsiden din sømløst til CRM, betalingsløsninger, og andre forretningskritiske systemer.',
      icon: Database,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-indigo-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Onedev connection */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-10"></div>
            <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Image 
                    src="/assets/images/logo/onedev-logo.png" 
                    alt="Onedev Consultancy Logo" 
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{dict.technicalExpertise?.title}</h3>
                  <p className="text-gray-600">Enterprise Software Consultancy</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700">
                  {dict.technicalExpertise?.subtitle}
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <Cpu className="w-6 h-6 text-indigo-600 mb-2" />
                    <h4 className="font-medium text-gray-900 mb-1">
                      {dict.technicalExpertise?.benefits?.[0] || 'Arkitekt-nivå kompetanse'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {dict.technicalExpertise?.benefits?.[1] || 'Tilgang til senior-utviklere med enterprise-erfaring'}
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <Globe className="w-6 h-6 text-purple-600 mb-2" />
                    <h4 className="font-medium text-gray-900 mb-1">
                      {dict.technicalExpertise?.benefits?.[2] || 'Internasjonale standarder'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {dict.technicalExpertise?.benefits?.[3] || 'Best practices hentet fra globale software-prosjekter'}
                    </p>
                  </div>
                </div>
                

              </div>
            </div>
          </div>

          {/* Right side - Technical expertise */}
          <div>
            <div className="mb-12">
              <AccessibleHeading level={2} className="text-3xl md:text-4xl font-bold mb-6">
                {dict.technicalExpertise?.meetsBusiness}
              </AccessibleHeading>
              
              <p className="text-lg text-gray-600">
                {dict.technicalExpertise?.combineDescription}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {technicalSkills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                >
                  <div className={`${skill.bgColor} p-2 rounded-lg inline-block mb-4`}>
                    <skill.icon className={`h-6 w-6 ${skill.color}`} />
                  </div>
                  <AccessibleHeading level={3} className="text-lg font-bold mb-2 text-gray-800">
                    {skill.title}
                  </AccessibleHeading>
                  <p className="text-gray-600 text-sm">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 