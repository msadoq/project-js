const ctrls = require('./lib/dataTypeCtrls.js');

const binToJson = (header, payload) => {
  const dataFullName = header.dataId;
  let processedBin;
  if (dataFullName.includes('<aggregation>')) {
    const { isisAggregationCtrl } = ctrls;
    processedBin = isisAggregationCtrl.binToJson(payload);
  } else if (dataFullName.includes('<reportingParameter>')) {
    const { reportingParameterCtrl } = ctrls;
    processedBin = reportingParameterCtrl.binToJson(payload);
  } else {
    processedBin = { error: 'unknown COMObject' };
  }
  return processedBin;
};

module.exports = { binToJson };
