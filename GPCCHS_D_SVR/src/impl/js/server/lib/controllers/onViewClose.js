const debug = require('../io/debug')('controllers:onViewClose');
const viewsModel = require('../models/views');

module.exports = spark => {
  debug.debug('called');
  viewsModel.delRecord(spark.id);
};
