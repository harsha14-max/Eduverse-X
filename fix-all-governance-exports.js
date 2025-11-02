#!/usr/bin/env node

/**
 * Fix all governance components to use separated exports
 * This fixes Turbopack export issues
 */

const fs = require('fs');
const path = require('path');

const governanceDir = path.join(__dirname, 'components', 'governance');

// Get all .tsx files in governance directory
const files = fs.readdirSync(governanceDir)
  .filter(file => file.endsWith('.tsx'))
  .map(file => path.join(governanceDir, file));

files.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find all export function declarations
  const exportFunctionRegex = /^export function (\w+)/gm;
  let match;
  const functionsToFix = [];
  
  while ((match = exportFunctionRegex.exec(content)) !== null) {
    functionsToFix.push(match[1]);
  }
  
  if (functionsToFix.length === 0) {
    return; // No inline exports to fix
  }
  
  let newContent = content;
  
  functionsToFix.forEach(funcName => {
    // Replace "export function FuncName" with "function FuncName"
    const regex = new RegExp(`^export function ${funcName}`, 'gm');
    newContent = newContent.replace(regex, `function ${funcName}`);
    
    // Check if export statement already exists at the end
    const exportStatement = `export { ${funcName} }`;
    if (!newContent.includes(exportStatement)) {
      // Add export statement at the end of the file
      newContent = newContent.trimEnd() + '\n\n' + exportStatement + '\n';
    }
  });
  
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Fixed: ${path.basename(filePath)}`);
  }
});

console.log('All governance exports fixed!');

