import schema from './TextView.schema.json';
import getDataFromCache from './getDataFromCache';
import extractConnectedData from './extractConnectedData';
import extractEntryPoints from './extractEntryPoints';
import getExpectedInterval from './getExpectedInterval';
import getDisplayedValues from './getDisplayedValues';

module.exports = {
  dataLayout: () => 'one',
  getSchemaJson: () => schema,
  getDataFromCache,
  extractConnectedData,
  extractEntryPoints,
  getExpectedInterval,
  getDisplayedValues,
};
