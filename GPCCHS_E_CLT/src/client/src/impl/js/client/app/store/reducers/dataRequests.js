import _ from 'lodash';
import * as types from '../types';
import mergeIntervals from '../../connectedData/mergeIntervals';

export default function requests(state = {}, action) {
  switch (action.type) {
    case types.DATA_ADD_REQUESTS: {
      const modified = _.reduce(action.payload.requests, (list, { intervals }, remoteId) => {
        // TODO : miss support of multiple intervals to merge in mergeIntervals([], [])
        return _.set(list, [remoteId], _.reduce(
          intervals,
          (a, i) => mergeIntervals(a, i),
          Array.from(state[remoteId] ? state[remoteId] : [])
        ));
      }, {});
      return {
        ...state,
        ...modified,
      };
    }
    default:
      return state;
  }
}
