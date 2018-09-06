/* eslint-disable no-continue, "DV6 TBC_CNES Perf. requires 'for', 'continue' avoid complexity" */
/* eslint-disable complexity, "DV6 TBC_CNES Perf. switch case" */
import _ from 'lodash/fp';
import _findIndex from 'lodash/findIndex';
import _cloneDeep from 'lodash/cloneDeep';
import _concat from 'lodash/concat';
import _each from 'lodash/each';
import _get from 'lodash/get';
// import { applyFilters } from '../../commonData/applyFilters';
import { convertData } from 'viewManager/commonData/convertData';

import {
  ALARM_ACKSTATE_REQUIREACK,
  ALARM_ACKSTATE_ACQUITED,
  ALARM_ACKSTATE_NOACK,
} from '../../../constants';

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
  // console.warn(viewId);
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

  if (!newState || !newState.indexes) {
    newState = { lines: {}, indexes: [] };
  }

  // loop on EP name to add payload sorted by oid in EP table
  for (let i = 0; i < epNames.length; i += 1) {
    const epName = epNames[i];

    // Update of EP data
    newState.lines = {
      ...newState.lines,
      ...payloads[epName],
    };
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

const getAckState = (alarm) => {
  let ackState = ALARM_ACKSTATE_NOACK;
  if (alarm.ackRequest) {
    ackState = ALARM_ACKSTATE_REQUIREACK;
    if (alarm.ackRequest && alarm.ackRequest.ack) {
      ackState = ALARM_ACKSTATE_ACQUITED;
    }
  }
  return ackState;
};

const createAlarm = (alarm, converter) => {
  const getOid = _.get('oid');
  const getParameterName = _.get('parameterName');
  const getParameterType = _.get('parameterType');
  const getSatellite = _.get('satellite');
  const getTelemetryType = _.get('telemetryType');
  const getTimestamp = _.get('groundMonitoringAlarm.referenceTimestamp');
  const getCreationDate = _.get('groundMonitoringAlarm.creationDate');
  const getClosingDate = _.get('groundMonitoringAlarm.closingDate');
  const getTransitions = _.getOr([], 'groundMonitoringAlarm.transitions');
  const getFirstTransition = _.compose(_.first, getTransitions);
  const getLastTransition = _.compose(_.last, getTransitions);
  const getFirstOccurence = _.compose(_.prop('onboardDate'), getFirstTransition);
  const getLastOccurence = _.compose(_.prop('onboardDate'), getLastTransition);
  const getAlarmType = _.compose(_.prop('monitoringState'), getLastTransition);
  const getRawValue = _.compose(_.prop('rawValue'), getLastTransition);
  const getPhysicalValue = _.compose(_.prop('extractedValue'), getLastTransition);
  return {
    ackState: getAckState(alarm),
    timestamp: converter(getTimestamp(alarm)),
    oid: converter(getOid(alarm)),
    parameterName: converter(getParameterName(alarm)),
    parameterType: converter(getParameterType(alarm)),
    satellite: converter(getSatellite(alarm)),
    telemetryType: converter(getTelemetryType(alarm)),
    creationDate: converter(getCreationDate(alarm)),
    closingDate: converter(getClosingDate(alarm)),
    duration: getClosingDate(alarm)
      ? converter({
        type: 'duration',
        value: getClosingDate(alarm).value - getCreationDate(alarm).value,
      })
      : converter({
        type: 'duration',
        value: Infinity,
      }),
    transitions: _.map(_.mapValues(converter), getTransitions(alarm)),
    firstOccurence: converter(getFirstOccurence(alarm)),
    lastOccurence: converter(getLastOccurence(alarm)),
    alarmType: converter(getAlarmType(alarm)),
    rawValue: converter(getRawValue(alarm)),
    physicalValue: converter(getPhysicalValue(alarm)),
  };
};

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
  // hotfix, crash of vima if visu window is undefined
  if (!visuWindow) {
    return {};
  }

  const epSubState = { [epName]: {} };

  // Loop on payload
  _each(tbdIdPayload, (currentValue) => {
    const groundMonitoringAlarm = currentValue.groundMonitoringAlarm;
    const oid = currentValue.oid;
    if (!oid || !groundMonitoringAlarm) {
      return;
    }

    const alarm = createAlarm(currentValue, convertData);

    epSubState[epName][oid] = {
      ...alarm,
      rawAlarm: createAlarm(currentValue, _.identity),
    };
  });

  // if no data, return empty state
  if (!Object.keys(epSubState[epName]).length) {
    return {};
  }
  return epSubState;
}
