import schema from './PlotView.schema.json';
import extractConnectedData from './extractConnectedData';
import extractEntryPoints from './extractEntryPoints';
import getExpectedInterval from './getExpectedInterval';
import getDataFromCache from './getDataFromCache';
import getDisplayedValues from './getDisplayedValues';

module.exports = {
  dataLayout: () => 'range',
  getSchemaJson: () => schema,
  extractConnectedData,
  extractEntryPoints,
  getExpectedInterval,
  getDataFromCache,
  getDisplayedValues,
};
