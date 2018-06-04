// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Split viewManager/index.js in several files
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Implement automation for data reducers in
//  viewManager
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView using SkeletonView
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge
//  with dev
// VERSION : 2.0.0 : DM : #5806 : 29/09/2017 : Update viewManager with alarm parameters
// VERSION : 2.0.0 : DM : #5806 : 15/11/2017 : Add empty ui reducers (gma and oba)
// VERSION : 2.0.0 : DM : #5806 : 15/11/2017 : Implement uiReducer for GMA and OBA and compute
//  selected alarms in redux store
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-1937 : 30/01/2018 : Unit convertion, add python fork and
//  convertion call mechanism
// VERSION : 2.0.0 : FA : ISIS-FT-1937 : 31/01/2018 : Unit convertion, add python fork and
//  convertion call mechanism bis
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import * as constants from './constants';

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
import pus05ViewConfigurationReducer from './PUS05View/store/configurationReducer';
import pus11ViewConfigurationReducer from './PUS11View/store/configurationReducer';

import textViewDataReducer from './TextView/store/dataReducer';
import plotViewDataReducer from './PlotView/store/dataReducer';
import dynamicViewDataReducer from './DynamicView/store/dataReducer';
import mimicViewDataReducer from './MimicView/store/dataReducer';
import historyViewDataReducer from './HistoryView/store/dataReducer';
import groundAlarmViewDataReducer from './GroundAlarmView/store/dataReducer';
import onboardAlarmViewDataReducer from './OnboardAlarmView/store/dataReducer';
import packetViewDataReducer from './PacketView/store/dataReducer';
import pus05ViewDataReducer from './PUS05View/store/dataReducer';
import pus11ViewDataReducer from './PUS11View/store/dataReducer';

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

export const getConfigurationReducers = () => createConfigurationReducers({
  [constants.VM_VIEW_TEXT]: textViewConfigurationReducer,
  [constants.VM_VIEW_PLOT]: plotViewConfigurationReducer,
  [constants.VM_VIEW_DYNAMIC]: dynamicViewConfigurationReducer,
  [constants.VM_VIEW_MIMIC]: mimicViewConfigurationReducer,
  [constants.VM_VIEW_HISTORY]: historyViewConfigurationReducer,
  [constants.VM_VIEW_PACKET]: packetViewConfigurationReducer,
  [constants.VM_VIEW_GROUNDALARM]: groundAlarmViewConfigurationReducer,
  [constants.VM_VIEW_ONBOARDALARM]: onboardAlarmViewConfigurationReducer,
  [constants.VM_VIEW_PUS05]: pus05ViewConfigurationReducer,
  [constants.VM_VIEW_PUS11]: pus11ViewConfigurationReducer,
});

export const getDataReducers = () => createDataReducers({
  [constants.VM_VIEW_TEXT]: textViewDataReducer,
  [constants.VM_VIEW_PLOT]: plotViewDataReducer,
  [constants.VM_VIEW_DYNAMIC]: dynamicViewDataReducer,
  [constants.VM_VIEW_MIMIC]: mimicViewDataReducer,
  [constants.VM_VIEW_HISTORY]: historyViewDataReducer,
  [constants.VM_VIEW_PACKET]: packetViewDataReducer,
  [constants.VM_VIEW_GROUNDALARM]: groundAlarmViewDataReducer,
  [constants.VM_VIEW_ONBOARDALARM]: onboardAlarmViewDataReducer,
  [constants.VM_VIEW_PUS05]: pus05ViewDataReducer,
  [constants.VM_VIEW_PUS11]: pus11ViewDataReducer,
});

export const getUiReducers = () => ({
  AlarmViewUi: alarmViewUiReducer,
});
