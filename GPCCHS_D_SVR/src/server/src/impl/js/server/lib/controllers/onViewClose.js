const debug = require('../io/debug')('controllers:onViewClose');
const viewsModel = require('../models/views');

/**
 * Triggered when a new view is unmounted from HSC.
 *
 * - retrieve instance (loki)
 * - unregister instance (loki)
 * - destroy view
 *
 * @param spark
 * @param payload
 */
module.exports = (spark, payload) => {
  debug.debug('view close', spark.id, payload);

  // TODO retrieve instance

  viewsModel.delRecord(payload.viewId);

  // TODO call .onDestroy
  // TODO trigger GC (freeup pointer)
};
