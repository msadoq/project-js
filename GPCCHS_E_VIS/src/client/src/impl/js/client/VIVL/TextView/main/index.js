import schema from './TextView.schema.json';
import getDataFromCache from './getDataFromCache';
import getConnectedDataFromState from './getConnectedDataFromState';
import getExpectedInterval from './getExpectedInterval';
import getDisplayedValues from './getDisplayedValues';

module.exports = {
  isMultiDomainAndSessionSupported: () => false,
  getSchemaJson: () => schema,
  getDataFromCache,
  getConnectedDataFromState,
  getExpectedInterval,
  getDisplayedValues,
};
