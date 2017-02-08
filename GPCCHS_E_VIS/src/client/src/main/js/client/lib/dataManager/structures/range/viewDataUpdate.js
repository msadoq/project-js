import _last from 'lodash/last';
import _findIndex from 'lodash/findIndex';
import _findLastIndex from 'lodash/findLastIndex';
import _keys from 'lodash/keys';
import _each from 'lodash/each';
import _concat from 'lodash/concat';

import pickBy from 'lodash/fp/pickBy';
import prop from 'lodash/fp/prop';
import pipe from 'lodash/fp/pipe';
import isNumber from 'lodash/fp/isNumber';

export default function viewDataUpdate(viewDataState, viewId, view) {
  const remove = view.remove;
  const add = view.add;
  let viewState = viewDataState ? viewDataState[viewId] : {};

  if (remove && remove.lower && remove.upper) {
    viewState = viewRangeRemove(viewState, remove.lower, remove.upper);
  }
  viewState = viewRangeAdd(viewState, add);

  if (!viewDataState) {
    return { [viewId]: viewState };
  }
  return (viewState === viewDataState[viewId])
  ? viewDataState
  : { ...viewDataState,
    [viewId]: viewState,
  };
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
  const iLower = _findIndex(state.index, t => t >= lower);
  let iUpper = _findLastIndex(state.index, t => t <= upper);
  iUpper = (iUpper === -1) ? state.index.length - 1 : iUpper;

  return {
    index: state.index.slice(iLower, iUpper + 1),
    columns: state.columns.slice(iLower, iUpper + 1),
  };
}

export function viewRangeAdd(state = {}, payloads) {
  const keys = _keys(payloads);
  if (!keys.length) {
    // no data
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
    // don't use payload if it's not a number
    const keepNumbers = pickBy(pipe(prop('value'), isNumber));
    const value = keepNumbers(payloads[key]);
    if (!Object.keys(value).length) {
      return;
    }

    const timestamp = parseInt(key, 10); // TODO : avoid by passing .index[] in payload
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

    const index = _findIndex(newState.index, t => t >= timestamp, lastIndex);
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
    newState.index = _concat(
      newState.index.slice(0, index),
      timestamp,
      newState.index.slice(index)
    );
    newState.columns = _concat(
      newState.columns.slice(0, index),
      { ...value, x: timestamp },
      newState.columns.slice(index)
    );
  });
  return newState;
}
