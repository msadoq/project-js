import _isEqual from 'lodash/isEqual';
import * as types from '../types';
import cleanViewData from '../../dataManager/cleanViewData';
import inject from '../../dataManager/inject';


export default function viewData(state = {}, action) {
  switch (action.type) {

    case types.DATA_REMOVE_ALL_VIEWDATA:
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.DATA_UPDATE_VIEWDATA: {
      const newViewMap = action.payload.newViewMap;
      const oldViewMap = action.payload.oldViewMap;
      const dataKeys = Object.keys(action.payload.dataToInject);
      // If nothing changed and no data to import, return state
      if (_isEqual(newViewMap, oldViewMap) && !dataKeys.length) {
        return state;
      }
      // since now, state will changed
      let newState;
      // view definitions have changed => cleaning
      if (newViewMap !== oldViewMap) {
        newState = cleanViewData(state, oldViewMap, newViewMap);
      }
      // Add payloads
      if (dataKeys.length) {
        newState = inject(newState || state, newViewMap, action.payload.dataToInject);
      }
      return newState || state;
    }
    default:
      return state;
  }
}
