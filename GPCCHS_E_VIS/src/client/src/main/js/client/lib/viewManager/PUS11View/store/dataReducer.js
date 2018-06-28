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
import { viewRangeAdd } from '../../HistoryView/store/viewDataUpdate';

// eslint-disable-next-line no-unused-vars
function pus11DataReducer(state = {}, action, viewId) {
  switch (action.type) {
    case INJECT_PUS_RANGE_DATA: {
      // const { viewId } = action.payload;
      console.log('INJECT_PUS_RANGE_DATA');
      /**
       * action.payload: {
       *  data: {
       *    dataToInject: {
       *      <timestamp>: {
       *        PUS011PModel: {...},
       *        Pus011SubSchedule: {},
       *        Pus011Apid: {},
       *        Pus011Command: {},
       *      },
       *    },
       *  },
       * },
       */
      const dataToInject = _.getOr([], ['payload', 'data', 'dataToInject'], action);
      const pus11Configuration = {
        entryPoints: [
          {
            connectedData: {},
            id: [viewId],
            name: 'PUS11EP',
          },
        ],
        tables: [

        ],
      }; // @todo fetch that configuration ??

      const dataKeys = Object.keys(dataToInject);
      if (!dataKeys.length) {
        console.log('!dataKeys.length');
        return state;
      }

      console.log('state', state);
      const updatedState = viewRangeAdd(state, viewId, dataToInject, pus11Configuration);
      console.log('updatedState', updatedState);

      // const updatedState = viewRangeAdd(state, viewId, dataToInject, {});

      // console.log('updatedState', updatedState);

      return state;
    }
    default:
      return state;
  }
}

export default createScopedDataReducer(pus11DataReducer, {}, VM_VIEW_PUS11);

export const getPUS11ViewData = state => state[`${VM_VIEW_PUS11}Data`];
export const getData = (state, { viewId }) => state[`${VM_VIEW_PUS11}Data`][viewId];
export const getConfiguration = (state, { viewId }) => state[`${VM_VIEW_PUS11}Configuration`][viewId];
