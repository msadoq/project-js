// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 22/03/2017 : Update viewData organization for last structure + cleaning
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : converts long to string to ensure precision
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Remove viewManager utils folder .
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and un-needed relaxations
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : Fix crash when a textView EP has an invalid field
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : fix editor opening per view and rename longData to convertData
// VERSION : 1.1.2 : DM : #5828 : 14/04/2017 : Move filter application in main process
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #7111 : 03/07/2017 : Add config parameter VISU_WINDOW_MAX_DURATION to limit visuWindow per view
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Major changes : all data consumption is now plugged
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 24/08/2017 : Fixed few eslint errors / warnings no-console and spaced-comment.
// END-HISTORY
// ====================================================================

/* eslint-disable no-continue, "DV6 TBC_CNES Perf. requires 'for', 'continue' avoid complexity" */
import _get from 'lodash/get';
import getLogger from '../../../common/logManager';
import { getStateColorObj } from '../../commonData/stateColors';
import { convertData } from '../../commonData/convertData';
import { applyFilters } from '../../commonData/applyFilters';

const logger = getLogger('data:lastValue');

/* ************************************
 * Select payload to add for current view
 * @param: current view data map
 * @param: intervals for all entry Points
 * @param: received data
 * @return: updated state
/* *********************************** */
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
      if (timestamp >= previousTime) {
        // Long conversion
        newValue = {
          timestamp,
          value: {
            value: convertData(p[ep.field]),
            ...getStateColorObj(p, ep.stateColors, _get(p, ['monitoringState', 'value'])),
          },
        };
        previousTime = timestamp;
      }
    }
    if (newValue) {
      epSubState = {
        index: { ...epSubState.index, [epName]: newValue.timestamp },
        values: { ...epSubState.values, [epName]: newValue.value },
      };
    }
  }
  return epSubState;
}

export function viewDataUpdate(viewDataState, payload) {
  if (!payload || !payload.values || !Object.keys(payload.values).length) {
    return viewDataState;
  }
  return {
    index: { ...viewDataState.index, ...payload.index },
    values: { ...viewDataState.values, ...payload.values },
  };
}
