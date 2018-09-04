/* eslint-disable no-continue,arrow-body-style */
// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// VERSION : 2.0.0 : DM : #7111 : 20/09/2017 : Update cols to show in history view
// VERSION : 2.0.0 : DM : #7111 : 20/09/2017 : Add editor in history view data and fix history view
//  data reducer
// VERSION : 2.0.0 : DM : #6127 : 20/09/2017 : Update of history view data store
// VERSION : 2.0.0 : DM : #7111 : 22/09/2017 : fix view data state update
// VERSION : 2.0.0 : DM : #7111 : 25/09/2017 : Add current in history view data
// VERSION : 2.0.0 : DM : #7111 : 27/09/2017 : Fix current search in history view data
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 14/11/2017 : Remove monitoring state colors mecanism + add
//  defult values for state colors + update unit tests + fix issue when removing a state color +
//  fix css code style
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import _forEach from 'lodash/forEach';
import _get from 'lodash/get';
import { convertData } from 'viewManager/commonData/convertData';
import getLogger from 'common/logManager';
import { getStateColorObj } from 'viewManager/commonData/stateColors';
import { applyFilters } from 'viewManager/commonData/applyFilters';
import {
  isRangeDataObsolete,
  rangesNeedUpdateForObsolete,
} from 'viewManager/common/store/viewDataUpdate';
import { injectTabularData } from '../../commonData/reducer';
import { getFlattenDataIdForObsoleteEvent } from '../../../common/flattenDataId';
import { STATE_COLOR_NOMINAL } from '../../../windowProcess/common/colors';

const logger = getLogger('data:rangeValues');

/**
 * Adds incoming range of data into the state
 *
 * @param state
 * @param viewId
 * @param payloads
 * @param historyConfig
 */
export function viewRangeAdd(state = {}, viewId, payloads, historyConfig) {
  const epKeys = Object.keys(payloads || {});
  if (!epKeys.length) {
    return state;
  }

  let updatedState = state;

  const epConnectedData = historyConfig.entryPoints.map(ep => ep.connectedData);

  const _connectedDataExists = (ep) => {
    for (const connectedData of epConnectedData) {
      if (_.isEqual(ep.connectedData, connectedData)) {
        return true;
      }
    }
    return false;
  };

  epKeys
    .filter((epName) => {
      const epConfig = historyConfig.entryPoints.find(ep => ep.name === epName);

      if (!epConfig) {
        return false;
      }

      return _connectedDataExists(epConfig);
    })
    .forEach(
      (ep) => {
        const obsoleteEvents = _.getOr([], ['obsoleteEvents', ep], updatedState);
        const timestamps = Object.keys(payloads[ep])
          .sort((a, b) => a - b);
        let lastObsoleteEventIndex = 0;
        const ranges = [];
        for (let i = 0; i < timestamps.length; i += 1) {
          const timestamp = timestamps[i];
          const nextTimestamp = timestamps[i + 1] || -1;
          const epConfig = historyConfig.entryPoints.find(epc => epc.name === ep);

          let currentValue = payloads[ep][timestamp];
          if (epConfig) {
            currentValue = {
              ...payloads[ep][timestamp],
              id: epConfig.id,
            };
          }
          const { isDataObsolete, lastComputedObsoleteEventIndex } = isRangeDataObsolete(
            timestamp,
            nextTimestamp,
            lastObsoleteEventIndex,
            obsoleteEvents
          );

          lastObsoleteEventIndex = lastComputedObsoleteEventIndex;
          const { color } = getStateColorObj(
            currentValue,
            epConfig.stateColors,
            _get(currentValue, 'monitoringState', STATE_COLOR_NOMINAL)
          );
          ranges.push({
            ...currentValue,
            isDataObsolete,
            color,
          });
        }

        updatedState =
          injectTabularData(
            updatedState,
            'history',
            ranges,
            null,
            historyConfig
          );

        // get indexes from history table
        // it must be link to data to avoid errors
        const indexes = updatedState.tables.history.data.map(range => range.masterTime);

        const _updatedIndexes =
          _.set(
            ep,
            indexes,
            _.get('indexes', updatedState)
          );

        const _updatedObsoleteEvents =
          _.set(
            ep,
            obsoleteEvents,
            _.get('obsoleteEvents')
          );

        updatedState = _.set('indexes', _updatedIndexes, updatedState);
        updatedState = _.set('obsoleteEvents', _updatedObsoleteEvents, updatedState);
      }
    );
  return updatedState;
}

