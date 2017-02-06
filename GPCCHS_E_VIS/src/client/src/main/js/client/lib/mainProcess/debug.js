/* eslint global-require:0 */
import _each from 'lodash/each';
import { get } from 'common/parameters';


export default (callback) => {
  // not installable when bundled and doesn't needed when DEBUG is off
  if (get('IS_BUNDLED') === 'on' || get('DEBUG') !== 'on') {
    return callback(null);
  }

  // electron-debug
  const enableDebug = require('electron-debug');
  enableDebug();

  // devtools
  const installer = require('electron-devtools-installer');

  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS',
  ];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  _each(extensions, (name) => {
    try {
      installer.default(installer[name], forceDownload);
    } catch (e) {} // eslint-disable-line
  });

  return callback(null);
};
