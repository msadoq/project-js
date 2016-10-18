import schema from './PlotView.schema.json';
import getDataFromCache from './getDataFromCache';
import getConnectedDataFromState from './getConnectedDataFromState';
import getExpectedInterval from './getExpectedInterval';
import getDisplayedValues from './getDisplayedValues';

module.exports = {
  dataLayout: () => 'range',
  getSchemaJson: () => schema,
  getDataFromCache,
  getConnectedDataFromState,
  getExpectedInterval,
  getDisplayedValues,
};
