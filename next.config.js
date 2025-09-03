/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel optimizations
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  
  // Ensure proper build output
  generateBuildId: async () => {
    return 'vekstboost-' + Date.now();
  },
  
  // Vercel-specific settings
  typescript: { 
    ignoreBuildErrors: true 
  },
  eslint: { 
    ignoreDuringBuilds: true 
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/no',
        permanent: false
      },
      {
        source: '/kontakt',
        destination: '/no/kontakt',
        permanent: true
      },
      {
        source: '/lag-nettside',
        destination: '/no/lag-nettside',
        permanent: true
      },
      {
        source: '/leads',
        destination: '/no/leads',
        permanent: true
      },
      {
        source: '/getstarted',
        destination: '/no/getstarted',
        permanent: true
      },
      {
        source: '/takk',
        destination: '/no/takk',
        permanent: true
      },
      {
        source: '/tannlege-markedsforing',
        destination: '/no/tannlege-markedsforing',
        permanent: true
      },
      // English URL redirects to proper English URLs  
      {
        source: '/en/create-website',
        destination: '/en/lag-nettside',
        permanent: false
      },
      {
        source: '/en/contact', 
        destination: '/en/kontakt',
        permanent: false
      },
      {
        source: '/en/get-started',
        destination: '/en/getstarted', 
        permanent: false
      },
      {
        source: '/en/thank-you',
        destination: '/en/takk',
        permanent: false
      },
      {
        source: '/en/dental-marketing',
        destination: '/en/tannlege-markedsforing',
        permanent: false
      }
    ]
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig;