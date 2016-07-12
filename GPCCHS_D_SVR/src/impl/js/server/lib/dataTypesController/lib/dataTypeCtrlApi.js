const isisAggregationCtrl = require('../ctrls/isisAggregationCtrl');

// exports.binToJson = (payload) => isisAggregationCtrl.binToJson(payload);

exports.binToJson = (payload) => new Promise(
  (resolve, reject) => {
    resolve(isisAggregationCtrl.binToJson(payload));
  }
);
