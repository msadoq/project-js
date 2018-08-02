// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Update of history view data store
// END-HISTORY
// ====================================================================

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
import _ from 'lodash/fp';
import parameters from 'common/configurationManager';

import { VM_VIEW_PUS140 } from '../../constants';
import createScopedDataReducer from '../../commonData/createScopedDataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';
import { injectTabularData } from '../../commonData/reducer';

// eslint-disable-next-line no-unused-vars
function pus140DataReducer(state = {}, action) {
  switch (action.type) {
    case INJECT_PUS_DATA: {
      /**
       * action.payload: {
       *  timestamp: number,
       *  data: {
       *    PUS140View: {
       *        pus140Parameter: [{},{}]
       *      },
       *    },
       *  },
       * },
       */

      const data = _.getOr(null, ['payload', 'data', VM_VIEW_PUS140], action);

      if (!data) {
        return state;
      }
      let updatedState = state;

      const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

      // keep all except tabular data
      updatedState = {
        ..._.omit(
          ['pus140Parameter'],
          data
        ),
      };

      // injectTabularData: add data tables to dedicated injectTabularData (VirtualizedTableView)
      updatedState = injectTabularData(updatedState, 'parameters',
        _.getOr(null, ['pus140Parameter'], data)
        .map(store => ({
          ...store,
          lastUpdateModeCurrentValue: updateTypes[_.getOr('200', 'lastUpdateModeCurrentValue', store)],
          lastUpdateModeParamId: updateTypes[_.getOr('200', 'lastUpdateModeParamId', store)],
        }))
      );

      return updatedState;
    }
    default:
      return state;
  }
}

export default createScopedDataReducer(pus140DataReducer, {}, VM_VIEW_PUS140);

export const getPUS140ViewData = state => state[`${VM_VIEW_PUS140}Data`];
export const getData = (state, { viewId }) => state[`${VM_VIEW_PUS140}Data`][viewId];
export const getConfiguration = (state, { viewId }) => state[`${VM_VIEW_PUS140}Configuration`][viewId];
