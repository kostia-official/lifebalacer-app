#!/bin/bash

npx real-favicon generate ./scripts/generateIcons/iconsConfig.json ./scripts/generateIcons/iconsData.json ./public
npx real-favicon inject ./scripts/generateIcons/iconsData.json public public/index.html
node ./scripts/generateIcons/pwaAssetGenerator.js
node ./scripts/generateIcons/fixPwaManifest.js
