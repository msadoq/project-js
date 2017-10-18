/* eslint-disable no-continue, "DV6 TBC_CNES Perf. requires 'for', 'continue' avoid complexity" */
import _findIndex from 'lodash/findIndex';
import _last from 'lodash/last';
import _cloneDeep from 'lodash/cloneDeep';
import _concat from 'lodash/concat';
import _map from 'lodash/map';
import _mapValues from 'lodash/mapValues';
import _get from 'lodash/get';
// import { applyFilters } from '../../commonData/applyFilters';
import { convertData } from '../../commonData/convertData';
import * as constants from '../../../constants';

/* ************************************
 * Add payloads in plot view data state
 * @param: data state of current view
 * @param: current view ID
 * @param: data to add in state per EP name
 * @param: current view configuration
 * @param: visuWindow to have current time
 * @return: updated state
/* *********************************** */
export function viewRangeAdd(state = {}, viewId, payloads, viewConfig, visuWindow) {
  // get EP names
  const epNames = Object.keys(payloads || {});
  // Only one entry point per ground alarm view + transitionNb
  if (epNames.length !== 2) {
    // no data
    return state;
  }

  // Loop on payloads to update state
  // data: contains all fields filtered by time { [timestamp]: { values }}
  // lines: contains ordered timestamps [t1, t2, ...]
  // transitionNb: Nb of transitions present in data (for table display only)
  let newState = _cloneDeep(state);
  if (!newState.data) {
    newState = { lines: [], indexes: [], data: {}, transitionNb: 0 };
  }

  // loop on EP name to add payload sorted by masterTime in EP table
  for (let i = 0; i < epNames.length; i += 1) {
    const epName = epNames[i];
    // Does not consider transitionNb as an entry point name
    if (epName === 'transitionNb') {
      // update of transition number
      newState.transitionNb += payloads.transitionNb;
      continue;
    }

    // Update of EP data
    newState.data = Object.assign({}, newState.data, payloads[epName]);
    const timestamps = Object.keys(payloads[epName]);
    let lastIndex = -1;
    let lastTime;
    // loop on payload timestamps
    for (let iTime = 0; iTime < timestamps.length; iTime += 1) {
      // let indexInLines = -1;
      const time = timestamps[iTime];
      let updLines = true;
      // Add payload in EP Table sorted by ascending time
      if (lastIndex === -1 && lastTime && lastTime < time) {
        newState.indexes.push(time);
      } else {
        let index = -1;
        if (newState.indexes.length) {
          index = _findIndex(newState.indexes, val => val >= time);
        }
        lastIndex = index;
        if (index === -1) {
          newState.indexes.push(time);
        } else if (newState.indexes[index] !== time) {
          newState.indexes = _concat(
            newState.indexes.slice(0, index),
            time,
            newState.indexes.slice(index));
        } else {
          // Data is already present in table lines, no need to add it
          updLines = false;
        }
      }
      lastTime = time;
      if (updLines) {
        // Sorting considering specified column
        newState =
          updateLines(newState, time, lastIndex, viewConfig.alarmMode, visuWindow);
      }
    }
  }

  return newState;
}

/* ************************************
 * Update 'lines' table with payload considering sorting parameters
 * @param: data state of current view
 * @param: EP Name
 * @param: current timestamp
 * @param: alarm mode: ALL | NONNOMINAL | TOACKNOWLEDGE
 * @param: direction for sorting
 * @return: updated state
/* *********************************** */
export function updateLines(state, time, index, alarmMode, visuWindow) {
  const newState = state;
  const value = newState.data[time];

  // If mode = ALL, index in lines is the same as in indexes
  if (alarmMode === constants.ALARM_MODE_ALL) {
    if (index === -1) {
      newState.lines.push(time);
    } else {
      newState.lines = _concat(
        newState.lines.slice(0, index),
        time,
        newState.lines.slice(index));
    }
    return newState;
  } else if (alarmMode === constants.ALARM_MODE_NONNOMINAL) {
    // Just adds the alarms not closed at current time
    if (state.data[time].closingDate && state.data[time].closingDate <= visuWindow.current) {
      return state;
    }
  } else if (alarmMode === constants.ALARM_MODE_TOACKNOWLEDGE) {
    // No addition in lines
    if (value.ackState === constants.ALARM_ACKSTATE_NOACK
    || value.ackState === constants.ALARM_ACKSTATE_ACQUITED) {
      return state;
    }
  }
  //  find index to insert in lines
  const indexInLines = _findIndex(newState.lines, val => val >= time);
  if (indexInLines === -1) {
    newState.lines.push(time);
  } else if (newState.lines[indexInLines] !== time) {
    newState.lines = _concat(
      newState.lines.slice(0, indexInLines),
      time,
      newState.lines.slice(indexInLines));
  }
  return newState;
}

