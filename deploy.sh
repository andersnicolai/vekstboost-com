#!/bin/bash

# VekstBoost Deployment Script
# This script builds and deploys using Netlify as an alternative to Vercel

echo "🚀 Starting VekstBoost deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json not found. Please run from project root."
  exit 1
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf dist

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

echo "✅ Build successful!"

# Check if netlify-cli is installed
if ! command -v netlify &> /dev/null; then
  echo "📱 Installing Netlify CLI..."
  npm install -g netlify-cli
fi

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."

# Create netlify.toml if it doesn't exist
cat > netlify.toml << EOF
[build]
  publish = "out"
  command = "npm run build && npm run export"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
EOF

# Add export script to package.json if missing
if ! grep -q '"export"' package.json; then
  echo "📝 Adding export script to package.json..."
  npm pkg set scripts.export="next export"
fi

# Build for static export
echo "📤 Creating static export..."
npm run export

if [ $? -ne 0 ]; then
  echo "❌ Export failed!"
  exit 1
fi

# Deploy
echo "🚀 Deploying to Netlify..."
netlify deploy --prod --dir=out

if [ $? -eq 0 ]; then
  echo "✅ Deployment successful!"
  echo "🎉 Your VekstBoost website is now live!"
else
  echo "❌ Deployment failed!"
  exit 1
fi