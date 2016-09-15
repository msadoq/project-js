const debug = require('../io/debug')('controllers:onWindowOpen');

module.exports = (spark, windowId) => {
  debug.debug('window websocket opened', windowId);
  return spark.write({
    event: 'authenticated',
  });
};
