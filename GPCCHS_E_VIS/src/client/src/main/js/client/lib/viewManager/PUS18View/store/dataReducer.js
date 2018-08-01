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

import { VM_VIEW_PUS18 } from '../../constants';
import createScopedDataReducer from '../../commonData/createScopedDataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';
import { injectTabularData } from '../../commonData/reducer';

// eslint-disable-next-line no-unused-vars
function pus18DataReducer(state = {}, action) {
  switch (action.type) {
    case INJECT_PUS_DATA: {
      /**
       * action.payload: {
       *  timestamp: number,
       *  data: {
       *    PUS18View: {
       *      pus018Model: {
       *        pus018PacketStore: [
       *          ...
       *          pus018Packet: []
       *        ],
       *        ...rest
       *      },
       *    },
       *  },
       * },
       */

      const data = _.getOr(null, ['payload', 'data', VM_VIEW_PUS18], action);

      if (!data) {
        return state;
      }
      let updatedState = state;

      const statuses = parameters.get('PUS_CONSTANTS').STATUS;
      const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

      // keep all except tabular data
      updatedState = {
        ..._.omit(
          ['pus018PacketStore'],
          data
        ),
      };

      // injectTabularData: add data tables to dedicated injectTabularData (VirtualizedTableView)
      updatedState = injectTabularData(updatedState, 'onBoardStorages',
        _.getOr(null, ['pus018PacketStore'], data)
        .map(store => ({
          ..._.omit(['pus018Packet'], store),
          dumpEnabled: String(_.getOr(200, 'dumpEnabled', store)),
          status: statuses[_.getOr(200, 'status', store)], // map schedule status constant
          lastUpdateModeStoreId: updateTypes[_.getOr(200, 'lastUpdateModeStoreId', store)], // map schedule lastUpdateModeStoreId constant
          lastUpdateModeStoreType: updateTypes[_.getOr(200, 'lastUpdateModeStoreType', store)], // map schedule lastUpdateModeStoreType constant
          lastUpdateModeStoreStatus: updateTypes[_.getOr(200, 'lastUpdateModeStoreStatus', store)], // map schedule lastUpdateModeStoreStatus constant
        }))
      );
      updatedState = injectTabularData(updatedState, 'storageDef',
        _.getOr([], ['pus018PacketStore'], data)
          .reduce((acc, store) => [...acc, ...store.pus018Packet], [])
          .map(packet => ({
            ...packet,
            serviceType: updateTypes[_.getOr('', 'serviceType', packet)], // map packets serviceType constant
            serviceSubType: updateTypes[_.getOr(200, 'serviceSubType', packet)], // map packets serviceSubType constant
            packetType: updateTypes[_.getOr(200, 'packetType', packet)], // map packet packetType constant
            isSubsamplingRatioSet: String(_.getOr('', 'isSubsamplingRatioSet', packet)),
            lastUpdateModePacketId: updateTypes[_.getOr(200, 'lastUpdateModePacketId', packet)], // map schedule lastUpdateModePacketId constant
            lastUpdateModeSubSamplingRatio: updateTypes[_.getOr(200, 'lastUpdateModeSubSamplingRatio', packet)], // map schedule lastUpdateModeSubSamplingRatio constant
          }))
      );

      return updatedState;
    }
    default:
      return state;
  }
}

export default createScopedDataReducer(pus18DataReducer, {}, VM_VIEW_PUS18);

export const getPUS18ViewData = state => state[`${VM_VIEW_PUS18}Data`];
export const getData = (state, { viewId }) => state[`${VM_VIEW_PUS18}Data`][viewId];
export const getConfiguration = (state, { viewId }) => state[`${VM_VIEW_PUS18}Configuration`][viewId];
