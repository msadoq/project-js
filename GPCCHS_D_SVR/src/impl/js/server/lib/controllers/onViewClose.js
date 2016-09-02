const viewsModel = require('../models/views');

module.exports = spark => {
  viewsModel.delRecord(spark.id);
};
