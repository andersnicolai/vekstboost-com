'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WebsiteGenerationRequest {
  businessName: string;
  industry: string;
  location: string;
  currentWebsite?: string;
  email: string;
  phone: string;
  planType: 'starter' | 'professional' | 'enterprise';
}

interface InstantWebsiteGeneratorProps {
  dict?: any;
  lang?: string;
}

export default function InstantWebsiteGenerator({ dict, lang = 'no' }: InstantWebsiteGeneratorProps = {}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<WebsiteGenerationRequest>({
    businessName: '',
    industry: '',
    location: '',
    currentWebsite: '',
    email: '',
    phone: '',
    planType: 'professional'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSite, setGeneratedSite] = useState<string>('');

  const industries = [
    { value: 'tannlege', label: dict?.instantWebsiteGenerator?.industries?.find((i: any) => i.value === 'tannlege')?.label || '🦷 Tannlege', price: 6000 },
    { value: 'frisør', label: dict?.instantWebsiteGenerator?.industries?.find((i: any) => i.value === 'frisør')?.label || '💇‍♀️ Frisør', price: 4000 },
    { value: 'advokat', label: dict?.instantWebsiteGenerator?.industries?.find((i: any) => i.value === 'advokat')?.label || '⚖️ Advokat', price: 8000 },
    { value: 'eiendom', label: dict?.instantWebsiteGenerator?.industries?.find((i: any) => i.value === 'eiendom')?.label || '🏠 Eiendom', price: 10000 },
    { value: 'bygg', label: dict?.instantWebsiteGenerator?.industries?.find((i: any) => i.value === 'bygg')?.label || '🏗️ Bygg', price: 7000 },
    { value: 'other', label: dict?.instantWebsiteGenerator?.industries?.find((i: any) => i.value === 'other')?.label || '🔧 Annet', price: 5000 }
  ];

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 2999,
      features: ['1 AI artikkel/uke', 'Basic widgets', 'Standard analytics']
    },
    {
      id: 'professional', 
      name: 'Professional',
      price: 4999,
      features: ['1 AI artikkel/dag', 'Unlimited widgets', 'Advanced analytics', 'Booking system']
    },
    {
      id: 'enterprise',
      name: 'Enterprise', 
      price: 9999,
      features: ['Custom AI training', 'White-label', 'Dedicated support', 'Custom integrations']
    }
  ];

  const handleInputChange = (field: keyof WebsiteGenerationRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateWebsite = async () => {
    setIsGenerating(true);
    
    try {
      // LEAD CAPTURE: Send lead to our contact API first
      const leadResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.businessName,
          email: formData.email,
          phone: formData.phone,
          company: formData.businessName,
          service: 'ai-website-generation',
          message: `Ønsker AI-generert nettside for ${formData.industry} i ${formData.location}. Plan: ${formData.planType}`,
          source: 'lag-nettside-page',
          leadData: {
            industry: formData.industry,
            location: formData.location,
            planType: formData.planType,
            currentWebsite: formData.currentWebsite
          }
        })
      });

      if (leadResponse.ok) {
        // Mock successful setup for now (since AI generator isn't ready)
        const subdomain = `${formData.businessName.toLowerCase().replace(/\s+/g, '-')}.vekstboost.com`;
        setGeneratedSite(subdomain);
        setStep(4); // Success step
        
        // TODO: When AI generator is ready, uncomment below:
        /*
        const contentResponse = await fetch('/api/ai-articles/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tenant: formData.businessName.toLowerCase().replace(/\s+/g, '-'),
            industry: formData.industry,
            localBusiness: {
              name: formData.businessName,
              location: formData.location
            }
          })
        });
        */
      } else {
        throw new Error('Failed to capture lead');
      }
      
    } catch (error) {
      console.error('Website generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const processPayment = async () => {
    setIsGenerating(true);
    
    // LEAD CAPTURE: Always capture the lead first, even before payment
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.businessName,
          email: formData.email,
          phone: formData.phone,
          company: formData.businessName,
          service: 'ai-website-generation',
          message: `Ønsker AI-generert nettside for ${formData.industry} i ${formData.location}. Plan: ${formData.planType} (${selectedPlan?.price}kr/mnd)`,
          source: 'lag-nettside-payment-attempt',
          leadData: {
            industry: formData.industry,
            location: formData.location,
            planType: formData.planType,
            planPrice: selectedPlan?.price,
            currentWebsite: formData.currentWebsite,
            paymentAttempted: true
          }
        })
      });
    } catch (error) {
      console.error('Lead capture failed:', error);
    }
    
    // TODO: Stripe integration
    // const paymentIntent = await createPaymentIntent(selectedPlan.price);
    
    // For now, proceed to generate website (mock payment success)
    setTimeout(() => {
      generateWebsite();
    }, 2000);
  };

  const selectedIndustry = industries.find(i => i.value === formData.industry);
  const selectedPlan = plans.find(p => p.id === formData.planType);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {dict?.instantWebsiteGenerator?.title || (lang === 'no' ? '🚀 Lag din VekstBoost nettside på 5 minutter' : '🚀 Create your VekstBoost website in 5 minutes')}
        </h1>
        <p className="text-gray-600">
          {dict?.instantWebsiteGenerator?.subtitle || (lang === 'no' ? 'Taste inn info → Betal → Få din nye nettside med AI-innhold og widgets' : 'Enter info → Pay → Get your new website with AI content and widgets')}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {num}
            </div>
            {num < 4 && (
              <div className={`w-12 h-1 ${step > num ? 'bg-blue-600' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Business Info */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>{dict?.instantWebsiteGenerator?.steps?.step1?.title || 'Fortell oss om businessen din'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{dict?.instantWebsiteGenerator?.steps?.step1?.businessName || 'Business navn'}</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                placeholder={dict?.instantWebsiteGenerator?.steps?.step1?.businessNamePlaceholder || 'Tannlege Smith Oslo'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{dict?.instantWebsiteGenerator?.steps?.step1?.industry || 'Bransje'}</label>
              <select
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{dict?.instantWebsiteGenerator?.steps?.step1?.industryPlaceholder || 'Velg bransje'}</option>
                {industries.map(industry => (
                  <option key={industry.value} value={industry.value}>
                    {industry.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{dict?.instantWebsiteGenerator?.steps?.step1?.location || 'Lokasjon'}</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder={dict?.instantWebsiteGenerator?.steps?.step1?.locationPlaceholder || 'Oslo'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{dict?.instantWebsiteGenerator?.steps?.step1?.currentWebsite || 'Nåværende nettside (valgfritt)'}</label>
              <input
                type="url"
                value={formData.currentWebsite}
                onChange={(e) => handleInputChange('currentWebsite', e.target.value)}
                placeholder={dict?.instantWebsiteGenerator?.steps?.step1?.currentWebsitePlaceholder || 'https://eksempel.no'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!formData.businessName || !formData.industry || !formData.location}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            >
              {dict?.instantWebsiteGenerator?.steps?.step1?.nextButton || 'Neste: Velg plan'}
            </button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Plan Selection */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Velg din plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => handleInputChange('planType', plan.id as any)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.planType === plan.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{plan.name}</h3>
                    <span className="text-xl font-bold text-blue-600">
                      {plan.price.toLocaleString('no-NO')}kr/mnd
                    </span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx}>✅ {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Tilbake
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Neste: Kontaktinfo
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Contact + Payment */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Kontaktinfo og betaling</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">E-post</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="post@business.no"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Telefon</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+47 12 34 56 78"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Bestillingssammendrag:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>{selectedPlan?.name} plan</span>
                  <span>{selectedPlan?.price.toLocaleString('no-NO')}kr/mnd</span>
                </div>
                <div className="flex justify-between">
                  <span>VekstBoost nettside</span>
                  <span className="text-green-600">Inkludert</span>
                </div>
                <div className="flex justify-between">
                  <span>AI innhold + widgets</span>
                  <span className="text-green-600">Inkludert</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total per måned:</span>
                  <span>{selectedPlan?.price.toLocaleString('no-NO')}kr</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Tilbake
              </button>
              <button
                onClick={processPayment}
                disabled={!formData.email || !formData.phone || isGenerating}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
              >
                {isGenerating ? 'Genererer nettside...' : `Betal ${selectedPlan?.price.toLocaleString('no-NO')}kr`}
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Din VekstBoost nettside er klar!
            </h2>
            <p className="text-gray-600 mb-6">
              Vi har generert en komplett nettside med AI-innhold og widgets for {formData.businessName}
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-2">Din nye nettside:</p>
              <a
                href={`https://${generatedSite}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium text-lg hover:underline"
              >
                https://{generatedSite}
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-green-50 p-3 rounded">
                <div className="font-medium text-green-800">✅ AI Innhold</div>
                <div className="text-green-600">4 artikler generert</div>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <div className="font-medium text-blue-800">✅ Widgets</div>
                <div className="text-blue-600">Lead capture aktiv</div>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <div className="font-medium text-purple-800">✅ Analytics</div>
                <div className="text-purple-600">Tracking installert</div>
              </div>
              <div className="bg-orange-50 p-3 rounded">
                <div className="font-medium text-orange-800">✅ SEO</div>
                <div className="text-orange-600">Lokalt optimert</div>
              </div>
            </div>

            <button
              onClick={() => window.open(`https://${generatedSite}`, '_blank')}
              className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Se din nye nettside 🚀
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 