const { join } = require('path');
const { execSync } = require('child_process');

const ADAPTERS_PATH = '../../../../../adapters/';
const ISIS_NS = 'isis';
const DC_NS = 'dc';

execSync('npm i', { stdio: [0, 1, 2], cwd: join(ADAPTERS_PATH, ISIS_NS) });
execSync('npm i', { stdio: [0, 1, 2], cwd: join(ADAPTERS_PATH, DC_NS) });
