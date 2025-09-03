#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Common Norwegian text patterns that need to be extracted
const hardcodedPatterns = [
  // Fallback patterns like || 'Norwegian text'
  {
    pattern: /\|\|\s*['"`]([^'"`]*(?:æ|ø|å|norge|norsk|oslo|bergen|trondheim)[^'"`]*)['"`]/gi,
    type: 'fallback'
  },
  
  // String literals with Norwegian characters
  {
    pattern: /['"`]([^'"`]*(?:æ|ø|å)[^'"`]*)['"`]/g,
    type: 'literal'
  },
  
  // Object properties with Norwegian text
  {
    pattern: /(\w+):\s*['"`]([^'"`]*(?:æ|ø|å|norsk|norge|oslo|bergen)[^'"`]*)['"`]/g,
    type: 'objectProperty'
  }
];

const norwegianWords = [
  'tannlege', 'frisør', 'advokat', 'pasienter', 'måneder', 'timer', 'uken',
  'markedsføring', 'bookinger', 'klienter', 'nettsiden', 'juridiske',
  'artikler', 'bygger', 'tillit', 'kommer', 'flere', 'nye', 'sparer',
  'automatisk', 'fylles', 'rangerer', 'google', 'høykvalitets', 'saker'
];

function containsNorwegianWords(text) {
  const lowerText = text.toLowerCase();
  return norwegianWords.some(word => lowerText.includes(word)) || 
         /[æøå]/.test(text);
}

function generateKeyFromText(text) {
  // Generate a camelCase key from Norwegian text
  return text
    .toLowerCase()
    .replace(/[æ]/g, 'ae')
    .replace(/[ø]/g, 'o')
    .replace(/[å]/g, 'a')
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
    .substring(0, 30); // Keep keys reasonable length
}

function extractHardcodedText(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const extractions = [];
  
  // Find all hardcoded Norwegian text
  const lines = content.split('\n');
  
  lines.forEach((line, lineIndex) => {
    hardcodedPatterns.forEach(({ pattern, type }) => {
      let match;
      while ((match = pattern.exec(line)) !== null) {
        const text = match[1] || match[2];
        if (text && containsNorwegianWords(text) && text.length > 3) {
          extractions.push({
            line: lineIndex + 1,
            type,
            originalText: text,
            key: generateKeyFromText(text),
            fullMatch: match[0]
          });
        }
      }
    });
  });
  
  return extractions;
}

function processFile(filePath) {
  console.log(`🔍 Processing: ${filePath}`);
  
  const extractions = extractHardcodedText(filePath);
  
  if (extractions.length === 0) {
    console.log(`   ✅ No hardcoded Norwegian text found`);
    return;
  }
  
  console.log(`   📝 Found ${extractions.length} hardcoded texts:`);
  
  extractions.forEach(({ line, originalText, key, type }) => {
    console.log(`      Line ${line}: "${originalText}" -> key: "${key}" (${type})`);
  });
  
  // Generate translation entries
  const translations = {};
  extractions.forEach(({ originalText, key }) => {
    translations[key] = originalText;
  });
  
  return { extractions, translations };
}

// Main execution
const targetFiles = [
  'app/[lang]/lag-nettside/page.tsx',
  'components/ContactForm.tsx', 
  'components/vekst/PerformanceMarketing.tsx',
  'components/PricingToggle.tsx',
  'components/vekst/WebsiteShowcase.tsx'
];

console.log('🚀 Auto-Internationalization Script');
console.log('==================================\n');

const allTranslations = {};

targetFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    const result = processFile(filePath);
    if (result) {
      Object.assign(allTranslations, result.translations);
    }
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
  console.log('');
});

// Generate translation file additions
if (Object.keys(allTranslations).length > 0) {
  console.log('📋 GENERATED TRANSLATION KEYS:');
  console.log('==============================');
  console.log('// Add these to i18n/no.ts:');
  console.log(JSON.stringify(allTranslations, null, 2));
  
  console.log('\n🔧 NEXT STEPS:');
  console.log('1. Add the above keys to your translation files');
  console.log('2. Replace hardcoded text with dict?.section?.key references'); 
  console.log('3. Run the hardcoded text scanner again to verify');
}

process.exit(0); 