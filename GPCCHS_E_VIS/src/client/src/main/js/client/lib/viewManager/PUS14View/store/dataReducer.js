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

import { VM_VIEW_PUS14 } from '../../constants';
import createScopedDataReducer from '../../commonData/createScopedDataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';
import { injectTabularData } from '../../commonData/reducer';

// eslint-disable-next-line no-unused-vars
function pus14DataReducer(state = {}, action) {
  switch (action.type) {
    case INJECT_PUS_DATA: {
      /**
       * action.payload: {
       *  timestamp: number,
       *  data: {
       *    PUS14View: {
       *      pus014Model: {
       *        ...attributes
       *        pus014TmPacket: [],
       *      },
       *    }
       *  },
       * },
       */
      const data = _.getOr(null, ['payload', 'data', VM_VIEW_PUS14], action);
      if (!data) {
        return state;
      }

      const statuses = parameters.get('PUS_CONSTANTS').STATUS;
      const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

      let updatedState = state;

      const ownModelData = _.omit(
        ['pus014TmPacket'],
        data
      );

      // strip tables from data dans add them to updatedState
      updatedState = {
        ...updatedState,
        ...ownModelData,
        status: statuses[_.getOr(200, 'status', ownModelData)], // map packet status constant
      };

      updatedState = injectTabularData(updatedState, 'pus014TmPacket',
        _.getOr([], ['pus014TmPacket'], data)
        .map(packet => ({
          ...packet,
          status: statuses[_.getOr(200, 'status', packet)], // map packet status constant
          forwardingStatus: statuses[_.getOr(200, 'forwardingStatus', packet)], // map packet forwardingStatus constant
          lastUpdateModeFwdStatus: updateTypes[_.getOr(200, 'lastUpdateModeFwdStatus', packet)], // map packet lastUpdateModeFwdStatus constant
          lastUpdateModeSid: updateTypes[_.getOr(200, 'lastUpdateModeSid', packet)], // map schedule lastUpdateModeSid constant
          lastUpdateModeSubSamplingRatio: updateTypes[_.getOr(200, 'lastUpdateModeSubSamplingRatio', packet)], // map schedule lastUpdateModeSubSamplingRatio constant
          lastUpdateModeTypeSubType: updateTypes[_.getOr(200, 'lastUpdateModeTypeSubType', packet)], // map schedule lastUpdateModeTypeSubType constant
        }))
      );

      return updatedState;
    }
    default:
      return state;
  }
}

export default createScopedDataReducer(pus14DataReducer, {}, VM_VIEW_PUS14);

export const getPUS14ViewData = state => state[`${VM_VIEW_PUS14}Data`];
export const getData = (state, { viewId }) => state[`${VM_VIEW_PUS14}Data`][viewId];
export const getConfiguration = (state, { viewId }) => state[`${VM_VIEW_PUS14}Configuration`][viewId];
