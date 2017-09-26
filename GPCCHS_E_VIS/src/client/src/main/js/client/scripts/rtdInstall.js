// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7355 : 27/07/2017 : RTD is now optional on VIMA installation
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

const { resolve } = require('path');
const { execSync } = require('child_process');

const RTD_PATH = './node_modules/rtd/';

try {
  execSync('npm i', { stdio: [0, 1, 2], cwd: resolve(RTD_PATH) });
} catch (e) {
  console.warn('WARNING: no node_modules/rtd found'); // eslint-disable-line
}
