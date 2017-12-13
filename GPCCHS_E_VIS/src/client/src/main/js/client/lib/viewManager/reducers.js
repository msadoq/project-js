// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Split viewManager/index.js in several files
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Implement automation for data reducers in viewManager
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView using SkeletonView
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';

import packetViewConfigurationReducer from './PacketView/store/configurationReducer';
import createReducerByViews from '../store/helpers/createReducerByViews';
import commonConfigurationReducer from './commonConfiguration/reducer';

import textViewConfigurationReducer from './TextView/store/configurationReducer';
import plotViewConfigurationReducer from './PlotView/store/configurationReducer';
import dynamicViewConfigurationReducer from './DynamicView/store/configurationReducer';
import mimicViewConfigurationReducer from './MimicView/store/configurationReducer';
import historyViewConfigurationReducer from './HistoryView/store/configurationReducer';
import groundAlarmViewConfigurationReducer from './GroundAlarmView/store/configurationReducer';
import onboardAlarmViewConfigurationReducer from './OnboardAlarmView/store/configurationReducer';
import * as constants from './constants';

import textViewDataReducer from './TextView/store/dataReducer';
import plotViewDataReducer from './PlotView/store/dataReducer';
import dynamicViewDataReducer from './DynamicView/store/dataReducer';
import mimicViewDataReducer from './MimicView/store/dataReducer';
import historyViewDataReducer from './HistoryView/store/dataReducer';
import groundAlarmViewDataReducer from './GroundAlarmView/store/dataReducer';
import onboardAlarmViewDataReducer from './OnboardAlarmView/store/dataReducer';
import packetViewDataReducer from './PacketView/store/dataReducer';

import alarmViewUiReducer from './GroundAlarmView/store/uiReducer';

import composeReducers from '../store/helpers/composeReducers';

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

export const uiReducers = {
  AlarmViewUi: alarmViewUiReducer,
};
