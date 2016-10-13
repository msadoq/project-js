import _ from 'lodash';
import * as types from '../types';
import vivl from '../../../VIVL/main';

export default function dataCache(stateDataCache = {}, action) {
  switch (action.type) {
    case types.DATA_IMPORT_PAYLOADS: {
      const newState = {};

      // Loop on action.payload.payload => (p, k)
      _.each(action.payload.payloads, (p, k) => {
        if (action.payload.remoteIds[k]) {
        // loop on actions.payload.remoteIds[k].localIds
          _.each(action.payload.remoteIds[k].localIds, (value, localId) => {
            const rVal = vivl(value.viewType, 'getDisplayedValues')(
              stateDataCache[k] ? stateDataCache[k][localId] : undefined, value.field,
              value.expectedInterval, p);
            if (rVal) {
              (newState[k] ? newState[k] : newState[k] = {})[localId] = rVal;
            }
          });
        }
      });
      return Object.assign({}, stateDataCache, newState);
    }
    default:
      return stateDataCache;
  }
}
