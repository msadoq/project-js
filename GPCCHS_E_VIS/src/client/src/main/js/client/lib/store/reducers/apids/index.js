import _getOr from 'lodash/fp/getOr';
import _set from 'lodash/fp/set';
import {
  WS_APIDS_ASK,
  WS_APIDS_ADD,
} from 'store/types';
import { getTupleId } from '../catalogs';

export const REQUESTING = 'requesting';

// eslint-disable-next-line complexity
export default function apidsReducer(state = {}, action) {
  switch (action.type) {
    case WS_APIDS_ASK: {
      return _set(
        getTupleId(action.payload.domainId, action.payload.sessionId),
        REQUESTING,
        state
      );
    }
    case WS_APIDS_ADD: {
      return _set(
        action.payload.tupleId,
        action.payload.apids,
        state
      );
    }
    default:
      return state;
  }
}

/* --- Selectors ------------------------------------------------------------ */

/**
 * @param state
 * @param domainId
 * @param sessionId
 * @returns {null}
 */
export const getApidsByDomainIdAndSessionId = (state, { domainId, sessionId }) =>
  _getOr(null, getTupleId(domainId, sessionId), state.apids);

/* --- Reducer -------------------------------------------------------------- */

/**
 * @param state
 * @param tupleId
 */
export const getPathToApids = (state, tupleId) => _getOr(null, tupleId, state);

/**
 * @param state
 * @param tupleId
 * @returns {*}
 */
export const getApidsByTupleId = (state, { tupleId }) => getPathToApids(state, tupleId);
