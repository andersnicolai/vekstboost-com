#!/bin/bash

# Enhanced Vercel deployment script for VekstBoost
# This script works around the CLI path issues

echo "🚀 Deploying VekstBoost to Vercel..."

# Clean up any problematic files
echo "🧹 Cleaning up..."
rm -rf .vercel
rm -rf .next

# Fix Next.js version compatibility
echo "🔧 Fixing Next.js version..."
npm install next@15.3.2 --save-exact

# Create a clean vercel.json without problematic configs
cat > vercel.json << 'EOF'
{
  "version": 2,
  "framework": "nextjs",
  "buildCommand": "next build",
  "regions": ["fra1", "arn1", "dub1"],
  "functions": {
    "app/api/**": {
      "maxDuration": 30
    },
    "app/api/edge-analytics/**": {
      "maxDuration": 10,
      "runtime": "edge"
    },
    "app/api/edge-optimize/**": {
      "maxDuration": 10,
      "runtime": "edge"
    },
    "app/api/edge-contact/**": {
      "maxDuration": 10,
      "runtime": "edge"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options", 
          "value": "DENY"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/",
      "destination": "/no",
      "statusCode": 307
    },
    {
      "source": "/kontakt",
      "destination": "/no/kontakt",
      "statusCode": 301
    },
    {
      "source": "/lag-nettside", 
      "destination": "/no/lag-nettside",
      "statusCode": 301
    },
    {
      "source": "/leads",
      "destination": "/no/leads",
      "statusCode": 301
    },
    {
      "source": "/getstarted",
      "destination": "/no/getstarted", 
      "statusCode": 301
    },
    {
      "source": "/takk",
      "destination": "/no/takk",
      "statusCode": 301
    },
    {
      "source": "/tannlege-markedsforing",
      "destination": "/no/tannlege-markedsforing",
      "statusCode": 301
    }
  ]
}
EOF

# Ensure we have the latest Vercel CLI
echo "📱 Installing latest Vercel CLI..."
npm install vercel@latest

# Create a simple build script that Vercel will use
echo "📝 Creating build optimization..."
cat > .vercelignore << 'EOF'
.next/
node_modules/
.git/
*.log
.DS_Store
coverage/
.nyc_output/
.env*.local
EOF

# Test build locally first
echo "🔨 Testing build locally..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Local build failed! Fix errors before deploying."
  exit 1
fi

echo "✅ Local build successful!"

# Try deployment with multiple strategies
echo "🚀 Attempting Vercel deployment..."

# Strategy 1: Use npx with latest version
echo "📡 Trying latest CLI..."
npx vercel@latest --prod --yes --force

if [ $? -eq 0 ]; then
  echo "✅ Deployment successful!"
  exit 0
fi

# Strategy 2: Link project manually and deploy
echo "🔗 Trying manual project linking..."
npx vercel@latest link --yes
npx vercel@latest --prod

if [ $? -eq 0 ]; then
  echo "✅ Deployment successful!"
  exit 0
fi

# Strategy 3: Deploy with specific flags
echo "🎯 Trying with specific flags..."
npx vercel@latest deploy --prod --force --public

if [ $? -eq 0 ]; then
  echo "✅ Deployment successful!"
  exit 0
fi

echo "❌ All Vercel deployment attempts failed."
echo "💡 Alternative solutions:"
echo "1. Deploy manually via Vercel dashboard: https://vercel.com/new"
echo "2. Check GitHub integration: Import your repo directly"
echo "3. Contact Vercel support about the path0/path0 issue"