// Process the out directory for Chrome Extension compatibility

const fs = require('fs');
const { glob } = require('glob');
const path = require('path');

async function main() {
  try {
    // Process HTML files to fix paths
    const files = await glob('out/**/*.html');
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      const modifiedContent = content.replace(/\/_next\//g, './next/')
                                     .replace(/\.\/_next\//g, './next/');
      fs.writeFileSync(file, modifiedContent, 'utf-8');
    }

    // Move _next directory to next if it exists
    const sourcePath = path.join('out', '_next');
    const destinationPath = path.join('out', 'next');

    if (fs.existsSync(sourcePath)) {
      fs.renameSync(sourcePath, destinationPath);
      console.log('Renamed "_next" directory to "next" successfully.');
    } else {
      console.log('_next directory not found, skipping rename operation.');
    }

    console.log('Chrome extension output prepared successfully!');
  } catch (error) {
    console.error('Error processing output directory:', error);
    process.exit(1);
  }
}

main();
