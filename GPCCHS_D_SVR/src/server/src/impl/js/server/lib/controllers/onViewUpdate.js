const debug = require('../io/debug')('controllers:onViewUpdate');

module.exports = (spark, message) => {
  debug.debug('called', spark.id, message);
};
