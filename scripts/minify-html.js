#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');

const inputFile = path.resolve(__dirname, '..', 'html-template.html');
const outputFile = path.resolve(__dirname, '..', 'index.html');

(async () => {
  try {
    const input = await fs.promises.readFile(inputFile, 'utf8');

    const minified = await minify(input, {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      collapseBooleanAttributes: true,
      minifyCSS: true,
      minifyJS: true,
      keepClosingSlash: false,
      removeAttributeQuotes: false,
      conservativeCollapse: true,
    });

    await fs.promises.writeFile(outputFile, minified, 'utf8');

    console.log(`Wrote optimized file to ${outputFile}`);
  } catch (error) {
    console.error('Error minifying HTML:', error);
    process.exit(1);
  }
})();
