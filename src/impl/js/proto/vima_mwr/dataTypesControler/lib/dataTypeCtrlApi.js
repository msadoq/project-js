const isisAggregationCtrl = require('../ctrls/isisAggregationCtrl');
const request = require('request');

/*exports.binToJson = function(payload) {
    return isisAggregationCtrl.binToJson(payload);
}*/

exports.binToJson = function(payload) {
    return new Promise(function(resolve, reject) {
        resolve(isisAggregationCtrl.binToJson(payload))
    });
}




