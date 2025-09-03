#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Enhanced exclusion patterns for files that should NOT be scanned
const excludePatterns = [
  // Translation files - these SHOULD contain Norwegian text
  /^i18n\/.*\.ts$/,
  /^i18n\/.*\.js$/,
  
  // Build and dependency directories
  /node_modules/,
  /.next/,
  /\.git/,
  /dist/,
  /build/,
  
  // Config and other files
  /package-lock\.json/,
  /yarn\.lock/,
  /\.env/,
  /\.log/,
  /README\.md/,
  /CHANGELOG\.md/,
  
  // Test files
  /\.test\./,
  /\.spec\./,
  /__tests__/
];

// Patterns that indicate the line is technical/non-UI code
const technicalContextPatterns = [
  // Import/export statements
  /^\s*(import|export)\s/,
  
  // Console statements
  /console\.(log|error|warn|info|debug)/,
  
  // Comments
  /^\s*\/\/.*$/,
  /^\s*\/\*.*$/,
  /^\s*\*.*$/,
  
  // API calls and URLs
  /https?:\/\//,
  /fetch\(/,
  /axios\./,
  /'api\//,
  /"api\//,
  
  // Environment variables
  /process\.env/,
  /NODE_ENV/,
  
  // File paths and extensions
  /\.(tsx?|jsx?|css|scss|json|md)['"`]/,
  
  // Internationalization code (already handled)
  /dict\??\./,
  /lang\s*===/,
  /lang\s*!==/, 
  /useTranslation/,
  /t\(/,
  
  // HTML attributes and React props
  /className=/,
  /onClick=/,
  /onChange=/,
  /onSubmit=/,
  /aria-/,
  /data-/,
  /ref=/,
  /key=/,
  /id=/,
  
  // Function and variable declarations
  /^\s*(const|let|var|function)\s/,
  /^\s*return\s/,
  
  // TypeScript/JavaScript syntax
  /interface\s+\w+/,
  /type\s+\w+/,
  /enum\s+\w+/,
  
  // Configuration objects and arrays
  /^\s*\{/,
  /^\s*\}/,
  /^\s*\[/,
  /^\s*\]/,
  
  // Metadata and technical strings
  /viewport/,
  /charset/,
  /content-type/,
  /application\//,
  /text\//,
  
  // Brand names and technical terms that should stay in English
  /VekstBoost/i,
  /Next\.js/i,
  /React/i,
  /TypeScript/i,
  /Tailwind/i,
  /Framer/i,
  /Motion/i
];

// Specific words that are OK to be in Norwegian in technical contexts
const allowedNorwegianWords = [
  // Short words and connectors
  'og', 'i', 'på', 'av', 'til', 'for', 'med', 'som', 'en', 'et', 'er', 'å', 'de', 'vi', 'jeg', 'du',
  
  // Technical terms that might appear in variable names
  'data', 'info', 'config', 'test', 'demo', 'api',
  
  // Already internationalized indicators
  'dict', 'lang', 'locale', 'translation'
];

// Norwegian words that indicate UI text (higher priority)
const uiIndicatorWords = [
  // UI elements
  'knapp', 'meny', 'vindu', 'side', 'skjema', 'felt', 'liste',
  
  // Actions
  'klikk', 'trykk', 'last', 'lagre', 'slett', 'rediger', 'send', 'søk', 'filtrer',
  
  // Status messages
  'feil', 'suksess', 'advarsel', 'laster', 'fullført', 'avbrutt',
  
  // Common business terms
  'kunde', 'bestilling', 'produkt', 'tjeneste', 'pris', 'betaling',
  
  // Norwegian-specific words
  'norwegiske', 'norske', 'norge', 'oslo', 'bergen', 'trondheim',
  
  // Specific VekstBoost terms
  'nettside', 'markedsføring', 'vekst', 'digital', 'optimalisering',
  'suksesshistorier', 'resultater', 'målbare'
];

// More comprehensive Norwegian word detection
const norwegianWordPatterns = [
  // Words ending in typical Norwegian suffixes
  /\b\w*ene\b/g,  // -ene (definite plural)
  /\b\w*tion\b/g, // -tion (but might be English)
  /\b\w*ning\b/g, // -ning (Norwegian suffix)
  /\b\w*het\b/g,  // -het (Norwegian suffix)
  /\b\w*dom\b/g,  // -dom (Norwegian suffix)
  
  // Norwegian characters
  /[æøå]/g,
  
  // Common Norwegian words
  /\b(jeg|du|han|hun|vi|dere|de|og|eller|men|hvis|når|hvor|hva|hvem|hvorfor|hvordan)\b/gi,
  /\b(dette|denne|disse|det|den|som|til|fra|med|på|i|av|for|under|over|ved)\b/gi,
  /\b(ikke|aldri|alltid|noen|alle|mange|få|mye|lite|stor|liten|ny|gammel)\b/gi,
  /\b(norsk|norske|norwegian|oslo|bergen|trondheim|stavanger)\b/gi
];

function countNorwegianWords(text) {
  let count = 0;
  
  norwegianWordPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      count += matches.length;
    }
  });
  
  return count;
}

