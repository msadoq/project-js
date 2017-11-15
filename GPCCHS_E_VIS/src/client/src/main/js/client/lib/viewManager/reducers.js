import _ from 'lodash/fp';

import composeReducers from '../store/helpers/composeReducers';
import createReducerByViews from '../store/helpers/createReducerByViews';
import commonConfigurationReducer from './commonConfiguration/reducer';

import textViewConfigurationReducer from './TextView/store/configurationReducer';
import plotViewConfigurationReducer from './PlotView/store/configurationReducer';
import dynamicViewConfigurationReducer from './DynamicView/store/configurationReducer';
import mimicViewConfigurationReducer from './MimicView/store/configurationReducer';
import historyViewConfigurationReducer from './HistoryView/store/configurationReducer';
import groundAlarmViewConfigurationReducer from './GroundAlarmView/store/configurationReducer';
import onboardAlarmViewConfigurationReducer from './OnboardAlarmView/store/configurationReducer';
import packetViewConfigurationReducer from './PacketView/store/configurationReducer';

import textViewDataReducer from './TextView/store/dataReducer';
import plotViewDataReducer from './PlotView/store/dataReducer';
import dynamicViewDataReducer from './DynamicView/store/dataReducer';
import mimicViewDataReducer from './MimicView/store/dataReducer';
import historyViewDataReducer from './HistoryView/store/dataReducer';
import groundAlarmViewDataReducer from './GroundAlarmView/store/dataReducer';
import onboardAlarmViewDataReducer from './OnboardAlarmView/store/dataReducer';
import packetViewDataReducer from './PacketView/store/dataReducer';

import groundAlarmViewUiReducer from './GroundAlarmView/store/uiReducer';
import onboardAlarmViewUiReducer from './OnboardAlarmView/store/uiReducer';

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

const createUiReducers = _.mapKeys(appendString('Ui'));

/* --- Reducers ------------------------------------------------------------- */
export const configurationReducers = createConfigurationReducers({
  [constants.VM_VIEW_TEXT]: textViewConfigurationReducer,
  [constants.VM_VIEW_PLOT]: plotViewConfigurationReducer,
  [constants.VM_VIEW_DYNAMIC]: dynamicViewConfigurationReducer,
  [constants.VM_VIEW_MIMIC]: mimicViewConfigurationReducer,
  [constants.VM_VIEW_HISTORY]: historyViewConfigurationReducer,
  [constants.VM_VIEW_PACKET]: packetViewConfigurationReducer,
  [constants.VM_VIEW_GROUNDALARM]: groundAlarmViewConfigurationReducer,
  [constants.VM_VIEW_ONBOARDALARM]: onboardAlarmViewConfigurationReducer,
});

export const dataReducers = createDataReducers({
  [constants.VM_VIEW_TEXT]: textViewDataReducer,
  [constants.VM_VIEW_PLOT]: plotViewDataReducer,
  [constants.VM_VIEW_DYNAMIC]: dynamicViewDataReducer,
  [constants.VM_VIEW_MIMIC]: mimicViewDataReducer,
  [constants.VM_VIEW_HISTORY]: historyViewDataReducer,
  [constants.VM_VIEW_PACKET]: packetViewDataReducer,
  [constants.VM_VIEW_GROUNDALARM]: groundAlarmViewDataReducer,
  [constants.VM_VIEW_ONBOARDALARM]: onboardAlarmViewDataReducer,
});

export const uiReducers = createUiReducers({
  [constants.VM_VIEW_GROUNDALARM]: groundAlarmViewUiReducer,
  [constants.VM_VIEW_ONBOARDALARM]: onboardAlarmViewUiReducer,
});
