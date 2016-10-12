import _ from 'lodash';
import simple from '../simpleActionCreator';
import * as types from '../types';
import dataMap from '../../mainProcess/data/dataMap';

/**
 * Simple actions
 */
export const writePayload = simple(types.DATA_IMPORT_PAYLOADS, 'payload', 'remoteIds'); // TODO rename constant

export function importPayload(payload) {
    return (state, dispatch) => {
      // make your data computing
      if (!state.dataRequests || !state.timebars) {
        return dispatch('error', 'No timebar or dataRequest');
      }

      const remoteIds = dataMap(state);

      // const toWrite = {};
      dispatch(writePayload(payload, remoteIds));
    }
}


// export function fetchPosts(category) {
//   return (dispatch, state) => {
//     dispatch(isLoading(true));
//     // test if state.requestedCategory isn't exists
//     fetch('http://google.com/posts?category=' + category, (response) => {
//       dispatch(isLoading(false));
//       if (response.err) {
//         return dispatch('error', response.err.message);
//       }
//
//       dispatch(addPosts(response.payoad));
//     });
//   };
// }
