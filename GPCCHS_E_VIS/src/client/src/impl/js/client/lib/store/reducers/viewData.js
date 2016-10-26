import { each, set } from 'lodash';
import * as types from '../types';
import debug from '../../common/debug/mainDebug';

const logger = debug('store:action:dataCache');

export default function viewData(stateViewData = {}, action) {
  switch (action.type) {
    case types.DATA_IMPORT_VIEWDATA: {
      const data = action.payload.data;
      const newState = Object.assign({}, stateViewData);
      let isModified = false;
      each(data, (view, viewId) => {
        set(newState, [viewId], view);
        isModified = true;
      });
      if (isModified) {
        return newState;
      }
      return stateViewData;
    }
    case types.DATA_REMOVE_ALL_VIEWDATA:
      return {};
    default:
      return stateViewData;
  }
}
