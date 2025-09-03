'use client'

// Type definisjon for Meta Pixel
declare global {
  interface Window {
    fbq: any;
  }
}

// Type definisjon for GA4
declare global {
  interface Window {
    gtag: any;
    dataLayer: any[];
    _mouseActivity: number;
  }
}

// Meta Pixel Datasett IDs
const META_PIXEL_IDS = {
  MAIN: 'vekstboost_main',
  GROWTH: 'vekstboost_growth',
  WEBSITE: 'vekstboost_website_campaign'
}

// Faktiske Pixel IDs
const PIXEL_IDS = {
  MAIN: '1139964847456427',
  WEBSITE: '1199858561560215'
}

// Brukerscoring
const USER_SCORE_WEIGHTS = {
  PAGE_VIEW: 1,
  SCROLL_75: 5,
  FORM_START: 10,
  FORM_COMPLETE: 25,
  CLICK_CTA: 15,
  TIME_ON_PAGE: 0.1, // per minutt
};

// Hjelpefunksjon for å sende events til riktig datasett
export const trackEvent = (eventName: string, params: any = {}, dataset: 'MAIN' | 'GROWTH' | 'WEBSITE' = 'MAIN') => {
  if (typeof window === 'undefined') return;

  const pixelId = META_PIXEL_IDS[dataset];
  
  // Sjekk om Meta Pixel er lastet
  if (typeof window.fbq === 'undefined') {
    console.warn('Meta Pixel not loaded');
    return;
  }

  // Sjekk om vi er på nettsidelandingssiden
  const isOnWebsiteLandingPage = window.location.pathname.includes('/nettside') || 
                                window.location.pathname.includes('/no/nettside');

  // For Lead-hendelser, send til riktig pixel basert på siden
  if (eventName === 'Lead' || eventName === 'lead') {
    console.log(`🎯 Sending Lead event to ${isOnWebsiteLandingPage ? 'WEBSITE' : 'MAIN'} pixel`);
    
    // Send til website pixel hvis vi er på nettsidelandingssiden
    if (isOnWebsiteLandingPage) {
      window.fbq('trackSingle', PIXEL_IDS.WEBSITE, eventName, {
        ...params,
        content_category: params.content_category || 'Website'
      });
      console.log('✅ Lead event sent to WEBSITE pixel');
    }
    
    // Send alltid til hovedpixel uansett
    window.fbq('trackSingle', PIXEL_IDS.MAIN, eventName, {
      ...params,
      content_category: params.content_category || 'Main'
    });
    console.log('✅ Lead event sent to MAIN pixel');
    
    return;
  }

  // For andre hendelser, bruk standard logikk
  window.fbq('track', eventName, {
    ...params,
    pixel_id: pixelId
  });

  // For viktige events, send også til hoveddatasettet
  if (dataset !== 'MAIN' && ['form_submission', 'booking', 'contact'].includes(eventName)) {
    window.fbq('track', eventName, {
      ...params,
      pixel_id: META_PIXEL_IDS.MAIN
    });
  }
}

// Eksempel på bruk:
// trackEvent('form_submission', { form_type: 'contact' }, 'GROWTH');
// trackEvent('page_view', { page: 'website-landing' }, 'WEBSITE');
// trackEvent('general_event', { type: 'info' }, 'MAIN');

