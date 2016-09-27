const _ = require('lodash');

module.exports = (spark, payload) => {
  // TODO package data
  // TODO bufferize data
  const dataToSend = (_.isArray(payload)) ? payload : [payload];
  spark.write({
    event: 'newData',
    payload: dataToSend,
  });
};