function hasUIIndicators(text) {
  return uiIndicatorWords.some(word => 
    text.toLowerCase().includes(word.toLowerCase())
  );
}

function isTechnicalContext(line) {
  return technicalContextPatterns.some(pattern => pattern.test(line));
}

function isAlreadyInternationalized(line) {
  // Check if the line contains internationalization code
  return /dict\??\.|lang\s*===/gi.test(line) || 
         /useTranslation|t\(/.test(line) ||
         /\|\|\s*['"`][^'"`]*['"`]\s*$/.test(line); // fallback pattern like || 'fallback text'
}

function shouldIgnoreLine(line, filename) {
  // Skip empty lines and lines that are too short
  if (!line.trim() || line.trim().length < 3) return true;
  
  // Skip lines that are already internationalized
  if (isAlreadyInternationalized(line)) return true;
  
  // Skip technical context
  if (isTechnicalContext(line)) return true;
  
  return false;
}

function analyzeNorwegianContent(line, filename) {
  const norwegianCount = countNorwegianWords(line);
  const hasUIWords = hasUIIndicators(line);
  const lineLength = line.trim().length;
  
  // Determine priority based on multiple factors
  let priority = 'LOW';
  
  if (norwegianCount >= 2 || hasUIWords) {
    priority = 'HIGH';
  } else if (norwegianCount >= 1 && lineLength > 20) {
    priority = 'MEDIUM';
  } else if (norwegianCount >= 1) {
    priority = 'LOW';
  }
  
  // Boost priority for certain file types
  if (filename.includes('component') || filename.includes('page') || filename.includes('form')) {
    if (priority === 'MEDIUM') priority = 'HIGH';
    if (priority === 'LOW') priority = 'MEDIUM';
  }
  
  return { priority, norwegianCount };
}

function shouldExcludeFile(filename) {
  return excludePatterns.some(pattern => pattern.test(filename));
}

function scanFile(filename) {
  if (shouldExcludeFile(filename)) {
    return [];
  }
  
  try {
    const content = fs.readFileSync(filename, 'utf8');
    const lines = content.split('\n');
    const issues = [];
    
    lines.forEach((line, index) => {
      if (shouldIgnoreLine(line, filename)) return;
      
      const analysis = analyzeNorwegianContent(line, filename);
      if (analysis.norwegianCount > 0) {
        issues.push({
          line: index + 1,
          content: line.trim(),
          priority: analysis.priority,
          norwegianWords: analysis.norwegianCount
        });
      }
    });
    
    return issues;
  } catch (error) {
    return [];
  }
}

function scanDirectory(directory) {
  const results = {};
  
  function scanRecursively(dir) {
    try {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const relativePath = path.relative('.', fullPath);
        
        if (shouldExcludeFile(relativePath)) return;
        
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanRecursively(fullPath);
        } else if (stat.isFile() && /\.(tsx?|jsx?|vue|svelte)$/.test(item)) {
          const issues = scanFile(fullPath);
          if (issues.length > 0) {
            results[relativePath] = issues;
          }
        }
      });
    } catch (error) {
      // Silently skip inaccessible directories
    }
  }
  
  scanRecursively(directory);
  return results;
}

// Main execution
console.log('🔍 Scanning for genuine hardcoded Norwegian text that needs internationalization...\n');

const results = scanDirectory('.');
const files = Object.keys(results);

if (files.length === 0) {
  console.log('✅ No hardcoded Norwegian text found! All text appears to be properly internationalized.');
  process.exit(0);
}

// Calculate statistics
let totalIssues = 0;
let highPriorityIssues = 0;
let mediumPriorityIssues = 0;
let lowPriorityIssues = 0;

files.forEach(filename => {
  results[filename].forEach(issue => {
    totalIssues++;
    if (issue.priority === 'HIGH') highPriorityIssues++;
    else if (issue.priority === 'MEDIUM') mediumPriorityIssues++;
    else lowPriorityIssues++;
  });
});

console.log(`📊 RESULTS: Found genuine internationalization issues in ${files.length} files\n`);

console.log('🔥 FILES NEEDING INTERNATIONALIZATION:\n');

// Sort files by priority and number of issues
files.sort((a, b) => {
  const aHighCount = results[a].filter(i => i.priority === 'HIGH').length;
  const bHighCount = results[b].filter(i => i.priority === 'HIGH').length;
  if (aHighCount !== bHighCount) return bHighCount - aHighCount;
  return results[b].length - results[a].length;
});

files.slice(0, 10).forEach((filename, index) => {
  const fileIssues = results[filename];
  const highCount = fileIssues.filter(i => i.priority === 'HIGH').length;
  const mediumCount = fileIssues.filter(i => i.priority === 'MEDIUM').length;
  const lowCount = fileIssues.filter(i => i.priority === 'LOW').length;
  
  console.log(`${index + 1}. ${filename}`);
  console.log(`   📍 ${fileIssues.length} issues (🔴${highCount} HIGH, 🟡${mediumCount} MEDIUM, ⚪${lowCount} LOW)`);
  
  // Show first few HIGH priority issues
  const highPriorityFirst = fileIssues
    .filter(issue => issue.priority === 'HIGH')
    .slice(0, 3);
    
  highPriorityFirst.forEach(issue => {
    const preview = issue.content.length > 80 ? 
      issue.content.substring(0, 80) + '...' : 
      issue.content;
    console.log(`   🔴 Line ${issue.line}: "${preview}"`);
    
    // Extract Norwegian words for context
    const norwegianWords = [];
    norwegianWordPatterns.forEach(pattern => {
      const matches = issue.content.match(pattern);
      if (matches) norwegianWords.push(...matches.slice(0, 3));
    });
    if (norwegianWords.length > 0) {
      console.log(`      Norwegian text: ${norwegianWords.slice(0, 3).join(', ')}`);
    }
  });
  
  if (fileIssues.filter(i => i.priority === 'HIGH').length > 3) {
    console.log(`   ... and ${fileIssues.filter(i => i.priority === 'HIGH').length - 3} more HIGH priority issues`);
  }
  console.log('');
});

if (files.length > 10) {
  console.log(`... and ${files.length - 10} more files with issues\n`);
}

console.log('📈 SUMMARY:');
console.log(`   🔴 ${highPriorityIssues} HIGH priority issues (clear Norwegian UI text)`);
console.log(`   🟡 ${mediumPriorityIssues} MEDIUM priority issues (likely Norwegian UI text)`);
console.log(`   ⚪ ${lowPriorityIssues} LOW priority issues (potential Norwegian text)`);
console.log(`   📊 ${totalIssues} total issues across ${files.length} files\n`);

console.log('💡 RECOMMENDATIONS:');
console.log('   1. Focus on HIGH priority issues first - these are definitely UI text');
console.log('   2. Review MEDIUM priority issues - most likely need internationalization');
console.log('   3. LOW priority issues may be variable names or technical terms');
console.log('   4. Add translation keys to your i18n files for identified text');
console.log('   5. Replace hardcoded text with dict?.section?.key patterns\n');

console.log('🎯 NEXT STEPS:');
console.log('   1. Start with the files listed above');
console.log('   2. Create translation keys in i18n/no.ts, i18n/en.ts, etc.');
console.log('   3. Replace hardcoded Norwegian text with dictionary lookups');
console.log('   4. Re-run this script to track progress\n');

process.exit(0);
