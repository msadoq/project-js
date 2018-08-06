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

import { VM_VIEW_PUS05 } from '../../constants';
import createScopedDataReducer from '../../commonData/createScopedDataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';
import { injectTabularData } from '../../commonData/reducer';

// eslint-disable-next-line no-unused-vars
function pus05DataReducer(state = {}, action) {
  switch (action.type) {
    case INJECT_PUS_DATA: {
      /**
       * action.payload: {
       *  timestamp: number,
       *  data: {
       *    PUS05View: {
       *      pus005OnBoardEvent: [],
       *      pus005ReceivedOnBoardEvent: [],
       *      ...rest
       *    },
       *  },
       * },
       */
      const data = _.getOr(null, ['payload', 'data', VM_VIEW_PUS05], action);
      if (!data) {
        return state;
      }
      let updatedState = state;

      const statuses = parameters.get('PUS_CONSTANTS').STATUS;
      const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

      // keep all except tabular data
      updatedState = {
        ..._.omit(
          ['pus005OnBoardEvent', 'pus005ReceivedOnBoardEvent'],
          data
        ),
      };

      // injectTabularData: add data tables to dedicated injectTabularData (VirtualizedTableView)
      updatedState = injectTabularData(updatedState, 'onBoardEvents',
        _.getOr([], ['pus005OnBoardEvent'], data)
          .map(boardEvent => ({
            ...boardEvent,
            onBoardStatus: statuses[String(_.getOr(200, 'onBoardStatus', boardEvent))],
            defaultOnBoardStatus: statuses[String(_.getOr(200, 'onBoardStatus', boardEvent))],
            lastUpdateModeRid: updateTypes[String(_.getOr(200, 'lastUpdateModeRid', boardEvent))],
            lastUpdateModeOnBoardStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeOnBoardStatus', boardEvent))],
            lastUpdateModeAlarmLevel: updateTypes[String(_.getOr(200, 'lastUpdateModeAlarmLevel', boardEvent))],
          }))
      );
      updatedState = injectTabularData(updatedState, 'received',
        _.getOr([], ['pus005ReceivedOnBoardEvent'], data)
        .map(received => ({
          ..._.omit(['parameter'], received),
          ..._.getOr([], 'parameter', received)
            .reduce((a, c, i) => {
              // console.log(JSON.stringify(a, null, 2));
              _.set('param'.concat(i + 1), c.name, a);
              _.set('value'.concat(i + 1), c.value, a);
              return a;
            }, {}),
        }))
      );

      return updatedState;
    }
    default:
      return state;
  }
}

export default createScopedDataReducer(pus05DataReducer, {}, VM_VIEW_PUS05);

export const getPUS05ViewData = state => state[`${VM_VIEW_PUS05}Data`];
export const getData = (state, { viewId }) => state[`${VM_VIEW_PUS05}Data`][viewId];
export const getConfiguration = (state, { viewId }) => state[`${VM_VIEW_PUS05}Configuration`][viewId];
