import _each from 'lodash/each';
import { get } from 'common/parameters';
import getLogger from 'common/log';

const logger = getLogger('main:debug');

export default (callback) => {
  // not installable when bundled and doesn't needed when DEBUG is off
  if (get('IS_BUNDLED') === 'on' || get('DEBUG') !== 'on') {
    return callback(null);
  }

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

  return callback(null);
};
