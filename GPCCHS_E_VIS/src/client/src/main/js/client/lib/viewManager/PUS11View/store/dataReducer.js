// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Update of history view data store
// END-HISTORY
// ====================================================================

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
import _ from 'lodash/fp';

import { VM_VIEW_PUS11 } from '../../constants';
import createScopedDataReducer from '../../commonData/createScopedDataReducer';
import { INJECT_PUS_RANGE_DATA } from '../../../store/types';
import { injectTabularData } from '../../commonData/reducer';

// eslint-disable-next-line no-unused-vars
function pus11DataReducer(state = {}, action, viewId) {
  switch (action.type) {
    case INJECT_PUS_RANGE_DATA: {
      console.log('INJECT_PUS_RANGE_DATA');

      // const { configurations } = action.payload;
      /**
       * TODO: update injected data format in stubs
       *
       * action.payload: {
       *  timestamp: number,
       *  data: {
       *        PUS011PModel: {...},
       *        Pus011SubSchedule: [],
       *        Pus011Apid: [],
       *        Pus011Command: [],
       *  },
       * },
       */
      const data = _.getOr([], ['payload', 'data'], action);
      // const pus11Configuration = configurations.PUS11ViewConfiguration[viewId];

      let updatedState = state;

      updatedState =
        injectTabularData(updatedState, 'subSchedules', data.Pus011SubSchedule);
      updatedState =
        injectTabularData(updatedState, 'enablesApids', data.Pus011Apid);
      updatedState =
        injectTabularData(updatedState, 'commands', data.Pus011Command);

      return updatedState;
    }
    default:
      return state;
  }
}

export default createScopedDataReducer(pus11DataReducer, {}, VM_VIEW_PUS11);

export const getPUS11ViewData = state => state[`${VM_VIEW_PUS11}Data`];
export const getData = (state, { viewId }) => state[`${VM_VIEW_PUS11}Data`][viewId];
export const getConfiguration = (state, { viewId }) => state[`${VM_VIEW_PUS11}Configuration`][viewId];
