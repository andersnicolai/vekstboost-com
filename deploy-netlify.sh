#!/bin/bash

# Quick Netlify deployment script for VekstBoost
# This bypasses Vercel issues by using Netlify instead

echo "🚀 Deploying VekstBoost to Netlify..."

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

# Install Netlify CLI if not present
if ! command -v netlify &> /dev/null; then
  echo "📱 Installing Netlify CLI..."
  npm install -g netlify-cli
fi

# Create netlify.toml for Next.js
cat > netlify.toml << EOF
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[functions]
  node_bundler = "esbuild"

[[redirects]]
  from = "/"
  to = "/no"
  status = 307

[[redirects]]
  from = "/kontakt"
  to = "/no/kontakt"
  status = 301

[[redirects]]
  from = "/lag-nettside"
  to = "/no/lag-nettside"
  status = 301

[[redirects]]
  from = "/leads"
  to = "/no/leads"
  status = 301

[[redirects]]
  from = "/getstarted"
  to = "/no/getstarted"
  status = 301

[[redirects]]
  from = "/takk"
  to = "/no/takk"
  status = 301

[[redirects]]
  from = "/tannlege-markedsforing"
  to = "/no/tannlege-markedsforing"
  status = 301

[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
EOF

echo "🌐 Deploying to Netlify..."
netlify deploy --prod

if [ $? -eq 0 ]; then
  echo "✅ Deployment successful!"
  echo "🎉 Your VekstBoost website is now live on Netlify!"
else
  echo "❌ Deployment failed!"
  echo "💡 Try: netlify login first, then run this script again"
fi