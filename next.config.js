/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const path = require('path');

const nextConfig = {
  // Fix workspace root warning
  outputFileTracingRoot: path.join(__dirname, '../'),
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react', 'react-player'],
    serverActions: {
      allowedOrigins: ['vekstboost.com', 'www.vekstboost.com'],
    },
    scrollRestoration: true,
    // New performance optimizations
    esmExternals: true,
    // Vercel-specific optimizations
    ppr: false, // Partial Prerendering - disable for now
  },
  
  // Enable compression
  compress: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.cdn.tv2.no',
      },
      {
        protocol: 'http',
        hostname: 'magnusmidtboe.com',
      },
      {
        protocol: 'http',
        hostname: 'grimstadakupunktur.no',
      },
      {
        protocol: 'https',
        hostname: 'grimstadakupunktur.no',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Aggressive image optimization settings
    unoptimized: false,
    loader: 'default',
  },
  
  // Enable TypeScript and ESLint checks but ignore during development for speed
  typescript: { 
    ignoreBuildErrors: true 
  },
  eslint: { 
    ignoreDuringBuilds: true 
  },


  
  // Turbopack config for Next.js stable
  turbopack: {
    rules: {
      '*.svg': ['@svgr/webpack'],
    },
  },
  
  // Move serverComponentsExternalPackages to serverExternalPackages for Next.js 15
  serverExternalPackages: ['sharp'],
  
  // Simple redirects for common issues
  async redirects() {
    return [
      // CRITICAL: WWW to non-WWW redirect (SEO fix)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.vekstboost.com' }],
        destination: 'https://vekstboost.com/:path*',
        permanent: true
      },
      
      // Root to default language redirect
      {
        source: '/',
        destination: '/no',
        permanent: false
      },
      
      // Handle language-less URLs
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
      
      // Fix common 404s from old structure
      {
        source: '/bransjer/:path*',
        destination: '/no',
        permanent: true
      },
      {
        source: '/no/bransjer/:path*',
        destination: '/no',
        permanent: true
      },
      {
        source: '/ressurser/:path*',
        destination: '/no/kontakt',
        permanent: true
      },
      {
        source: '/no/ressurser/:path*',
        destination: '/no/kontakt',
        permanent: true
      },
      
      // Handle old paths that might exist in search engines
      {
        source: '/bygg',
        destination: '/no',
        permanent: true
      },
      {
        source: '/no/bygg',
        destination: '/no',
        permanent: true
      }
    ]
  },
  
  // Optimized caching headers
  async headers() {
    return [
      // Static assets caching - extended
      {
        source: '/:path(.+)\\.(jpg|jpeg|gif|png|svg|ico|webp|avif|woff|woff2|ttf|otf)$',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      },
      // JS/CSS caching - optimized
      {
        source: '/:path(.+)\\.(css|js)$',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      },
      // SEO headers with improved caching
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-snippet:-1, max-image-preview:large'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'
          }
        ]
      },
      // Force sitemap regeneration - prevent caching
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate, max-age=0'
          },
          {
            key: 'Pragma',
            value: 'no-cache'
          },
          {
            key: 'Expires',
            value: '0'
          }
        ]
      }
    ]
  },

  // Webpack optimizations for Framer Motion
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization.splitChunks.chunks = 'all';
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        framerMotion: {
          test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
          name: 'framer-motion',
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true,
        },
        reactPlayer: {
          test: /[\\/]node_modules[\\/]react-player[\\/]/,
          name: 'react-player',
          chunks: 'async',
          priority: 15,
          reuseExistingChunk: true,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 5,
          reuseExistingChunk: true,
          minSize: 20000,
          maxSize: 244000,
        },
      };
      
      // Minimize render blocking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }
    
    return config;
  },

  // Enable static optimization
  // output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: true,
  
  // Reduce bundle size
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },
}

module.exports = withBundleAnalyzer(nextConfig);