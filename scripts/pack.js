const crx3 = require('crx3');

crx3(['./src/manifest.json'], {
  crxPath: `./build/gge-adblocker.crx`,
  zipPath: `./build/gge-adblocker.zip`,
}).then(() => console.log('Extension packed successfully')).catch((err) => console.log(`Error packing extension: ${err}`))
