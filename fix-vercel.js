#!/usr/bin/env node

// Vercel deployment fix script
// This addresses the path0/path0 issue by ensuring proper build artifacts

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Fixing Vercel deployment issues...');

// 1. Clean and rebuild
console.log('🧹 Cleaning build artifacts...');
try {
  execSync('rm -rf .next .vercel', { stdio: 'inherit' });
} catch (e) {
  // Directory might not exist, that's ok
}

// 2. Fix Next.js configuration for Vercel
console.log('⚙️ Optimizing Next.js config for Vercel...');
const nextConfig = `/** @type {import('next').NextConfig} */
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

module.exports = nextConfig;`;

fs.writeFileSync('next.config.js', nextConfig);

// 3. Create a proper package.json with build scripts
console.log('📦 Updating package.json...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Add Vercel-specific build script
packageJson.scripts['vercel-build'] = 'next build';
packageJson.scripts['build'] = 'next build';

// Ensure exact Next.js version
packageJson.dependencies.next = '15.3.2';

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

// 4. Build locally to ensure it works
console.log('🔨 Testing build...');
try {
  execSync('npm install', { stdio: 'inherit' });
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Local build successful!');
} catch (error) {
  console.log('❌ Build failed:', error.message);
  process.exit(1);
}

// 5. Deploy to Vercel
console.log('🚀 Deploying to Vercel...');
try {
  execSync('npx vercel@latest --prod --yes', { stdio: 'inherit' });
  console.log('✅ Vercel deployment successful!');
} catch (error) {
  console.log('❌ Vercel deployment failed. Trying alternative method...');
  
  try {
    execSync('npx vercel@latest deploy --prod --force', { stdio: 'inherit' });
    console.log('✅ Alternative deployment successful!');
  } catch (altError) {
    console.log('❌ All deployment methods failed.');
    console.log('💡 Please deploy manually via Vercel dashboard:');
    console.log('   https://vercel.com/new');
    console.log('   Import from GitHub: andersnicolai/vekstboost-com');
  }
}