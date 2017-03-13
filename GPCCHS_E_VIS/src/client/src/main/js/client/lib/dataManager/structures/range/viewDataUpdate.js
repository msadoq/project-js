import _last from 'lodash/last';
import _findIndex from 'lodash/findIndex';
import _findLastIndex from 'lodash/findLastIndex';
import _keys from 'lodash/keys';
import _each from 'lodash/each';
import _concat from 'lodash/concat';
import _pickBy from 'lodash/pickBy';
import _isNumber from 'lodash/isNumber';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _head from 'lodash/head';
import _filter from 'lodash/filter';

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
    // unpredictable usage: keep min and max
    return { ...state, index: [], columns: [] };
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

  // drop everything: keep min and max for PlotView drawing
  if (state.index[0] >= upper || _last(state.index) <= lower) {
    return { ...state, index: [], columns: [] };
  }

  // cut
  const iLower = _findIndex(state.index, t => t >= lower);
  let iUpper = _findLastIndex(state.index, t => t <= upper);
  iUpper = (iUpper === -1) ? state.index.length - 1 : iUpper;

  return {
    ...state,
    index: state.index.slice(iLower, iUpper + 1),
    columns: state.columns.slice(iLower, iUpper + 1),
  };
}

// function used to update min and max when no data is added to state
export function scanForMinAndMax(state) {
  if (!state || !state.index || !state.index.length) {
    return state;
  }

  // get interval to evaluate the min and max validity
  const lower = _head(state.index);
  const upper = _last(state.index);
  const epNames = Object.keys(state.minTime || {});
  if (!epNames.length) {
    return state;
  }
  // Get entry point names to update
  const epToUpdate = _filter(epNames, epName =>
    (state.minTime[epName] < lower || state.minTime[epName] > upper
    || state.maxTime[epName] < lower || state.maxTime[epName] > upper));
  // No update needed
  if (!epToUpdate.length) {
    return state;
  }

  const minVal = {};
  const maxVal = {};
  const minTimeVal = {};
  const maxTimeVal = {};
  // Scan state values
  state.columns.forEach((col) => {
    epToUpdate.forEach((epName) => {
      const val = _get(col, [epName, 'value']);
      if (!val) {
        return;
      }
      if (!minVal[epName] || minVal[epName] >= val) {
        minVal[epName] = val;
        minTimeVal[epName] = _get(col, 'x');
      }
      if (!maxVal[epName] || maxVal[epName] <= val) {
        maxVal[epName] = val;
        maxTimeVal[epName] = _get(col, 'x');
      }
    });
  });

  return { ...state,
    min: Object.assign({}, state.min, minVal),
    max: Object.assign({}, state.max, maxVal),
    minTime: Object.assign({}, state.minTime, minTimeVal),
    maxTime: Object.assign({}, state.maxTime, maxTimeVal),
  };
}

export function getExtremValue(state, epName, minOrMax, minOrMaxTime, isMin) {
  let stateMinOrMax;
  let stateMinOrMaxTime;
  // get interval to evaluate the min and max validity
  const lower = _head(state.index);
  const upper = _last(state.index);
  if (isMin) {
    // check the recorded timestamp before using it
    const stateMinTime = _get(state, ['minTime', epName]);
    if (stateMinTime && stateMinTime >= lower && stateMinTime <= upper) {
      stateMinOrMax = state.min[epName];
      stateMinOrMaxTime = stateMinTime;
    }
  } else {
    // check the recorded timestamp
    const stateMaxTime = _get(state, ['maxTime', epName]);
    if (stateMaxTime && stateMaxTime >= lower && stateMaxTime <= upper) {
      stateMinOrMax = state.max[epName];
      stateMinOrMaxTime = stateMaxTime;
    }
  }

  if (stateMinOrMax) {
    // Value needs update
    if ((isMin && stateMinOrMax >= minOrMax[epName])
    || (!isMin && stateMinOrMax <= minOrMax[epName])) {
      stateMinOrMax = minOrMax[epName];
      stateMinOrMaxTime = minOrMaxTime[epName];
    }
    // Else : keep old value
  } else {
    // scan old data to evaluate min value
    let extremVal = minOrMax[epName];
    let extremValTime = minOrMaxTime[epName];
    state.columns.forEach((col) => {
      const val = _get(col, [epName, 'value']);
      if (!val) {
        return;
      }
      if ((isMin && val < extremVal) || (!isMin && val > extremVal)) {
        extremVal = val;
        extremValTime = col.x;
      }
    });
    // save values
    stateMinOrMax = extremVal;
    stateMinOrMaxTime = extremValTime;
  }
  if (isMin) {
    return { ...state,
      min: { ...state.min, [epName]: stateMinOrMax },
      minTime: { ...state.minTime, [epName]: stateMinOrMaxTime },
    };
  }
  return { ...state,
    max: { ...state.max, [epName]: stateMinOrMax },
    maxTime: { ...state.maxTime, [epName]: stateMinOrMaxTime },
  };
}

export function viewRangeAdd(state = {}, payloads) {
  const keys = _keys(payloads);
  if (!keys.length || keys.length < 5) {
    // no data
    return state;
  }

  // from now we are sure we will mutate the state
  let newState = {
    index: [...(state.index || [])],
    columns: [...(state.columns || [])],
    min: { ...state.min || {} },
    max: { ...state.max || {} },
    minTime: { ...state.minTime || {} },
    maxTime: { ...state.maxTime || {} },
  };


  // min and max
  if (payloads.min) {
    Object.keys(payloads.min).forEach((epName) => {
      newState = getExtremValue(newState, epName, payloads.min, payloads.minTime, true);
      newState = getExtremValue(newState, epName, payloads.max, payloads.maxTime, false);
    });
  }

  let lastIndex = 0;
  let lastTime = 0;
  // newState[masterTime][epName] =
  //   { x: value.payload[ep.fieldX], value: value.payload[ep.fieldY] };
  // TODO: use reduce and improve code understanding
  _each(keys, (key) => {
    // Case of min, max, minTime, maxTime
    if (key === 'min' || key === 'max' || key === 'minTime' || key === 'maxTime') {
      return;
    }
    // don't use payload if it's not a number
    const value = _pickBy(payloads[key], p => p && _isNumber(p.value));
    if (_isEmpty(value)) {
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
