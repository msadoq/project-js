const debug = require('../../io/debug')('controllers:onWindowClose');

/**
 * Triggered when HSC close a window
 *
 *
 * @param spark
 * @param windowId
 */

const windowClose = (windowId) => {
  debug.debug('window close', windowId);
};

module.exports = {
  windowClose,
  onWindowClose: (spark, windowId) => {
    debug.info(`called (${windowId})`);
    windowClose(windowId);
  },
};
