// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 22/03/2017 : Update viewData organization for last structure +
//  cleaning
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : converts long to string to ensure precision
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Remove viewManager utils folder .
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and
//  un-needed relaxations
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : Fix crash when a textView EP has an invalid field
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : fix editor opening per view and rename longData to
//  convertData
// VERSION : 1.1.2 : DM : #5828 : 14/04/2017 : Move filter application in main process
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #7111 : 03/07/2017 : Add config parameter VISU_WINDOW_MAX_DURATION to
//  limit visuWindow per view
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Major changes : all data consumption is now plugged
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 24/08/2017 : Fixed few eslint errors / warnings no-console
//  and spaced-comment.
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 14/11/2017 : Remove monitoring state colors mecanism + add
//  defult values for state colors + update unit tests + fix issue when removing a state color +
//  fix css code style
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-1937 : 30/01/2018 : Unit convertion, add python fork and
//  convertion call mechanism
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 31/01/2018 : surveillance du monitoringState pour
//  parametres TM VIMA
// END-HISTORY
// ====================================================================

/* eslint-disable no-continue, "DV6 TBC_CNES Perf. requires 'for', 'continue' avoid complexity" */
import _get from 'lodash/get';
import _ from 'lodash/fp';
import getLogger from 'common/logManager';
import { getStateColorObj } from 'viewManager/commonData/stateColors';
import { convertData } from 'viewManager/commonData/convertData';
import { applyFilters } from 'viewManager/commonData/applyFilters';
import _cloneDeep from 'lodash/cloneDeep';
import _isEmpty from 'lodash/isEmpty';
import _forEach from 'lodash/forEach';
import _findIndex from 'lodash/findIndex';
import { getFlattenDataIdForObsoleteEvent } from '../../../common/flattenDataId';

const logger = getLogger('data:lastValue');

/* ************************************
 * Select payload to add for current view
 * @param: current view data map
 * @param: intervals for all entry Points
 * @param: received data
 * @return: updated state
/* *********************************** */
// eslint-disable-next-line complexity
export function selectDataPerView(currentViewMap, intervalMap, payload, viewSubState) {
  let epSubState = {};
  if (!currentViewMap) {
    return epSubState;
  }
  const epNames = Object.keys(currentViewMap.entryPoints);
  for (let i = 0; i < epNames.length; i += 1) {
    const epName = epNames[i];
    const ep = currentViewMap.entryPoints[epName];
    // Entry points on this tbdId
    const { tbdId, localId } = ep;
    const tbdIdPayload = payload[tbdId];
    if (!tbdIdPayload) {
      continue;
    }
    const expectedInterval = _get(intervalMap, [tbdId, localId, 'expectedInterval']);
    // case of error when visuWindow duration is too long
    if (!expectedInterval) {
      return {};
    }
    const lower = expectedInterval[0];
    const current = expectedInterval[1];

    // previous time recorded
    let previousTime = 0;
    if (viewSubState && viewSubState.index[epName]) {
      if (viewSubState.index[epName] < current) {
        previousTime = viewSubState.index[epName];
      }
    }
    let newValue;
    // search over payloads
    const timestamps = Object.keys(tbdIdPayload);
    for (let j = 0; j < timestamps.length; j += 1) {
      const p = tbdIdPayload[timestamps[j]];
      const timestamp = _get(p, ['referenceTimestamp', 'value']);
      if (typeof timestamp === 'undefined') {
        logger.warn('get a payload without .referenceTimestamp key');
        continue;
      }
      if (timestamp < lower || timestamp > current) {
        continue;
      }
      // invalid or missing field
      if (!p[ep.field]) {
        continue;
      }
      // check value verify filters
      if (!applyFilters(p, ep.filters)) {
        continue;
      }
      const valueComputed = (ep.convertTo && p.gpinuc && p.gpinuc[ep.field]) ?
        convertData(p.gpinuc[ep.field][ep.convertTo]) :
        convertData(p[ep.field]);

      const isDataObsolete =
        isLastDataObsolete(timestamp, viewSubState.obsoleteEvents, epName, current);

      if (timestamp >= previousTime) {
        // Long conversion
        newValue = {
          timestamp,
          value: {
            value: valueComputed,
            ...getStateColorObj( // will fetch default / fallback / custom color
              p,
              ep.stateColors,
              _get(p, 'monitoringState.value')
            ),
            isDataObsolete,
            validityState: p.validityState,
          },
        };
        previousTime = timestamp;
      }
    }
    if (newValue) {
      epSubState = {
        index: { ...epSubState.index, [epName]: newValue.timestamp },
        values: { ...epSubState.values, [epName]: newValue.value },
        obsoleteEvents: viewSubState.obsoleteEvents,
      };
    }
  }
  return epSubState;
}

