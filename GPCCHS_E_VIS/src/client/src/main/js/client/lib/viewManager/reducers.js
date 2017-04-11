import _ from 'lodash/fp';

import composeReducers from '../store/composeReducers';
import createReducerByViews from '../store/createReducerByViews';
import commonConfigurationReducer from './commonConfiguration/reducer';

import textViewConfigurationReducer from './TextView/store/configurationReducer';
import plotViewConfigurationReducer from './PlotView/store/configurationReducer';
import dynamicViewConfigurationReducer from './DynamicView/store/configurationReducer';

import textViewDataReducer from './TextView/store/dataReducer';
import plotViewDataReducer from './PlotView/store/dataReducer';
import dynamicViewDataReducer from './DynamicView/store/dataReducer';

import * as constants from './constants';

/* --- Utils ---------------------------------------------------------------- */
const appendString = _.curry((x, str) => str.concat(x));

const createViewConfigurationReducer = ([type, reducer]) => ([
  type,
  createReducerByViews(
    composeReducers(reducer, commonConfigurationReducer),
    type
  ),
]);

const createConfigurationReducers = _.pipe(
  _.toPairs,
  _.map(createViewConfigurationReducer),
  _.fromPairs,
  _.mapKeys(appendString('Configuration'))
);

const createDataReducers = _.mapKeys(appendString('Data'));

/* --- Reducers ------------------------------------------------------------- */
export const configurationReducers = createConfigurationReducers({
  [constants.VM_VIEW_TEXT]: textViewConfigurationReducer,
  [constants.VM_VIEW_PLOT]: plotViewConfigurationReducer,
  [constants.VM_VIEW_DYNAMIC]: dynamicViewConfigurationReducer,
});

export const dataReducers = createDataReducers({
  [constants.VM_VIEW_TEXT]: textViewDataReducer,
  [constants.VM_VIEW_PLOT]: plotViewDataReducer,
  [constants.VM_VIEW_DYNAMIC]: dynamicViewDataReducer,
});
