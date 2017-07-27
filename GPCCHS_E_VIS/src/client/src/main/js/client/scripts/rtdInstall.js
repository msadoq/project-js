const { resolve } = require('path');
const { execSync } = require('child_process');

const RTD_PATH = './node_modules/rtd/';

try {
  execSync('npm i', { stdio: [0, 1, 2], cwd: resolve(RTD_PATH) });
} catch (e) {
  console.warn('WARNING: no node_modules/rtd found'); // eslint-disable-line
}
