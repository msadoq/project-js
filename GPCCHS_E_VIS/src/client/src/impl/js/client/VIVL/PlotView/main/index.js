import schema from './PlotView.schema.json';
import extractRemoteIds from './extractRemoteIds';
import extractEntryPoints from './extractEntryPoints';
import getExpectedInterval from './getExpectedInterval';
import getDataFromCache from './getDataFromCache';
import getDisplayedValues from './getDisplayedValues';

module.exports = {
  dataLayout: () => 'range',
  getSchemaJson: () => schema,
  extractRemoteIds,
  extractEntryPoints,
  getExpectedInterval,
  getDataFromCache,
  getDisplayedValues,
};
