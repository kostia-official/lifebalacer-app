const fs = require('fs');
const iconsConfig = require('./iconsConfig.json');

const manifestBuffer = fs.readFileSync('./public/site.webmanifest');
const manifest = JSON.parse(manifestBuffer);

const icons = manifest.icons.map((icon) => {
  if (icon.purpose === 'maskable any') {
    return { ...icon, purpose: 'maskable' };
  }

  return icon;
});

const pwaManifest = { ...manifest, ...iconsConfig.pwaManifest, icons };

fs.writeFileSync('./public/site.webmanifest', JSON.stringify(pwaManifest, null, 2));
