import schema from './TextView.schema.json';
import getDataFromCache from './getDataFromCache';
import getConnectedDataFromState from './getConnectedDataFromState';
import getExpectedInterval from './getExpectedInterval';
import getDisplayedValues from './getDisplayedValues';

module.exports = {
  dataLayout: () => 'one',
  getSchemaJson: () => schema,
  getDataFromCache,
  getConnectedDataFromState,
  getExpectedInterval,
  getDisplayedValues,
};
