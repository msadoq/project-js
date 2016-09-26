const debug = require('../io/debug')('controllers:onViewQuery');

/**
 * Triggered when a view query for data from HSC.
 *
 * - ???
 *
 * @param spark
 * @param payload
 */
module.exports = (spark, payload) => {
  debug.debug('view query', spark.id, payload);

  /**
   * payload {
   *   dataId
   *   interval
   * }
   */

  // check if query is valid
  // check missing data retrieveMissingIntervals
  // do query to dc
  // retrieve full interval from cache and flush to hsc (spark.id)
    // apply filter
    // send only wanted data (field)
};
