/* eslint-disable no-continue, "DV6 TBC_CNES Perf. requires 'for', 'continue' avoid complexity" */
import _findIndex from 'lodash/findIndex';
import _last from 'lodash/last';
import _cloneDeep from 'lodash/cloneDeep';
import _concat from 'lodash/concat';
import _map from 'lodash/map';
import _mapValues from 'lodash/mapValues';
import _each from 'lodash/each';
import _get from 'lodash/get';
// import { applyFilters } from '../../commonData/applyFilters';
import { convertData } from '../../commonData/convertData';
import * as constants from '../../../constants';

/**
 * Add payloads in plot view data state
 *
 * @param  {Object} state    data state of current view
 * @param  {string} viewId   current view ID
 * @param  {Object} payloads data to add in state per EP name
 *
 * @return {Object}          updated state
 */
export function viewRangeAdd(state = {}, viewId, payloads) {
  // get EP names
  const epNames = Object.keys(payloads || {});
  // Only one entry point per ground alarm view
  if (epNames.length !== 1) {
    // no data
    return state;
  }

  // Loop on payloads to update state
  // lines: contains all fields filtered by time { [timestamp]: { values }}
  // indexes: contains ordered timestamps [t1, t2, ...]
  let newState = _cloneDeep(state);
  if (!newState.indexes) {
    newState = { lines: {}, indexes: [] };
  }

  // loop on EP name to add payload sorted by masterTime in EP table
  for (let i = 0; i < epNames.length; i += 1) {
    const epName = epNames[i];

    // Update of EP data
    newState.lines = Object.assign({}, newState.lines, payloads[epName]);
    const timestamps = _map(payloads[epName], viewData => viewData.timestamp);
    let lastIndex = -1;
    let lastTime;
    // loop on payload timestamps
    for (let iTime = 0; iTime < timestamps.length; iTime += 1) {
      // let indexInLines = -1;
      const time = timestamps[iTime];
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
        }
      }
      lastTime = time;
    }
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
    // get useful data in payload : { epName: {timestamp: data, ...}}
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

  const newState = { [epName]: {} };

  // Loop on payload
  _each(tbdIdPayload, (currentValue, i) => {
    const timestamp = currentValue.groundMonitoringAlarm.referenceTimestamp.value || Number(i);
    // TODO do we have to check creation date to validate timestamp ?
    // const timestamp = _get(currentValue, ['creationDate', 'value']);
    // if (typeof timestamp === 'undefined') {
    //   logger.warn('get an alarm without .creationDate key ', tbdIdPayload);
    //   continue;
    // }
    // TODO: needs to determine on which filters have top be applied
    // // check value verify filters
    // if (!applyFilters(currentValue, ep.filters)) {
    //   continue;
    // }
    const masterTime = timestamp + ep.offset;
    const groundMonitoringAlarm = currentValue.groundMonitoringAlarm;
    if (!groundMonitoringAlarm) {
      return;
    }
    // Compute acknowledgement State
    let ackState = constants.GMA_ALARM_ACKSTATE_NOACK;
    if (convertData(groundMonitoringAlarm.hasAckRequest) === 'true') {
      ackState = constants.GMA_ALARM_ACKSTATE_REQUIREACK;
      if (currentValue.ackRequest && currentValue.ackRequest.ack) {
        ackState = constants.GMA_ALARM_ACKSTATE_ACQUITED;
      }
    }

    // Filter values out of interval but keep "REQUIREACK" Alarms
    const isOutOfTimeRange = timestamp < lower || timestamp > upper;
    if (isOutOfTimeRange && ackState !== constants.GMA_ALARM_ACKSTATE_REQUIREACK) {
      return;
    }

    const valueToInsert = {
      oid: currentValue.oid,
      timestamp,
      parameterName: convertData(currentValue.parameterName),
      parameterType: convertData(currentValue.parameterType),
      satellite: convertData(currentValue.satellite),
      telemetryType: convertData(currentValue.telemetryType),
      creationDate: convertData(groundMonitoringAlarm.creationDate),
      closingDate: convertData(groundMonitoringAlarm.closingDate),
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
    }

    newState[epName][masterTime] = valueToInsert;
  });

  // if no data, return empty state
  if (!Object.keys(newState[epName]).length) {
    return {};
  }

  return newState;
}
