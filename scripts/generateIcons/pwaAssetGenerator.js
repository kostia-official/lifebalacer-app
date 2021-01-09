const pwaAssetGenerator = require('pwa-asset-generator');

// Generate images over a module function call, instead of using CLI commands
(async () => {
  await pwaAssetGenerator.generateImages('./public/seed.svg', './public', {
    background: '#303030',
    padding: '16%',
    favicon: false,
    mstile: false,
    iconOnly: true,
    maskable: true,
    darkMode: true,
    portraitOnly: true,
    manifest: './public/site.webmanifest'
  });
})();
