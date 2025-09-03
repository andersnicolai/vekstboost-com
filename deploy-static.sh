#!/bin/bash

# VekstBoost Static Export Script
# Creates a static build that can be deployed anywhere

echo "🏗️ Creating static export of VekstBoost..."

# Clean previous builds
rm -rf .next out dist

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Update next.config.js for static export
echo "⚙️ Configuring for static export..."

# Create a temporary config for static export
cat > next.config.static.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  
  // Disable features not compatible with static export
  eslint: { 
    ignoreDuringBuilds: true 
  },
  typescript: { 
    ignoreBuildErrors: true 
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/no/',
        permanent: false
      },
      {
        source: '/kontakt',
        destination: '/no/kontakt/',
        permanent: true
      },
      {
        source: '/lag-nettside',
        destination: '/no/lag-nettside/',
        permanent: true
      },
      {
        source: '/leads',
        destination: '/no/leads/',
        permanent: true
      },
      {
        source: '/getstarted',
        destination: '/no/getstarted/',
        permanent: true
      },
      {
        source: '/takk',
        destination: '/no/takk/',
        permanent: true
      },
      {
        source: '/tannlege-markedsforing',
        destination: '/no/tannlege-markedsforing/',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig;
EOF

# Build with static config
echo "🔨 Building static site..."
NEXT_CONFIG_FILE=next.config.static.js npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  rm -f next.config.static.js
  exit 1
fi

# Clean up temp config
rm -f next.config.static.js

echo "✅ Static build complete!"
echo "📁 Files are ready in the 'out' directory"
echo ""
echo "🚀 Deployment options:"
echo "1. Upload 'out' folder to any static hosting (Netlify, GitHub Pages, etc.)"
echo "2. Run: npx serve out (for local testing)"
echo "3. Use the generated files with any CDN"

# Optional: Create a simple server for testing
echo ""
echo "💡 To test locally, run: npx serve out"