/* eslint-disable no-continue, "DV6 TBC_CNES Perf. requires 'for', 'continue' avoid complexity" */
/* eslint-disable complexity, "DV6 TBC_CNES Perf. switch case" */
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
 * Debuging function. To check if the indexes are well sorted.
 */
// function logTheTimestamps(viewData) {
//   console.log(viewData.indexes.map(oid => (
//     viewData.lines[oid].timestamp
//   )));
// }

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
  // lines: contains all fields indexed by oid { [oid]: { values }}
  // indexes: contains ordered oids [oid1, oid2, ...]
  let newState = _cloneDeep(state);
  if (!newState.indexes) {
    newState = { lines: {}, indexes: [] };
  }

  // loop on EP name to add payload sorted by oid in EP table
  for (let i = 0; i < epNames.length; i += 1) {
    const epName = epNames[i];

    // Update of EP data
    newState.lines = Object.assign({}, newState.lines, payloads[epName]);
    const oids = Object.keys(payloads[epName]);

    let lastIndex = -1;
    let lastTime;
    // loop on payload oids
    for (let oidIndex = 0; oidIndex < oids.length; oidIndex += 1) {
      const insertOid = oids[oidIndex];
      const payload = payloads[epName][insertOid];
      const time = payload.timestamp;
      // Optimisation when payloads are sorted by ascending time
      if (lastIndex === -1 && lastTime && lastTime <= time) {
        newState.indexes.push(insertOid);
      } else {
        // search where to insert payload
        let insertIndex = -1;
        if (newState.indexes.length) {
          insertIndex = _findIndex(newState.indexes, searchOid => (
            newState.lines[searchOid].timestamp >= time
          ));
        }
        lastIndex = insertIndex;
        if (insertIndex === -1) {
          newState.indexes.push(insertOid);
        } else if (newState.indexes[insertIndex] !== insertOid) {
          newState.indexes = _concat(
            newState.indexes.slice(0, insertIndex),
            insertOid,
            newState.indexes.slice(insertIndex));
        }
      }
      lastTime = time;
    }
  }

  // logTheTimestamps(newState);
  return newState;
}


/* ************************************
 * Select payload to add for current view
 * @param: current view data map
 * @param: intervals for all entry Points
 * @param: received data
 * @return: payloads to use per EP (unique)
/* *********************************** */
export function selectDataPerView(currentViewMap, intervalMap, payload, visuWindow) {
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
    epSubState = selectEpData(payload[ep.tbdId], ep, epName, intervalMap, visuWindow);
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
export function selectEpData(tbdIdPayload, ep, epName, intervalMap, visuWindow) {
  // get expected interval
  const expectedInterval = _get(intervalMap, [ep.tbdId, ep.localId, 'expectedInterval']);
  // case of error when visuWindow duration is too long
  if (!expectedInterval) {
    return {};
  }
  const lower = expectedInterval[0];
  const upper = expectedInterval[1];

  const epSubState = { [epName]: {} };

  // Loop on payload
  _each(tbdIdPayload, (currentValue, i) => {
    const groundMonitoringAlarm = currentValue.groundMonitoringAlarm;
    const oid = currentValue.oid;
    if (!oid || !groundMonitoringAlarm) {
      return;
    }

    const offset = ep.offset || 0;
    const timestamp = (groundMonitoringAlarm.referenceTimestamp.value || Number(i)) + offset;
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

    // Compute acknowledgement State
    let ackState = constants.GMA_ALARM_ACKSTATE_NOACK;
    if (convertData(groundMonitoringAlarm.hasAckRequest) === 'true') {
      ackState = constants.GMA_ALARM_ACKSTATE_REQUIREACK;
      if (currentValue.ackRequest && currentValue.ackRequest.ack) {
        ackState = constants.GMA_ALARM_ACKSTATE_ACQUITED;
      }
    }

    if (ep.mode === constants.GMA_ALARM_MODE_TOACKNOWLEDGE) {
      if (ackState !== constants.GMA_ALARM_ACKSTATE_REQUIREACK) {
        return;
      }
    }

    if (ep.mode === constants.GMA_ALARM_MODE_NONNOMINAL) {
      const { creationDate, closingDate } = groundMonitoringAlarm;
      const isNonNominal = (
        creationDate < visuWindow.current
        && (closingDate > visuWindow.current || !closingDate)
      );
      const isNominal = !isNonNominal;
      if (isNominal) {
        return;
      }
    }

    // Filter values out of interval but keep "REQUIREACK" Alarms
    const isOutOfTimeRange = timestamp < lower || timestamp > upper;
    if (isOutOfTimeRange && ackState !== constants.GMA_ALARM_ACKSTATE_REQUIREACK) {
      return;
    }

    const valueToInsert = {
      oid,
      timestamp,
      collapsed: true,
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
    epSubState[epName][oid] = valueToInsert;
  });

  // if no data, return empty state
  if (!Object.keys(epSubState[epName]).length) {
    return {};
  }

  return epSubState;
}
