import schema from './PlotView.schema.json';
import getDataFromCache from './getDataFromCache';
import getConnectedDataFromState from './getConnectedDataFromState';
import getExpectedInterval from './getExpectedInterval';
import getDisplayedValues from './getDisplayedValues';

module.exports = {
  isMultiDomainAndSessionSupported: () => true,
  getSchemaJson: () => schema,
  getDataFromCache,
  getConnectedDataFromState,
  getExpectedInterval,
  getDisplayedValues,
};
