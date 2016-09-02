const viewsModel = require('../models/views');
const PlotView = require('../views/plot');

module.exports = spark => {
  // TODO view type
  const instance = new PlotView({
    spark,
  });

  viewsModel.addRecord(spark.id, instance);
};
