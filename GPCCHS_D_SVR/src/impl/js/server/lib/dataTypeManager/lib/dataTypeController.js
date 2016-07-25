const debug = require('../../io/debug')('dataTypeManager:dataTypeApi');
const util = require('util');

const binToJson = (metadata, data) => new Promise((resolve) => {
  const dataType = metadata.type;
  debug.debug(`Type of bin data: ${dataType}`);
  let processedBin;
  if (dataType === 'Aggregation') {
    const isisAggregationController = require('../controller/aggregation.js');
    processedBin = isisAggregationController.binToJson(data);
  } else if (dataType === 'ReportingParameter') {
    const reportingParameterController = require('../controller/reportingParameter.js');
    processedBin = reportingParameterController.binToJson(data);
  } else if (dataType === 'FdsData') {
    processedBin = JSON.parse(data);
  } else {
    processedBin = { error: 'unknown COMObject' };
  }
  debug.verbose(`Decoded binary data: ${util.inspect(processedBin)}`);
  resolve(processedBin);
});

module.exports = { binToJson };