export function viewObsoleteEventAdd(state = {}, payloads, entryPoints, current) {
  const obsoleteEventsFlatIds = Object.keys(payloads || {});
  const epNames = Object.keys(entryPoints || {});
  if (!obsoleteEventsFlatIds.length || !epNames.length) {
    // no data
    return state;
  }
  let newState;
  if (_isEmpty(state)) {
    newState = {
      indexes: {},
      values: {},
      obsoleteEvents: {},
    };
  } else {
    newState = _cloneDeep(state);
    newState.obsoleteEvents = newState.obsoleteEvents || {};
  }

  _forEach(epNames, (epName) => {
    const { dataId } = entryPoints[epName];
    if (dataId) {
      const flattenDataId = getFlattenDataIdForObsoleteEvent(dataId);
      const tbdIdPayload = payloads[flattenDataId];
      if (tbdIdPayload) {
        if (!newState.obsoleteEvents[epName]) {
          newState.obsoleteEvents[epName] = { eventDate: 0 };
        }
        const lastDataTimestamp = _.getOr(0, ['index', epName], newState);
        // ascending sort for master times
        const masterTimes = Object.keys(tbdIdPayload)
          .sort((a, b) => a - b);
        // compute last obsolete event date to compare it with the last data timestamp
        const newLastObsoleteEvent =
          masterTimes.filter(
            masterTime => masterTime >= lastDataTimestamp && masterTime <= current
          )[0];
        if (newLastObsoleteEvent) {
          // persist the last obsolete event data fetch between last data timestamp and current timestamp
          newState.obsoleteEvents[epName].eventDate = newLastObsoleteEvent;
          // compute the new state color for the last data
          newState.values[epName] = {
            ...newState.values[epName],
            isDataObsolete: true,
            ...getStateColorObj( // will fetch default / fallback / custom color
              {
                isDataObsolete: true,
                validityState: newState.values[epName].validityState,
              },
              entryPoints[epName].stateColors
            ),
          };
        }
      }
    }
  });
  return newState;
}

/**
 * @param timestamp, for last data
 * @param obsoleteEvents
 * @param epName, entry point name for last data
 * @return {boolean}
 */
export function isLastDataObsolete(
  timestamp,
  obsoleteEvents,
  epName,
  current
) {
  if (obsoleteEvents && obsoleteEvents[epName]) {
    return timestamp < obsoleteEvents[epName].eventDate &&
      obsoleteEvents[epName].eventDate < current;
  }
  return false;
}

export const isRangeDataObsolete =
  (timestamp, nextTimestamp, lastIndex, indexes) => {
    let isDataObsolete = false;
    let lastComputedIndex = 0;

    if (indexes.length) {
      lastComputedIndex = lastIndex !== -1 ?
        _findIndex(indexes, t => t >= timestamp, lastIndex) :
        lastIndex;
      // it is the last range timestamp from payloads
      if (nextTimestamp === -1) {
        isDataObsolete = lastComputedIndex !== -1;
      } else if (lastComputedIndex !== -1 &&
        indexes[lastComputedIndex] < nextTimestamp) {
        isDataObsolete = true;
      }
    }

    return {
      isDataObsolete,
      lastComputedIndex,
    };
  };


export const rangesNeedUpdateForObsolete =
  (timestamp, rangesIndexes, lastIndex) => {
    let isDataObsolete = false;
    let lastComputedIndex = lastIndex;

    if (rangesIndexes && rangesIndexes.length) {
      const nonSortedArray = [...rangesIndexes];
      rangesIndexes.sort((a, b) => a - b);
      const tmpIndex = _findIndex(rangesIndexes, t => t >= timestamp) - 1;
      const rangeTimestamp = rangesIndexes[tmpIndex];
      lastComputedIndex = tmpIndex !== -1 ? nonSortedArray.indexOf(rangeTimestamp) : tmpIndex;
      if (lastComputedIndex !== -1) {
        isDataObsolete = true;
      } else if (lastComputedIndex === -1 && timestamp > rangesIndexes[lastComputedIndex]) {
        isDataObsolete = true;
      }
    }

    return {
      lastComputedIndex,
      isDataObsolete,
    };
  };


export const rangesNeedObsoleteDataUpdate =
  (rangesIndexes, timestamp, lastRangeIndex) => {
    let isDataObsolete = false;
    let newLastRangeIndex = lastRangeIndex;
    if (lastRangeIndex + 1 >= 0) {
      const index = _findIndex(rangesIndexes, t => t >= timestamp, lastRangeIndex);
      newLastRangeIndex = index;
      if (index >= 0) {
        isDataObsolete = true;
      }
    }
    return {
      newLastRangeIndex,
      isDataObsolete,
    };
  };

export function viewDataUpdate(viewDataState, payload) {
  if (!payload || !payload.values || !Object.keys(payload.values).length) {
    return viewDataState;
  }
  return {
    index: { ...viewDataState.index, ...payload.index },
    values: { ...viewDataState.values, ...payload.values },
    obsoleteEvents: { ...viewDataState.obsoleteEvents, ...payload.obsoleteEvents },
  };
}
