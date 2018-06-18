const _map = require('lodash/map');

module.exports = {
  encode: date => data,
  decode: data => {
    const isisAggreg = data['IsisAggregation'];
    const param = data['Parameter'];
    const report = data['ReportingParameter'];
    let obj = {};

    const keysAggreg = Object.keys(isisAggreg);
    const keysParam = Object.keys(param);
    const keysReport = Object.keys(report);
    keysAggreg.forEach((key) => {
      obj[key] = isisAggreg[key];
    });
    keysParam.forEach((key) => {
      obj[key] = param[key];
    });
    keysReport.forEach((key) => {
      obj[key] = report[key];
    });

    return obj;
  },
};