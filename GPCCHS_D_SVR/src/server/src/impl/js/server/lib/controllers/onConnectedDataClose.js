const debug = require('../io/debug')('controllers:onConnectedDataClose');

/**
 * Triggered when a new connected data is unmounted on HSC
 * @param spark
 */
module.exports = (spark, payload) => {
  debug.info(spark.id, 'connectedData closed', payload);
};
