import { reduce as _reduce, set as _set, omit as _omit } from 'lodash';
import * as types from '../types';
import mergeIntervals from '../../common/mergeIntervals';
import removeInterval from '../../common/removeInterval';

export default function requests(state = {}, action) {
  switch (action.type) {
    case types.DATA_ADD_REQUESTS: {
      const modified = _reduce(action.payload.requests, (list, { intervals }, remoteId) =>
        // TODO : miss support of multiple intervals to merge in mergeIntervals([], [])
        _set(list, [remoteId], _reduce(
          intervals,
          (a, i) => mergeIntervals(a, i),
          Array.from(state[remoteId] ? state[remoteId] : [])
        )), {});
      return {
        ...state,
        ...modified,
      };
    }
    case types.DATA_REMOVE_REQUESTS: {
      const idToRemove = [];
      const modified = _reduce(action.payload.requests, (list, { intervals }, remoteId) => {
        const reqIntervals = _reduce(intervals,
          (a, i) => removeInterval(a, i),
          Array.from(state[remoteId] ? state[remoteId] : [])
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
    default:
      return state;
  }
}
