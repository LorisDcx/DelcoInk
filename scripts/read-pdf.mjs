import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const path = require('path');

// Use pdfjs-dist to extract text
const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');

const pdfPath = path.resolve('C:/Users/Loris/Desktop/CODE/SITES/DelcoInk/CGP - TATOUAGE DelcoInk.pdf');
const data = new Uint8Array(fs.readFileSync(pdfPath));

const doc = await pdfjsLib.getDocument({ data }).promise;
let fullText = '';

for (let i = 1; i <= doc.numPages; i++) {
  const page = await doc.getPage(i);
  const content = await page.getTextContent();
  const text = content.items.map(item => item.str).join(' ');
  fullText += `\n--- Page ${i} ---\n${text}`;
}

console.log(fullText);
