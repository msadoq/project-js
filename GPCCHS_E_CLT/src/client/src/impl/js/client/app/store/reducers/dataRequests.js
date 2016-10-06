import _ from 'lodash';
import * as types from '../types';

export default function requests(state = {}, action) {
  switch (action.type) {
    // case types.DATA_ADD_REQUEST:
    //   return {
    //     ...state,
    //     [action.payload.remoteId]: remoteId(state.remoteId, action),
    //   };
    default:
      return state;
  }
}

// const remoteIdInitialState = {
//   dataId: null,
//   filters: {},
//   localIds: {},
// };
//
// function remoteId(state = remoteIdInitialState, action) {
//   switch (action.type) {
//     case types.DATA_ADD_REQUEST:
//       return {
//         ...state,
//         [action.payload.remoteId]: remoteId(state.remoteId, action),
//       };
//     default:
//       return state;
//   }
// }
//
// function localIds(state = {}, action) {
//   switch (action.type) {
//     case types.DATA_ADD_REQUEST:
//       return Object.assign({}, state, {
//         title: action.payload.title || state.title,
//         type: action.payload.type || state.type,
//         configuration: configuration(undefined, action),
//       });
//     default:
//       return state;
//   }
// }
//
// const localIdInitialState = {
//   viewType: null,
//   field: null,
//   timebarId: null,
//   offset: null,
//   intervals: [],
// };
//
// function localId(state = localIdInitialState, action) {
//   switch (action.type) {
//     case types.DATA_ADD_REQUEST:
//       return Object.assign({}, state, {
//         title: action.payload.title || state.title,
//         type: action.payload.type || state.type,
//         configuration: configuration(undefined, action),
//       });
//     default:
//       return state;
//   }
// }
