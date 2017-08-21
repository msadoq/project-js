const { join } = require('path');
const { execSync } = require('child_process');

const ADAPTERS_PATH = './adapters/';

const adapters = ['isis', 'dc'];

adapters.forEach(adapter => (
  execSync('npm i', { stdio: [0, 1, 2], cwd: join(ADAPTERS_PATH, adapter) })
));
