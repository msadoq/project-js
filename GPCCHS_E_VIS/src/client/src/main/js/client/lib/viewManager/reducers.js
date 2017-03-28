import _ from 'lodash/fp';

import composeReducers from '../store/composeReducers';
import createReducerByViews from '../store/createReducerByViews';
import commonConfigurationReducer from './commonConfiguration/reducer';

import textViewConfigurationReducer from './TextView/store/configurationReducer';
import plotViewConfigurationReducer from './PlotView/store/configurationReducer';
import dynamicViewConfigurationReducer from './DynamicView/store/configurationReducer';

import * as constants from './constants';

/* --- Utils ---------------------------------------------------------------- */
const appendString = _.curry((x, str) => str.concat(x));

const createViewReducer = ({ type, reducer }) => ({
  reducer: createReducerByViews(
    composeReducers(reducer, commonConfigurationReducer),
    type
  ),
  type,
});

/* --- Reducers ------------------------------------------------------------- */
const listConfigurationReducers = [
  {
    type: constants.VM_VIEW_TEXT,
    reducer: textViewConfigurationReducer,
  },
  {
    type: constants.VM_VIEW_PLOT,
    reducer: plotViewConfigurationReducer,
  },
  {
    type: constants.VM_VIEW_DYNAMIC,
    reducer: dynamicViewConfigurationReducer,
  },
];

export default _.compose(
  _.omitBy(_.isUndefined),
  _.mapKeys(appendString('Configuration')),
  _.mapValues('reducer'),
  _.indexBy('type'),
  _.map(createViewReducer)
)(listConfigurationReducers);
