// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and un-needed relaxations
// VERSION : 1.1.2 : FA : #6762 : 02/06/2017 : Fix process.env definePlugin in webpack
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #6700 : 19/06/2017 : Cleanup main and server startup process
// END-HISTORY
// ====================================================================

import _each from 'lodash/each';
import getLogger from '../common/logManager';

const logger = getLogger('main:debug');

export default () => {
  // electron-debug
  // eslint-disable-next-line global-require, "DV6 TBC_CNES Load extensions only in debug mode"
  const enableDebug = require('electron-debug');
  enableDebug();

  // devtools
  // eslint-disable-next-line global-require, "DV6 TBC_CNES Load extensions only in debug mode"
  const installer = require('electron-devtools-installer');

  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS',
  ];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  _each(extensions, (name) => {
    try {
      installer.default(installer[name], forceDownload);
    } catch (e) {
      logger.error(e);
    }
  });
};
