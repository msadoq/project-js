const debug = require('../io/debug')('controllers:onViewUpdate');

module.exports = (spark, payload) => {
  debug.debug('view update', spark.id, payload);
};
