// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7299 : 19/07/2017 : Add script to install npm dependencies for the adapters
// VERSION : 1.1.2 : FA : #7299 : 20/07/2017 : Fix postinstall script adapters : hardcoded paths (relatives)
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Refacto adaptersInstall script . .
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Packaging : copy adapters in dist
// END-HISTORY
// ====================================================================

const { join } = require('path');
const { execSync } = require('child_process');

const ADAPTERS_PATH = './adapters/';

const adapters = ['isis', 'dc'];

adapters.forEach(adapter => (
  execSync('npm i', { stdio: [0, 1, 2], cwd: join(ADAPTERS_PATH, adapter) })
));