export function viewObsoleteEventAdd(state = {}, payloads, entryPoints) {
  const obsoleteEventsFlatIds = Object.keys(payloads || {});
  const epNames = Object.keys(entryPoints || {});
  if (!obsoleteEventsFlatIds.length || !epNames.length) {
    // no data
    return state;
  }

  let updatedState = _.cloneDeep(state);

  _forEach(epNames, (epName) => {
    const { dataId } = entryPoints[epName];
    if (dataId) {
      const flattenDataId = getFlattenDataIdForObsoleteEvent(dataId);

      let lastRangeIndex = 0;
      const tbdIdPayload = payloads[flattenDataId];
      if (tbdIdPayload) {
        // ascending sort for master times
        const masterTimes = Object.keys(tbdIdPayload)
          .sort((a, b) => a - b);
        for (let i = 0; i < masterTimes.length; i += 1) {
          const timestamp = parseInt(masterTimes[i], 10);
          const { isDataObsolete, lastComputedIndex } = rangesNeedUpdateForObsolete(
            timestamp,
            _.getOr([], ['indexes', epName], updatedState),
            lastRangeIndex
          );
          if (isDataObsolete) {
            if (lastRangeIndex < _.getOr([], ['tables', 'history', 'data'], updatedState).length) {
              updatedState = _.set(['tables', 'history', 'data', lastRangeIndex, 'isDataObsolete'], isDataObsolete, updatedState);
            }

            const currentValue = _.getOr([], ['tables', 'history', 'data', lastRangeIndex], updatedState);
            const { color } = getStateColorObj(
              currentValue,
              entryPoints[epName].stateColors,
              _get(currentValue, 'monitoringState', STATE_COLOR_NOMINAL)
            );

            if (lastRangeIndex < _.getOr([], ['tables', 'history', 'data'], updatedState).length) {
              updatedState = _.set(['tables', 'history', 'data', lastRangeIndex, 'color'], color, updatedState);
            }
          }
          lastRangeIndex = lastComputedIndex;
        }
        const obsoleteEvents = _.getOr([], ['obsoleteEvents', epName], updatedState);
        updatedState = _.set(['obsoleteEvents', epName], obsoleteEvents.concat(masterTimes), updatedState);
      }
    }
  });
  return updatedState;
}

/* ************************************
 * Select payload to add for current view
 * @param: current view data map
 * @param: intervals for all entry Points
 * @param: received data
 * @return: payloads to use per EP
/* *********************************** */
export function selectDataPerView(currentViewMap, intervalMap, payload) {
  let epSubState = {};
  if (currentViewMap) {
    Object.keys(currentViewMap.entryPoints)
      .forEach((epName) => {
        const ep = currentViewMap.entryPoints[epName];
        // No payload for this tbd  Id
        if (!payload[ep.tbdId]) {
          return;
        }
        const newSubState = selectEpData(payload[ep.tbdId], ep, epName, intervalMap);
        epSubState = {
          ...epSubState,
          ...newSubState,
        };
      });
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
  const newState = {};

  // Loop on payload timestamps
  for (let i = 0; i < timestamps.length; i += 1) {
    const currentValue = tbdIdPayload[timestamps[i]];
    const timestamp = _get(currentValue, ['referenceTimestamp', 'value']);
    if (typeof timestamp === 'undefined') {
      logger.warn('get a payload without .referenceTimestamp key ggg', tbdIdPayload);
      continue;
    }
    // check value is in interval
    if (timestamp < lower || timestamp > upper) {
      continue;
    }
    // check value verify filters
    if (!applyFilters(currentValue, ep.filters)) {
      continue;
    }
    const masterTime = timestamp + ep.offset;
    let valueToInsert = {
      masterTime,
      epName,
      ...getStateColorObj(
        currentValue,
        ep.stateColors,
        _get(currentValue, 'monitoringState.value', STATE_COLOR_NOMINAL)
      ),
    };
    const fields = Object.keys(currentValue);
    for (let iField = 0; iField < fields.length; iField += 1) {
      valueToInsert = {
        ...valueToInsert,
        [fields[iField]]: convertData(currentValue[fields[iField]]),
      };
    }

    if (!newState[epName]) {
      newState[epName] = {};
    }
    newState[epName][masterTime] = valueToInsert;
  }
  return newState;
}
