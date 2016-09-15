const debug = require('../io/debug')('controllers:onViewOpen');
const _ = require('lodash');
const viewsModel = require('../models/views');
const external = require('../../external.modules');

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