// Spor hendelser med utvidet data for GA4
export const trackEventGA4 = (
  eventName: string,
  eventParams: { [key: string]: any } = {}
) => {
  if (typeof window === 'undefined') return;

  const enrichedParams = {
    ...eventParams,
    event_time: new Date().toISOString(),
    session_id: getSessionId(),
    user_score: calculateUserScore(),
    page_context: {
      url: window.location.href,
      path: window.location.pathname,
      title: document.title,
      referrer: document.referrer
    },
    user_context: {
      returning: localStorage.getItem('_ga') ? true : false,
      visit_count: parseInt(localStorage.getItem('visit_count') || '0'),
      user_agent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform
    },
    technical_context: {
      screen_size: `${window.screen.width}x${window.screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      pixel_ratio: window.devicePixelRatio,
      connection: (navigator as any).connection?.effectiveType,
      memory: (navigator as any).deviceMemory,
      cores: navigator.hardwareConcurrency
    }
  };

  window.gtag('event', eventName, enrichedParams);
  updateUserScore(eventName);
};

// Spor sidevisning med utvidet data
export const trackPageview = (url: string) => {
  if (typeof window === 'undefined') return;

  const referrer = document.referrer;
  const loadTime = window.performance?.timing?.loadEventEnd - window.performance?.timing?.navigationStart;
  
  window.gtag('config', 'G-1SQF9B36SY', {
    page_path: url,
    page_referrer: referrer,
    page_load_time: loadTime,
    user_properties: {
      returning_visitor: localStorage.getItem('_ga') ? true : false,
      visit_count: parseInt(localStorage.getItem('visit_count') || '0') + 1,
      last_visit: localStorage.getItem('last_visit'),
      user_score: calculateUserScore()
    }
  });

  // Oppdater besøksdata
  localStorage.setItem('last_visit', new Date().toISOString());
  localStorage.setItem('visit_count', (parseInt(localStorage.getItem('visit_count') || '0') + 1).toString());
};

// Helper for å sende konverteringer
export const trackConversion = (
  conversionName: string,
  value?: number,
  currency: string = 'NOK'
) => {
  trackEventGA4(conversionName, {
    value,
    currency,
    conversion: true
  });
};

// Helper for å sende form submissions
export const trackFormSubmission = (
  formId: string,
  formData: { [key: string]: any }
) => {
  trackEventGA4('form_submission', {
    form_id: formId,
    ...formData
  });
};

// Spor skjemainteraksjoner
export const trackFormInteraction = (
  formId: string,
  action: 'start' | 'complete' | 'abandon',
  formData: { [key: string]: any } = {}
) => {
  const enrichedFormData = {
    ...formData,
    form_id: formId,
    action,
    interaction_time: new Date().toISOString(),
    time_spent: getFormTimeSpent(formId),
    form_score: calculateFormScore(formData)
  };

  trackEventGA4(`form_${action}`, enrichedFormData);
  
  if (action === 'complete') {
    trackConversion('form_submission', 0);
  }
};

// UTM Parameter Utilities
export const getUTMParameters = () => {
  if (typeof window === 'undefined') return {
    utm_source: 'direct',
    utm_medium: 'none',
    utm_campaign: 'organic',
    utm_content: 'none',
    utm_term: 'none'
  };

  const urlParams = new URLSearchParams(window.location.search);
  
  return {
    utm_source: urlParams.get('utm_source') || 
                sessionStorage.getItem('utm_source') || 
                localStorage.getItem('utm_source') || 
                'direct',
    utm_medium: urlParams.get('utm_medium') || 
                sessionStorage.getItem('utm_medium') || 
                localStorage.getItem('utm_medium') || 
                'none',
    utm_campaign: urlParams.get('utm_campaign') || 
                  sessionStorage.getItem('utm_campaign') || 
                  localStorage.getItem('utm_campaign') || 
                  'organic',
    utm_content: urlParams.get('utm_content') || 
                 sessionStorage.getItem('utm_content') || 
                 localStorage.getItem('utm_content') || 
                 'none',
    utm_term: urlParams.get('utm_term') || 
              sessionStorage.getItem('utm_term') || 
              localStorage.getItem('utm_term') || 
              'none'
  };
};

// Store UTM parameters for session persistence
export const storeUTMParameters = () => {
  if (typeof window === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  
  utmParams.forEach(param => {
    const value = urlParams.get(param);
    if (value) {
      // Store in both session and local storage
      sessionStorage.setItem(param, value);
      localStorage.setItem(param, value);
    }
  });
};

// Get enhanced attribution data
export const getAttributionData = () => {
  if (typeof window === 'undefined') return {
    utm_source: 'direct',
    utm_medium: 'none', 
    utm_campaign: 'organic',
    utm_content: 'none',
    utm_term: 'none',
    referrer: 'direct',
    landing_page: '',
    user_agent: '',
    timestamp: new Date().toISOString(),
    session_id: ''
  };

  const utmParams = getUTMParameters();
  
  return {
    ...utmParams,
    referrer: document.referrer || 'direct',
    landing_page: window.location.pathname,
    user_agent: navigator.userAgent,
    timestamp: new Date().toISOString(),
    session_id: getSessionId()
  };
};

// Track marketing campaign performance
export const trackCampaignAttribution = () => {
  const attribution = getAttributionData();
  
  trackEventGA4('campaign_attribution', attribution);
  
  // Send to Meta Pixel as well
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_type: 'campaign_landing',
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign
    });
  }
};

// Spor brukerengasjement
export const trackEngagement = (
  type: 'scroll' | 'click' | 'hover' | 'copy',
  details: { [key: string]: any } = {}
) => {
  const enrichedDetails = {
    ...details,
    engagement_type: type,
    engagement_time: new Date().toISOString(),
    session_duration: getSessionDuration(),
    total_engagement_time: getTotalEngagementTime()
  };

  trackEventGA4('user_engagement', enrichedDetails);
};

// Helper funksjoner
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

const calculateUserScore = () => {
  const score = parseInt(localStorage.getItem('user_score') || '0');
  return score;
};

const updateUserScore = (eventName: string) => {
  const currentScore = calculateUserScore();
  const eventScore = USER_SCORE_WEIGHTS[eventName.toUpperCase()] || 0;
  localStorage.setItem('user_score', (currentScore + eventScore).toString());
};

const getFormTimeSpent = (formId: string) => {
  const startTime = sessionStorage.getItem(`form_start_${formId}`);
  if (!startTime) return 0;
  return Math.round((Date.now() - parseInt(startTime)) / 1000);
};

const calculateFormScore = (formData: { [key: string]: any }) => {
  let score = 0;
  const fields = Object.keys(formData).length;
  const filledFields = Object.values(formData).filter(v => v).length;
  return Math.round((filledFields / fields) * 100);
};

const getSessionDuration = () => {
  const startTime = sessionStorage.getItem('session_start');
  if (!startTime) {
    sessionStorage.setItem('session_start', Date.now().toString());
    return 0;
  }
  return Math.round((Date.now() - parseInt(startTime)) / 1000);
};

const getTotalEngagementTime = () => {
  return parseInt(localStorage.getItem('total_engagement_time') || '0');
}; 