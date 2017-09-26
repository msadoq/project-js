// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 10/03/2017 : Add Garbage Collector monitoring tool
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Add timeout on DC data fetching on application startup to help diagnosis of DC communication problem
// VERSION : 1.1.2 : DM : #3622 : 15/03/2017 : Fix production webpack build errors
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Update project dependencies and remove broken code (gcMonitoring)
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Test perf protobuff inside a electron app
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Add comment on proxy deactivation in electron
// VERSION : 1.1.2 : FA : #6671 : 17/05/2017 : Merge branch 'dev' into pgaucher-upgrade-protobuff-6
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Comment test module require .
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #7185 : 05/07/2017 : Fix lint errors and warnings
// END-HISTORY
// ====================================================================

import { app } from 'electron';
import { onStart, onStop, onWindowsClose, onError } from './lib/mainProcess';
import { init } from './lib/common/configurationManager';

init(__dirname, true);

// avoid using host proxy configuration and perturbing local HTTP access (e.g.: index.html)
// but block chromium DevTools downloads (comment and start to re-install DevTools)
app.commandLine.appendSwitch('no-proxy-server');

// const { start } = require('./lib/common/utils/gcMonitoring');
// start();

app.on('ready', () => {
  // https://github.com/electron/electron/issues/1412
  process.title = 'gpcchs_main';

  try {
    onStart();
  } catch (e) {
    onError(e);
  }
});

app.on('window-all-closed', onWindowsClose);

app.on('quit', onStop);

process.on('uncaughtException', onError);
