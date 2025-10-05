const fs = require('fs');
const path = require('path');

console.log('🚀 Building OSS Power Tools Extension...\n');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy manifest and static files
console.log('📋 Copying manifest and static files...');
const filesToCopy = [
  'public/manifest.json',
  'public/popup.html',
  'public/options.html',
  'public/content-styles.css'
];

filesToCopy.forEach(file => {
  const src = path.join(__dirname, '..', file);
  const dest = path.join(distDir, path.basename(file));
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`  ✓ ${path.basename(file)}`);
  }
});

// Create icons directory
const iconsDir = path.join(distDir, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Create simple placeholder icons (you can replace these with real icons later)
console.log('\n🎨 Creating placeholder icons...');
const iconSizes = [16, 48, 128];
iconSizes.forEach(size => {
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#238636" rx="4"/>
    <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="${size/2}" font-weight="bold" fill="white">O</text>
  </svg>`;
  
  fs.writeFileSync(path.join(iconsDir, `icon${size}.svg`), svg);
  console.log(`  ✓ icon${size}.svg`);
});

console.log('\n✨ Build preparation complete!');
console.log('\nNext steps:');
console.log('  1. Run: npm run build');
console.log('  2. Open Chrome and go to: chrome://extensions/');
console.log('  3. Enable "Developer mode"');
console.log('  4. Click "Load unpacked" and select the dist folder');
console.log('  5. Navigate to GitHub.com to see the extension!\n');
