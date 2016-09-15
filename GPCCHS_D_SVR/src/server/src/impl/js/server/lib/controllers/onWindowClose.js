const debug = require('../io/debug')('controllers:onWindowClose');

module.exports = (spark, windowId) => {
  debug.debug('window websocket closed', windowId);
};
