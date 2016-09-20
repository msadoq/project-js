const debug = require('../io/debug')('controllers:onViewOpen');
const _ = require('lodash');
const viewsModel = require('../models/views');
const external = require('../../external.modules');

/**
 * Triggered when a new view is mounted on HSC.
 *
 * - create a new view type instance
 * - register instance (loki)
 *
 * @param spark
 * @param payload
 */
module.exports = (spark, payload) => {
  debug.debug('view open', spark.id, payload);

  if (!_.has(external, payload.type)) {
    throw new Error(`Unknown view type requested '${payload.type}'`);
  }

  const constructor = external[payload.type].adapter;
  const instance = new constructor({
    spark,
    viewId: payload.viewId,
    configuration: payload.configuration,
  });

  viewsModel.addRecord(spark.id, instance);
};
