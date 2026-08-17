// Genererer komprimerte WebP-versjoner av alle foto i assets/photos.
// Kjør: npm run optimize:images  (krever: npm i -D sharp)
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const MAPPE = path.join(__dirname, '..', 'assets', 'photos');
(async () => {
  const filer = fs.readdirSync(MAPPE).filter(f => /\.(jpe?g|png)$/i.test(f));
  for (const f of filer) {
    const ut = path.join(MAPPE, f.replace(/\.(jpe?g|png)$/i, '.webp'));
    if (fs.existsSync(ut)) continue;
    await sharp(path.join(MAPPE, f)).resize({ width: 2400, withoutEnlargement: true }).webp({ quality: 78 }).toFile(ut);
    console.log('webp:', f, '→', path.basename(ut), Math.round(fs.statSync(ut).size / 1024) + ' kB');
  }
  console.log('Ferdig. Serveren foretrekker .webp automatisk når filen finnes.');
})();
