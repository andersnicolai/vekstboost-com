'use client';

import { useState } from 'react';
import { Check, DollarSign, TrendingUp, Star, Users, Zap, Crown } from 'lucide-react';

interface PricingToggleProps {
  onPackageSelect?: (packageType: string, monthlyBudget?: string) => void;
  className?: string;
  dict?: any;
  lang?: string;
}

export default function PricingToggle({ onPackageSelect, className = '', dict, lang = 'no' }: PricingToggleProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const [showBudgetOptions, setShowBudgetOptions] = useState(false);
  const [selectedRevenue, setSelectedRevenue] = useState<string | null>(null);

  // Revenue/budget tiers for qualification
  const revenueTiers = [
    { 
      id: 'startup', 
      label: dict?.pricingToggle?.revenueTiers?.startup?.label || 'Under 1M', 
      description: dict?.pricingToggle?.revenueTiers?.startup?.description || 'Startup/småbedrift',
      recommendedBudget: dict?.pricingToggle?.revenueTiers?.startup?.recommendedBudget || '5-10k/mnd',
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    { 
      id: 'growing', 
      label: dict?.pricingToggle?.revenueTiers?.growing?.label || '1-5M', 
      description: dict?.pricingToggle?.revenueTiers?.growing?.description || 'Voksende bedrift',
      recommendedBudget: dict?.pricingToggle?.revenueTiers?.growing?.recommendedBudget || '10-25k/mnd',
      color: 'bg-green-50 border-green-200 text-green-700'
    },
    { 
      id: 'established', 
      label: dict?.pricingToggle?.revenueTiers?.established?.label || '5-20M', 
      description: dict?.pricingToggle?.revenueTiers?.established?.description || 'Etablert bedrift',
      recommendedBudget: dict?.pricingToggle?.revenueTiers?.established?.recommendedBudget || '25-50k/mnd',
      color: 'bg-purple-50 border-purple-200 text-purple-700'
    },
    { 
      id: 'enterprise', 
      label: dict?.pricingToggle?.revenueTiers?.enterprise?.label || '20M+', 
      description: dict?.pricingToggle?.revenueTiers?.enterprise?.description || 'Stor bedrift',
      recommendedBudget: dict?.pricingToggle?.revenueTiers?.enterprise?.recommendedBudget || '50k+/mnd',
      color: 'bg-amber-50 border-amber-200 text-amber-700'
    }
  ];

  const packages = [
    {
      id: 'foundation',
      name: dict?.pricingToggle?.packages?.foundation?.name || 'Foundation',
      icon: Zap,
      description: dict?.pricingToggle?.packages?.foundation?.description || 'Perfekt for oppstartsbedrifter og små bedrifter',
      monthlyPrice: dict?.pricingToggle?.packages?.foundation?.monthlyPrice || 'Fra 12.000/mnd',
      totalPrice: dict?.pricingToggle?.packages?.foundation?.price || 'Fra 70.000',
      features: dict?.pricingToggle?.packages?.foundation?.features || [
        'Konverteringsoptimalisert design',
        'Mobil-responsiv',
        'Grunnleggende SEO',
        'Kontaktskjema',
        'Basic analytics',
        'Månedlig rapportering'
      ],
      highlight: false,
      bestFor: 'Nye bedrifter som vil etablere seg digitalt'
    },
    {
      id: 'growth',
      name: dict?.pricingToggle?.packages?.growth?.name || 'Growth',
      icon: TrendingUp,
      description: dict?.pricingToggle?.packages?.growth?.description || 'För voksende bedrifter som trenger mer funksjonalitet',
      monthlyPrice: dict?.pricingToggle?.packages?.growth?.monthlyPrice || 'Fra 20.000/mnd',
      totalPrice: dict?.pricingToggle?.packages?.growth?.price || 'Fra 120.000',
      features: dict?.pricingToggle?.packages?.growth?.features || [
        'Alt i Foundation +',
        'Avansert SEO',
        'Blog/nyhetsseksjon',
        'Flere integrasjoner', 
        'A/B testing',
        'Månedlige strategimøter'
      ],
      highlight: true,
      bestFor: 'Bedrifter som ønsker seriøs vekst og resultater'
    },
    {
      id: 'transformation',
      name: dict?.pricingToggle?.packages?.transformation?.name || 'Transformation',
      icon: Crown,
      description: dict?.pricingToggle?.packages?.transformation?.description || 'For etablerte bedrifter med komplekse behov',
      monthlyPrice: dict?.pricingToggle?.packages?.transformation?.monthlyPrice || 'Fra 40.000/mnd',
      totalPrice: dict?.pricingToggle?.packages?.transformation?.price || 'Fra 250.000',
      features: dict?.pricingToggle?.packages?.transformation?.features || [
        'Alt i Growth +',
        'Custom funksjonalitet',
        'E-commerce integrasjon',
        'Advanced analytics',
        'Prioritert support',
        'Månedlige strategimøter'
      ],
      highlight: false,
      bestFor: 'Bedrifter som vil dominere sitt marked'
    }
  ];

  const handleBudgetExploration = () => {
    setShowBudgetOptions(true);
  };

  const handleRevenueSelect = (tierId: string) => {
    setSelectedRevenue(tierId);
    const tier = revenueTiers.find(t => t.id === tierId);
    if (tier && onPackageSelect) {
      onPackageSelect('budget-exploration', tier.recommendedBudget);
    }
  };

  const handlePackageSelect = (packageId: string) => {
    const pkg = packages.find(p => p.id === packageId);
    if (pkg && onPackageSelect) {
      const price = isMonthly ? pkg.monthlyPrice : pkg.totalPrice;
      onPackageSelect(packageId, price);
    }
  };

  if (showBudgetOptions) {
    return (
      <div className={`bg-white rounded-2xl shadow-xl p-8 ${className}`}>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {dict?.pricingToggle?.budgetExploration?.title || dict?.pricingToggle?.pricing?.revenueQuestion || 'Hva er bedriftens årlige omsetning?'}
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {dict?.pricingToggle?.budgetExploration?.subtitle || 'Dette hjelper oss å foreslå en markedsføringsstrategi som passer ditt budsjett. Vi tilpasser alltid løsningen til dine behov og økonomiske rammer.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {revenueTiers.map((tier) => (
            <div
              key={tier.id}
              onClick={() => handleRevenueSelect(tier.id)}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                selectedRevenue === tier.id 
                  ? tier.color + ' shadow-lg transform scale-105' 
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold">{tier.label}</h4>
                <DollarSign className="h-5 w-5 opacity-60" />
              </div>
              <p className="text-sm opacity-80 mb-2">{tier.description}</p>
              <p className="text-xs font-medium">
                {dict?.pricingToggle?.budgetExploration?.recommendedBudget || 'Anbefalt markedsføringsbudsjett:'} {tier.recommendedBudget}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <div className="flex items-start space-x-3">
            <Users className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">
                {dict?.pricingToggle?.budgetExploration?.noBudget?.title || 'Har ikke budsjett, men vil gjerne jobbe med oss?'}
              </h4>
              <p className="text-blue-700 text-sm mb-3">
                {dict?.pricingToggle?.budgetExploration?.noBudget?.description || 'Vi forstår at ikke alle har store budsjetter fra start. Vi kan utforske kreative løsninger som:'}
              </p>
              <ul className="text-blue-700 text-sm space-y-1">
                {(dict?.pricingToggle?.budgetExploration?.noBudget?.options || [
                  'Resultatbasert betaling',
                  'Gradvis opptrapping av budsjett', 
                  'Partnerskap med inntjelingsdeling',
                  'Fleksible betalingsplaner'
                ]).map((option: string, index: number) => (
                  <li key={index}>• {option}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setShowBudgetOptions(false)}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {dict?.pricingToggle?.budgetExploration?.cta?.backToPackages || 'Tilbake til pakker'}
          </button>
          <button
            onClick={() => onPackageSelect?.('custom-solution', dict?.pricingToggle?.pricing?.customSolution || 'Tilpasset løsning')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {dict?.pricingToggle?.budgetExploration?.cta?.exploreCustom || 'Utforsk tilpassede løsninger'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {dict?.pricingToggle?.header?.title || 'Velg din vekststrategi'}
        </h3>
        <p className="text-gray-600 mb-6">
          {dict?.pricingToggle?.header?.subtitle || 'Vi tilpasser alltid løsningen til ditt budsjett og dine mål'}
        </p>
        
        {/* Pricing Toggle */}
        <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 mb-4">
          <button
            onClick={() => setIsMonthly(true)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isMonthly 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {dict?.pricingToggle?.pricing?.monthly || 'Månedlig'}
          </button>
          <button
            onClick={() => setIsMonthly(false)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              !isMonthly 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {dict?.pricingToggle?.header?.oneTimePayment || 'Engangssum'}
          </button>
        </div>
        
        <p className="text-sm text-gray-500">
          {isMonthly 
            ? (dict?.pricingToggle?.pricing?.monthlyIncludes || "Månedlig inkluderer vedlikehold og hosting")
            : (dict?.pricingToggle?.header?.oneTimeIncludes || "Engangssum for komplett løsning")
          }
        </p>
      </div>

      {/* Packages */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {packages.map((pkg) => {
          const Icon = pkg.icon;
          return (
            <div
              key={pkg.id}
              className={`relative p-6 rounded-xl border-2 transition-all hover:shadow-lg cursor-pointer ${
                pkg.highlight 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handlePackageSelect(pkg.id)}
            >
              {pkg.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {lang === 'en' ? 'Most Popular' : 'Mest populær'}
                  </span>
                </div>
              )}
              
              <div className="text-center mb-4">
                <Icon className={`h-8 w-8 mx-auto mb-3 ${pkg.highlight ? 'text-blue-600' : 'text-gray-600'}`} />
                <h4 className="text-lg font-semibold text-gray-900">{pkg.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
                <div className="text-2xl font-bold text-gray-900">
                  {isMonthly ? pkg.monthlyPrice : pkg.totalPrice}
                </div>
                <p className="text-xs text-gray-500 mt-1">{pkg.bestFor}</p>
              </div>

              <ul className="space-y-2 mb-4">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Budget Exploration CTA */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 text-center">
        <h4 className="font-semibold text-gray-900 mb-2">
          {dict?.pricingToggle?.bottomCta?.title || 'Ikke sikker på hva som passer ditt budsjett?'}
        </h4>
        <p className="text-gray-600 text-sm mb-4">
          {dict?.pricingToggle?.bottomCta?.subtitle || 'La oss hjelpe deg å finne den perfekte løsningen basert på din bedrifts størrelse og mål.'}
        </p>
        <button
          onClick={handleBudgetExploration}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          {dict?.pricingToggle?.bottomCta?.button || 'Utforsk budsjettilpassede løsninger'}
        </button>
      </div>
    </div>
  );
} 