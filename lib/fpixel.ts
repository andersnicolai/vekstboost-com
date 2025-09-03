// Facebook Pixel IDs
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID // Hoved pixel
export const FB_PIXEL_NETTSIDE = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_NETTSIDE // Nettside pixel

declare global {
  interface Window {
    fbq: any
  }
}

// Initialiser Facebook Pixel
export const fbq = (...args: any) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq(...args)
  }
}

// PageView event
export const pageview = (isNettside = false) => {
  const pixelId = isNettside ? FB_PIXEL_NETTSIDE : FB_PIXEL_ID;
  
  fbq('init', pixelId);
  fbq('track', 'PageView', {
    pixel_id: pixelId
  });
}

// ViewContent event med UTM tracking
export const trackViewContent = async (
  contentName: string,
  contentCategory: string,
  isNettside = false,
  utmParams?: {
    source?: string;
    medium?: string;
    campaign?: string;
  }
) => {
  const pixelId = isNettside ? FB_PIXEL_NETTSIDE : FB_PIXEL_ID;
  
  // Browser event
  fbq('track', 'ViewContent', {
    content_name: contentName,
    content_category: contentCategory,
    content_type: 'product',
    value: isNettside ? 50000 : 25000,
    currency: 'NOK',
    pixel_id: pixelId,
    campaign_source: utmParams?.source || 'direct',
    campaign_medium: utmParams?.medium || 'none',
    campaign_name: utmParams?.campaign || 'organic'
  });

  // Server event
  await sendServerEvent({
    event_name: 'ViewContent',
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: window.location.href,
    action_source: 'website',
    pixel_id: pixelId,
    user_data: {
      client_user_agent: window.navigator.userAgent,
      fbp: getCookieValue('_fbp'),
      fbc: getCookieValue('_fbc')
    },
    custom_data: {
      content_name: contentName,
      content_category: contentCategory,
      content_type: 'product',
      value: isNettside ? 50000 : 25000,
      currency: 'NOK',
      campaign_source: utmParams?.source,
      campaign_medium: utmParams?.medium,
      campaign_name: utmParams?.campaign
    }
  });
}

// Helper for å hente cookie verdier
const getCookieValue = (name: string) => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

// Server-side event sending
const sendServerEvent = async (data: any) => {
  try {
    await fetch('/api/facebook-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Facebook server event error:', error);
  }
}; 