/* ************************************
 * Select payload to add for current view
 * @param: current view data map
 * @param: intervals for all entry Points
 * @param: received data
 * @return: payloads to use per EP (unique)
/* *********************************** */
export function selectDataPerView(currentViewMap, intervalMap, payload) {
  let epSubState = {};
  if (currentViewMap) {
    const epNames = Object.keys(currentViewMap.entryPoints);
    // Only one entry point per ground alarm view
    if (epNames.length !== 1) {
      return {};
    }
    const epName = epNames[0];
    const ep = currentViewMap.entryPoints[epName];
    // No payload for this tbd  Id
    if (!payload[ep.tbdId]) {
      return {};
    }
    // get useful data in payload : { epName: {timestamp: data, ...}, transitionNb: int }
    epSubState = selectEpData(payload[ep.tbdId], ep, epName, intervalMap);
  }
  return epSubState;
}
/* ************************************
 * Select payload to add for current entry Point
 * @param: payload of current entry point
 * @param: entry point definition
 * @param: entry point name
 * @param: intervals for all entry Points
 * @return: ep payload to be used
/* *********************************** */
export function selectEpData(tbdIdPayload, ep, epName, intervalMap) {
  // get expected interval
  const expectedInterval = _get(intervalMap, [ep.tbdId, ep.localId, 'expectedInterval']);
  // case of error when visuWindow duration is too long
  if (!expectedInterval) {
    return {};
  }
  const lower = expectedInterval[0];
  const upper = expectedInterval[1];

  const timestamps = Object.keys(tbdIdPayload);
  const newState = { [epName]: {}, transitionNb: 0 };

  let transitionNb = 0;
  // Loop on payload timestamps
  for (let i = 0; i < timestamps.length; i += 1) {
    // TODO pgaucher remove this when stub are operational
    const currentValue = tbdIdPayload[timestamps[i]];
    const timestamp = timestamps[i];
    // TODO do we have to check creation date to validate timestamp ?
    // const timestamp = _get(currentValue, ['creationDate', 'value']);
    // if (typeof timestamp === 'undefined') {
    //   logger.warn('get an alarm without .creationDate key ', tbdIdPayload);
    //   continue;
    // }
    // check value is in interval
    if (timestamp < lower || timestamp > upper) {
      continue;
    }
    // TODO: needs to determine on which filters have top be applied
    // // check value verify filters
    // if (!applyFilters(currentValue, ep.filters)) {
    //   continue;
    // }
    const masterTime = timestamp + ep.offset;
    const groundMonitoringAlarm = currentValue.groundMonitoringAlarm;
    if (!groundMonitoringAlarm) {
      continue;
    }
    // Compute acknowledgement State
    let ackState = constants.ALARM_ACKSTATE_NOACK;
    if (groundMonitoringAlarm.hasAckRequest) {
      ackState = constants.ALARM_ACKSTATE_REQUIREACK;
      if (currentValue.ackRequest && currentValue.ackRequest.ack) {
        ackState = constants.ALARM_ACKSTATE_ACQUITED;
      }
    }

    const valueToInsert = {
      parameterName: convertData(currentValue.parameterName),
      parameterType: convertData(currentValue.parameterType),
      satellite: convertData(currentValue.satellite),
      telemetryType: convertData(currentValue.telemetryType),
      ackState,
      duration: groundMonitoringAlarm.closingDate
        ? convertData({ type: 'duration',
          value: (
            groundMonitoringAlarm.closingDate.value - groundMonitoringAlarm.creationDate.value
          ) })
        : '-',
    };
    // Data from transitions table
    if (groundMonitoringAlarm.transitions && groundMonitoringAlarm.transitions.length) {
      const lastTransition = _last(groundMonitoringAlarm.transitions);
      Object.assign(valueToInsert, {
        firstOccurence: convertData(groundMonitoringAlarm.transitions[0].onboardDate),
        alarmType: convertData(lastTransition.monitoringState),
        lastOccurence: convertData(lastTransition.onboardDate),
        rawValue: convertData(lastTransition.rawValue),
        physicalValue: convertData(lastTransition.extractedValue),
        transitions: _map(groundMonitoringAlarm.transitions, transition => (
          _mapValues(transition, transitionProperty => (
            convertData(transitionProperty)
          ))
        )),
      });
      // Update of transitionNb
      transitionNb += groundMonitoringAlarm.transitions.length;
    }

    newState[epName][masterTime] = valueToInsert;
  }
  // if no data, return empty state
  if (!Object.keys(newState[epName]).length) {
    return {};
  }
  // Save transitionNb
  newState.transitionNb = transitionNb;
  return newState;
}
