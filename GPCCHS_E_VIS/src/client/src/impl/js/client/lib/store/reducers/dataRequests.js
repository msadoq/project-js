import _reduce from 'lodash/reduce';
import _set from 'lodash/set';
import _omit from 'lodash/omit';

import intervalManager from 'common/intervals';
import * as types from '../types';

export default function requests(state = {}, action) {
  switch (action.type) {
    case types.DATA_ADD_REQUESTS: {
      const modified = _reduce(
        action.payload.requests,
        (list, { intervals }, remoteId) => _set(
          list,
          [remoteId],
          intervalManager.merge(
            Array.from(state[remoteId] ? state[remoteId] : []),
            intervals
          )
        ),
        {}
      );
      return {
        ...state,
        ...modified,
      };
    }
    case types.DATA_REMOVE_REQUESTS: {
      const idToRemove = [];
      // TODO getLast optimize .remove code to only remove exact matching interval if getLast cd
      const modified = _reduce(action.payload.requests, (list, { intervals }, remoteId) => {
        const reqIntervals = intervalManager.remove(
          Array.from(state[remoteId] ? state[remoteId] : []),
          intervals
        );
        if (reqIntervals.length === 0) {
          idToRemove.push(remoteId);
          return list;
        }
        return _set(list, [remoteId], reqIntervals);
      }, {});
      return {
        ..._omit(state, idToRemove),
        ...modified,
      };
    }
    case types.DATA_REMOVE_ALL_REQUESTS:
      return {};
    default:
      return state;
  }
}
