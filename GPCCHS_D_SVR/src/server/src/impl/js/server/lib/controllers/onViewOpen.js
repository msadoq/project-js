const debug = require('../io/debug')('controllers:onViewOpen');
const _ = require('lodash');
const viewsModel = require('../models/views');
const external = require('../../external.modules');

module.exports = (spark, identity, type, conf) => {
  debug.debug('called');

  if (!_.has(external, type)) {
    throw new Error(`Unknown view type requested '${type}'`);
  }

  const constructor = external[type];
  const instance = new constructor({
    spark,
    identity,
    conf,
  });

  viewsModel.addRecord(spark.id, instance);
};
