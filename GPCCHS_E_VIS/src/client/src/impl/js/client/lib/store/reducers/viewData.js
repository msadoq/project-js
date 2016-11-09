
import globalConstants from 'common/constants';
import { findIndex, findLastIndex, concat } from 'lodash';
import _each from 'lodash/each';
import _get from 'lodash/get';
import _reduce from 'lodash/reduce';
import _last from 'lodash/last';
import _keys from 'lodash/keys';
import * as types from '../types';

export default function viewData(state = {}, action) {
  switch (action.type) {
    case types.DATA_IMPORT_VIEWDATA: {
      /**
       * {
       *   viewId: {
       *     // last structure type
       *     structureType: 'last'
       *     index: {
       *       CLK_BC_PMONENA: 1420106460000,
       *       GENE_AM_S23RTSWD: 1420106460000,
       *     },
       *     values: {
       *       CLK_BC_PMONENA: 0.286974618986513,
       *       GENE_AM_S23RTSWD: 0.286974618986513,
       *     },
       *   },
       *   viewId: {
       *     // range structure type
       *     structureType: 'range',
       *     remove: {
       *       lower: 1420106460000,
       *       upper: 1420106460000,
       *     },
       *     add: {
       *       '1420106464000': {
       *         CLK_BC_PMONENA: { x: 1420106464000, value: 0.286974618986513 },
       *         GENE_AM_S23RTSWD: { x: 1420106464000, value: 0.25454618986513 },
       *       },
       *     },
       *    }
       *  }
       */
      if (!action.payload.viewData || Object.keys(action.payload.viewData).length < 1) {
        return state;
      }
      const retValue = _reduce(action.payload.viewData, (newState, view, viewId) => {
        switch (view.structureType) {
          case globalConstants.DATASTRUCTURETYPE_LAST:
            return viewLast(newState, viewId, view.index, view.values);
          case globalConstants.DATASTRUCTURETYPE_RANGE: {
            return viewRange(newState, viewId, view.remove, view.add);
          }
          default:
            return newState;
        }
      }, state);
      return retValue;
    }
    case types.DATA_REMOVE_ALL_VIEWDATA:
      return {};
    default:
      return state;
  }
}

export function viewLast(state, viewId, index, values) {
  if (!Object.keys(index).length && !Object.keys(values).length) {
    return state;
  }

  const stateIndex = _get(state, [viewId, 'index'], {});
  const stateValues = _get(state, [viewId, 'values'], {});

  // TODO : simplify code and bufferisation by passing all value for this param and take only closer
  // to current time here

  return Object.assign({}, state, {
    [viewId]: {
      index: { ...stateIndex, ...index },
      values: { ...stateValues, ...values },
    }
  });
}

export function viewRange(state, viewId, remove, add) {
  let viewState = state[viewId];
  if (remove && remove.lower && remove.upper) {
    viewState = viewRangeRemove(viewState, remove.lower, remove.upper);
  }
  viewState = viewRangeAdd(viewState, add);

  return (viewState === state[viewId])
    ? state // no modification
    : Object.assign({}, state, {
      [viewId]: viewState,
    });
}

/**
 * Returns a modified state without values outside lower and upper limits
 *
 * @param state
 * @param lower
 * @param upper
 * @return {*}
 */
export function viewRangeRemove(state, lower, upper) {
  if (lower > upper) {
    // unpredictable usage
    return { index: [], columns: [] };
  }

  // keep everything
  if (!state || !state.index || state.index.length === 0) {
    // state contains no data
    return state;
  }
  if (state.index[0] >= lower && _last(state.index) <= upper) {
    // all points are in visuWindow
    return state;
  }

  // drop everything
  if (state.index[0] >= upper || _last(state.index) <= lower) {
    return { index: [], columns: [] };
  }

  // cut
  const iLower = findIndex(state.index, t => t >= lower);
  let iUpper = findLastIndex(state.index, t => t <= upper);
  iUpper = (iUpper === -1) ? state.index.length - 1 : iUpper;

  return {
    index: state.index.slice(iLower, iUpper + 1),
    columns: state.columns.slice(iLower, iUpper + 1),
  };
}

export function viewRangeAdd(state = {}, payloads) {
  const keys = _keys(payloads);
  if (!keys.length) {
    // nothing to import contains no data
    return state;
  }

  // from now we are sure we will mutate the state
  const newState = {
    index: [...(state.index || [])],
    columns: [...(state.columns || [])],
  };

  let lastIndex = 0;
  let lastTime = 0;
  // newState[masterTime][epName] =
  //   { x: value.payload[ep.fieldX], value: value.payload[ep.fieldY] };
  // TODO: use reduce and improve code understanding
  _each(keys, (key) => {
    const timestamp = parseInt(key, 10); // TODO : avoid by passing .index[] in payload
    const value = payloads[key];

    // if new value should be pushed at end (most common case in play mode)
    if (lastIndex === -1 && timestamp > lastTime) {
      newState.columns = newState.columns.concat({ ...value, x: timestamp });
      newState.index = newState.index.concat(timestamp);
      lastTime = timestamp;
      return;
    }

    if (timestamp < lastTime) {
      lastIndex = 0; // fix the Object.keys() not always sorted behavior
    }
    lastTime = timestamp;

    const index = findIndex(newState.index, t => t >= timestamp, lastIndex);
    lastIndex = index;
    if (index === -1) {
      // add at end
      newState.columns = newState.columns.concat({ ...value, x: timestamp });
      newState.index = newState.index.concat(timestamp);
      return;
    }

    if (newState.index[index] === timestamp) {
      // update an existing value
      newState.columns[index] = { ...newState.columns[index], ...value };
      return;
    }

    // add at index
    newState.index = concat(
      newState.index.slice(0, index),
      timestamp,
      newState.index.slice(index)
    );
    newState.columns = concat(
      newState.columns.slice(0, index),
      { ...value, x: timestamp },
      newState.columns.slice(index)
    );
  });
  return newState;
}
