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

console.log('*************payload', payload);
  // view could already exists when HSC and HSS states are not fully sync
  const alreadyExisting = viewsModel.findByViewId(payload.viewId);
  if (alreadyExisting) {
    debug.debug('view already exist', payload.viewId);
    // TODO : robustness code, avoid crash when view already exists in loki
    alreadyExisting.instance.setSpark(spark);
    alreadyExisting.instance.setConfiguration(payload.configuration);
    return;
  }

  const constructor = external[payload.type].adapter;
  const instance = new constructor({
    spark,
    viewId: payload.viewId,
    connectedData: payload.connectedData,
  });

  viewsModel.addRecord(payload.viewId, instance);
};
