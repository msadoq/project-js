const debug = require('../io/debug')('controllers:onClientOpen');

/**
 * Triggered when client main process websocket is open
 * @param spark
 */
module.exports = spark => {
  debug.info(spark.id, 'main process websocket opened');
};
