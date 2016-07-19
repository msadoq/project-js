const ctrls = require('./lib/dataTypeCtrls.js');

const binToJson = (metadata, data) => new Promise((resolve) => {
  const dataType = metadata.type;
  console.log(dataType);
  let processedBin;
  if (dataType === 'Aggregation') {
    const { isisAggregationCtrl } = ctrls;
    processedBin = isisAggregationCtrl.binToJson(data);
  } else if (dataType === 'ReportingParameter') {
    const { reportingParameterCtrl } = ctrls;
    processedBin = reportingParameterCtrl.binToJson(data);
  } else {
    processedBin = { error: 'unknown COMObject' };
  }
  resolve(processedBin);
});

module.exports = { binToJson };
