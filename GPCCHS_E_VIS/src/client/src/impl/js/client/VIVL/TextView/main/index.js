import schema from './TextView.schema.json';
import extractRemoteIds from './extractRemoteIds';
import extractEntryPoints from './extractEntryPoints';
import getExpectedInterval from './getExpectedInterval';
import getDataFromCache from './getDataFromCache';
import getDisplayedValues from './getDisplayedValues';

module.exports = {
  dataLayout: () => 'one',
  getSchemaJson: () => schema,
  extractRemoteIds,
  extractEntryPoints,
  getExpectedInterval,
  getDataFromCache,
  getDisplayedValues,
};
