'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { storeUTMParameters, trackCampaignAttribution } from '@/utils/analytics'

interface GoogleTagManagerProps {
  lang: string
}

export default function GoogleTagManager({ lang }: GoogleTagManagerProps) {
  useEffect(() => {
    // Initialize UTM tracking on page load
    storeUTMParameters()
    
    // Track campaign attribution after a short delay to ensure scripts are loaded
    const timer = setTimeout(() => {
      trackCampaignAttribution()
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  // Only load GTM for Norwegian
  if (lang !== 'no') {
    return null
  }

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TXK7STL9');
          `,
        }}
      />
      {/* End Google Tag Manager */}
      
      {/* Facebook Pixel Code */}
      <Script
        id="facebook-pixel"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            // Initialize both pixels
            fbq('init', '1139964847456427'); // Main pixel
            fbq('init', '1199858561560215'); // Website pixel
            fbq('track', 'PageView');
            
            console.log('✅ Facebook Pixels initialized:', {
              main_pixel: '1139964847456427',
              website_pixel: '1199858561560215'
            });
          `,
        }}
      />
      
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-TXK7STL9"
          height="0" 
          width="0" 
          style={{display:'none',visibility:'hidden'}}
        />
      </noscript>
      {/* End Google Tag Manager (noscript) */}
    </>
  )
} 