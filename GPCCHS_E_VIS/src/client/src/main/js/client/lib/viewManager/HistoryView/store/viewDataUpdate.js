/* eslint-disable no-continue */
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

import _get from 'lodash/get';
import { convertData } from 'viewManager/commonData/convertData';
import getLogger from 'common/logManager';
import { getStateColorObj } from 'viewManager/commonData/stateColors';
import { applyFilters } from 'viewManager/commonData/applyFilters';
import { injectData } from '../../commonData/reducer';

const logger = getLogger('data:rangeValues');

/**
 * Add an incoming range of data into the state
 *
 * @param state
 * @param viewId
 * @param payloads
 * @returns {*}
 */
export function viewRangeAdd(state = {}, viewId, payloads) {
  const epKeys = Object.keys(payloads || {});
  if (!epKeys.length) {
    return state;
  }

  let updatedState = state;

  Object.keys(payloads).forEach(
    (ep) => {
      const range = Object.keys(payloads[ep]).map(timestamp => payloads[ep][timestamp]);
      updatedState = injectData(updatedState, 'history', range);
    }
  );

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
    Object.keys(currentViewMap.entryPoints).forEach((epName) => {
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
      ...getStateColorObj(currentValue, ep.stateColors),
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
