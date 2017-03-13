import _last from 'lodash/last';
import _findIndex from 'lodash/findIndex';
import _findLastIndex from 'lodash/findLastIndex';
import _keys from 'lodash/keys';
import _each from 'lodash/each';
import _concat from 'lodash/concat';
import _isNumber from 'lodash/isNumber';
import _get from 'lodash/get';
import _head from 'lodash/head';
import _isEmpty from 'lodash/isEmpty';
import _omit from 'lodash/omit';

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
    return { ...state, indexes: {}, lines: {} };
  }

  // keep everything
  if (!state || !state.indexes || Object.keys(state.indexes).length === 0) {
    // state contains no data
    return state;
  }
  let updatedState = state;
  _each(Object.keys(state.indexes), (epName) => {
    updatedState = viewRangeRemoveByEp(updatedState, epName, lower, upper);
  });
  return updatedState;
}
export function viewRangeRemoveByEp(state, epName, lower, upper) {
  if (lower > upper) {
    // unpredictable usage: keep min and max
    return { ...state, indexes: {}, lines: {} };
  }
  // keep everything
  if (!state || !state.indexes || !state.indexes[epName]) {
    // state contains no data
    return state;
  }
  if (state.indexes[epName][0] >= lower && _last(state.indexes[epName]) <= upper) {
    // all points of entryPoint are in visuWindow
    return state;
  }

  // drop everything: keep min and max for PlotView drawing
  if (state.indexes[epName][0] > upper || _last(state.indexes[epName]) < lower) {
    return { ...state,
      indexes: _omit(state.indexes, epName),
      lines: _omit(state.lines, epName),
    };
  }
  // cut
  const iLower = _findIndex(state.indexes[epName], t => t >= lower);
  let iUpper = _findLastIndex(state.indexes[epName], t => t <= upper);
  iUpper = (iUpper === -1) ? state.indexes[epName].length - 1 : iUpper;
  return { ...state,
    indexes: {
      ...state.indexes,
      [epName]: state.indexes[epName].slice(iLower, iUpper + 1),
    },
    lines: {
      ...state.lines,
      [epName]: state.lines[epName].slice(iLower, iUpper + 1),
    },
  };
}
// function used to update min and max when no data is added to state
export function scanForMinAndMax(state) {
  if (!state || !state.indexes || !Object.keys(state.indexes).length) {
    return state;
  }

  const minVal = {};
  const maxVal = {};
  const minTimeVal = {};
  const maxTimeVal = {};
  // loop on EP names
  const epNames = Object.keys(state.indexes);
  _each(epNames, (epName) => {
    // get interval to evaluate the min and max validity
    const lower = _head(state.indexes[epName]);
    const upper = _last(state.indexes[epName]);
    // Check validity of current extrema
    if (state.minTime[epName] >= lower && state.minTime[epName] <= upper
      && state.maxTime[epName] >= lower && state.maxTime[epName] <= upper) {
      // nothing to update
      return;
    }

    // Scan state values
    state.lines[epName].forEach((point) => {
        // const val = _get(col, [epName, 'value']);
      if (!point.value) {
        return;
      }
      if (!minVal[epName] || minVal[epName] >= point.value) {
        minVal[epName] = point.value;
        minTimeVal[epName] = point.masterTime;
      }
      if (!maxVal[epName] || maxVal[epName] <= point.value) {
        maxVal[epName] = point.value;
        maxTimeVal[epName] = point.masterTime;
      }
    });
  });
  // Nothing to update
  if (_isEmpty(minVal) && _isEmpty(maxVal)) {
    return state;
  }

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
  const lower = _head(state.indexes[epName]);
  const upper = _last(state.indexes[epName]);
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
    if (!state.lines[epName]) {
      if (isMin) {
        return { ...state,
          min: { ...state.min, ...minOrMax },
          minTime: { ...state.minTime, ...minOrMaxTime },
        };
      }
      return { ...state,
        max: { ...state.max, ...minOrMax },
        maxTime: { ...state.maxTime, ...minOrMaxTime },
      };
    }
    // scan old data to evaluate min value
    let extremVal = minOrMax[epName];
    let extremValTime = minOrMaxTime[epName];
    state.lines[epName].forEach((point) => {
      if (!point.value) {
        return;
      }
      if ((isMin && point.value < extremVal) || (!isMin && point.value > extremVal)) {
        extremVal = point.value;
        extremValTime = point.masterTime;
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
  const epNames = _keys(payloads); // get remoteIds
  if (!epNames.length || epNames.length < 5) {
    // no data
    return state;
  }

  // from now we are sure we will mutate the state
  let newState = {
    indexes: { ...state.indexes || {} },
    lines: { ...state.lines || {} },
    min: { ...state.min || {} },
    max: { ...state.max || {} },
    minTime: { ...state.minTime || {} },
    maxTime: { ...state.maxTime || {} },
  };


  // min and max
  if (payloads.min) {
    Object.keys(payloads.min || {}).forEach((epName) => {
      newState = getExtremValue(newState, epName, payloads.min, payloads.minTime, true);
      newState = getExtremValue(newState, epName, payloads.max, payloads.maxTime, false);
    });
  }

  let lastIndex = 0;
  let lastTime = 0;
  // newState[epName][masterTime] =
  //   { x: value.payload[ep.fieldX], value: value.payload[ep.fieldY] };
  // TODO: use reduce and improve code understanding
  _each(epNames, (epName) => {
    if (epName === 'min' || epName === 'max' || epName === 'minTime' || epName === 'maxTime') {
      return;
    }
    const remoteIdPayloads = payloads[epName];
    const masterTimes = Object.keys(remoteIdPayloads);
    _each(masterTimes, (masterTime) => {
      // Check validity of current payload
      if (!_isNumber(remoteIdPayloads[masterTime].value)) {
        return;
      }

      const timestamp = parseInt(masterTime, 10); // TODO : avoid by passing .index[] in payload
      // if new value should be pushed at end (most common case in play mode)
      if (lastIndex === -1 && timestamp > lastTime) {
        if (!newState.lines[epName]) {
          newState.lines[epName] = [];
          newState.indexes[epName] = [];
        }
        newState.lines[epName].push({ masterTime: timestamp, ...remoteIdPayloads[masterTime] });
        newState.indexes[epName].push(timestamp);
        lastTime = timestamp;
        return;
      }

      if (timestamp < lastTime) {
        lastIndex = 0; // fix the Object.keys() not always sorted behavior
      }
      lastTime = timestamp;

      const index = _findIndex(newState.indexes[epName], t => t >= timestamp, lastIndex);
      lastIndex = index;
      if (index === -1) {
        // add at end
        if (!newState.lines[epName]) {
          newState.lines[epName] = [];
          newState.indexes[epName] = [];
        }
        newState.lines[epName].push({ masterTime: timestamp, ...remoteIdPayloads[masterTime] });
        newState.indexes[epName].push(timestamp);
        return;
      }
      // timebased data update
      if (newState.indexes[epName][index] === timestamp) {
        newState.lines[epName][index] = { ...remoteIdPayloads[masterTime], masterTime: timestamp };
        return;
      }

      // add at index
      newState.indexes[epName] = _concat(
        newState.indexes[epName].slice(0, index),
        timestamp,
        newState.indexes[epName].slice(index)
      );
      newState.lines[epName] = _concat(
        newState.lines[epName].slice(0, index),
        { ...remoteIdPayloads[masterTime], masterTime: timestamp },
        newState.lines[epName].slice(index)
      );
    });
  });
  return newState;
}
