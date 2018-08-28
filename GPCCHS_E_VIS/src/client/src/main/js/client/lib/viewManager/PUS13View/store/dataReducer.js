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

import { VM_VIEW_PUS13 } from '../../constants';
import createScopedDataReducer from '../../commonData/createScopedDataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';
import { injectTabularData } from '../../commonData/reducer';


// eslint-disable-next-line no-unused-vars
function pus13DataReducer(state = {}, action) {
  switch (action.type) {
    case INJECT_PUS_DATA: {
      /**
        action.payload: {
          timestamp: number,
          data: {
            ...headerDatas:
            pus13UplinkLdt:[
              {
                ...
                pus013LdtPart: [
                  {}
                ],
              },
            ],
            pus13DownlinkLdt:[
              {
                ...
                pus013LdtPart: [
                  {}
                ],
              },
            ],
          }
      */
      const data = _.getOr(null, ['payload', 'data', VM_VIEW_PUS13], action);

      const transfertTypes = parameters.get('PUS_CONSTANTS').TRANSFERT_TYPE;
      const statuses = parameters.get('PUS_CONSTANTS').STATUS;
      const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

      if (!data) {
        return state;
      }
      let updatedState = state;

      // keep all except tabular data
      updatedState = {
        ..._.omit(
          ['pus013UplinkLdt', 'pus013DownlinkLdt'],
          data
        ),
      };


      // injectTabularData: add data tables to dedicated injectTabularData (VirtualizedTableView)
      updatedState = injectTabularData(updatedState, 'uplink',
        _.getOr([], ['pUS013UplinkLdt'], data)
        .map(upData => ({
          status: statuses[String(_.getOr(200, 'status', upData))],
          transferType: transfertTypes[String(_.getOr(200, 'transferType', upData))],
          lastUpdateModeStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeStatus', upData))],
          lastUpdateModeLduId: updateTypes[String(_.getOr(200, 'lastUpdateModeLduId', upData))],

        }))
      );
      updatedState = injectTabularData(updatedState, 'downlink',
        _.getOr([], ['pUS013UplinkLdt'], data)
        .map(downData => ({
          status: statuses[String(_.getOr(200, 'status', downData))],
          transferType: transfertTypes[String(_.getOr(200, 'transferType', downData))],
          lastUpdateModeStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeStatus', downData))],
          lastUpdateModeLduId: updateTypes[String(_.getOr(200, 'lastUpdateModeLduId', downData))],

        }))
      );
      return updatedState;
    }
    default:
      return state;
  }
}

export default createScopedDataReducer(pus13DataReducer, {}, VM_VIEW_PUS13);

export const getPUS13ViewData = state => state[`${VM_VIEW_PUS13}Data`];
export const getData = (state, { viewId }) => state[`${VM_VIEW_PUS13}Data`][viewId];
export const getConfiguration = (state, { viewId }) => state[`${VM_VIEW_PUS13}Configuration`][viewId];
