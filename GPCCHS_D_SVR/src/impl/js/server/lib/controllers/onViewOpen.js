const debug = require('../io/debug')('controllers:onViewOpen');
const viewsModel = require('../models/views');
const PlotView = require('../views/plot');

module.exports = (spark, identity) => {
  debug.debug('called');
  // TODO view type
  const instance = new PlotView({
    spark,
    identity,
  });

  viewsModel.addRecord(spark.id, instance);
};
