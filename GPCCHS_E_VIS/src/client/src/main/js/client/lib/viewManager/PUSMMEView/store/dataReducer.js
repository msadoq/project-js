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

import { VM_VIEW_PUSMME } from '../../constants';
import createScopedDataReducer from '../../commonData/createScopedDataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';
import { injectTabularData } from '../../commonData/reducer';

// eslint-disable-next-line no-unused-vars
function pusMmeDataReducer(state = {}, action) {
  switch (action.type) {
    case INJECT_PUS_DATA: {
      /**
       * action.payload: {
       *  timestamp: number,
       *  data: {
       *    PUSMMEView: {
       *        pusMmePacket: [],
       *        ...rest
       *      },
       *    },
       *  },
       * },
       */
      const data = _.getOr(null, ['payload', 'data', VM_VIEW_PUSMME], action);
      if (!data) {
        return state;
      }
      let updatedState = state;

      const statuses = parameters.get('PUS_CONSTANTS').STATUS;
      const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

      // keep all except sub tabular data
      updatedState = {
        ...updatedState,
        ..._.omit(
          ['pusMmePacketStore', 'pusMmePacketParameter'],
          data
        ),
      };

      updatedState = injectTabularData(updatedState, 'packets',
        _.getOr([], ['pusMmePacket'], data)
          .filter(packet => packet.status !== 1) // filter disabled apids
          .map(pusMmePacket => ({
            ...pusMmePacket,
            status: statuses[_.getOr(200, 'status', pusMmePacket)], // map mme status constant
            lastUpdateModeApid: updateTypes[_.getOr(200, 'lastUpdateModeApid', pusMmePacket)], // map mme lastUpdateModeApid constant
          }))
      );

      return updatedState;
    }
    default:
      return state;
  }
}

export default createScopedDataReducer(pusMmeDataReducer, {}, VM_VIEW_PUSMME);

export const getData = (state, { viewId }) => state[`${VM_VIEW_PUSMME}Data`][viewId];
export const getConfiguration = (state, { viewId }) => state[`${VM_VIEW_PUSMME}Configuration`][viewId];
