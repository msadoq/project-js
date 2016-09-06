const debug = require('../io/debug')('controllers:onClientClose');

/**
 * Triggered when client main process websocket is closed
 * @param spark
 */
module.exports = spark => {
  debug.info(spark.id, 'closed');
};
