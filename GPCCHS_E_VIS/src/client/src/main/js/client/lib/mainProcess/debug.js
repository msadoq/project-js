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
