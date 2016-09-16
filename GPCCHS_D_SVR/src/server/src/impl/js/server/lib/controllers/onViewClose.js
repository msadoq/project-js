const debug = require('../io/debug')('controllers:onViewClose');
const viewsModel = require('../models/views');

module.exports = (spark, payload) => {
  debug.debug('view close', spark.id, payload);
  viewsModel.delRecord(spark.id);
};
