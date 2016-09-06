const debug = require('../io/debug')('controllers:onViewOpen');
const viewsModel = require('../models/views');
const PlotView = require('../views/plot');
const TextView = require('../views/text');


module.exports = (spark, identity, type, conf) => {
  debug.debug('called');
  // TODO view type
  let instance;
  switch (type) {
    case 'plot':
      instance = new PlotView({
        spark,
        identity,
        conf,
      });
      break;
    case 'text':
      instance = new TextView({
        spark,
        identity,
        conf,
      });
      break;
    default:
      console.log('unknown view');
      return;
  }
  viewsModel.addRecord(spark.id, instance);
};
