import _each from 'lodash/each';
import _has from 'lodash/has';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEqual from 'lodash/isEqual';
import moment from 'moment';

import getLogger from 'common/log';
import globalConstants from 'common/constants';

import { getStateColorObj } from '../common/stateColors';

const logger = getLogger('data:lastValue');

// Get the nearest value from the current time
export function select(remoteIdPayload, ep, epName, viewSubState, viewType, intervalMap) {
  // Entry points on this remoteId
  const { remoteId, localId } = ep;
  const expectedInterval = _get(intervalMap, [remoteId, localId, 'expectedInterval']);

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
  _each(remoteIdPayload, (p) => {
    const timestamp = _get(p, ['referenceTimestamp', 'value']);
    if (typeof timestamp === 'undefined') {
      logger.warn('get a payload without .referenceTimestamp key');
      return;
    }

    if (timestamp < lower || timestamp > current) {
      return;
    }
    if (timestamp > previousTime) {
      if (viewType === 'TextView') {
        // Write value depending on its typeof
        const type = _get(p, [ep.field, 'type']);
        let val;
        if (type === 'time') {
          val = moment(_get(p, [ep.field, 'value'])).format('YYYY-MM-DD HH[:]mm[:]ss[.]SSS');
        } else if (type === 'enum') {
          val = _get(p, [ep.field, 'symbol']);
        } else {
          val = _get(p, [ep.field, 'value']);
        }
        newValue = {
          timestamp,
          value: val,
          ...getStateColorObj(p, ep.stateColors, _get(p, ['monitoringState', 'value'])),
        };
      } else { // Case of Dynamic View
        newValue = {
          timestamp,
          value: p,
        };
      }
      previousTime = timestamp;
    } else if (timestamp === previousTime) {
      // Update the value if it is different
      if (viewType === 'TextView') {
        const type = _get(p, [ep.field, 'type']);
        let val;
        if (type === 'time') {
          val = moment(_get(p, [ep.field, 'value'])).format('YYYY-MM-DD HH[:]mm[:]ss[.]SSS');
        } else if (type === 'enum') {
          val = _get(p, [ep.field, 'symbol']);
        } else {
          val = _get(p, [ep.field, 'value']);
        }
        if (viewSubState.values[epName] === val) {
          return;
        }
        newValue = {
          timestamp,
          value: val,
          ...getStateColorObj(p, ep.stateColors, _get(p, ['monitoringState', 'value'])),
        };
      } else {
        if (_isEqual(viewSubState.values[epName].value, p)) {
          return;
        }
        newValue = {
          timestamp,
          value: p,
        };
      }
    }
  });
  return newValue;
}

export default function extractValues(
  viewDataState,
  intervalMap,
  payload,
  viewId,
  entryPoints,
  viewType
) {
  let viewData;
  // Entry points
  _each(entryPoints, (ep, epName) => {
    // No payload for this remote Id
    if (!_has(payload, ep.remoteId)) {
      return;
    }
    // Get current state for update
    const currentSubState = _get(viewDataState, [viewId]);
    // compute new data
    const newData =
      select(payload[ep.remoteId], ep, epName, currentSubState, viewType, intervalMap);
    if (!newData) {
      return;
    }
    if (!viewData) {
      viewData = {};
    }
    _set(viewData, ['index', epName], newData.timestamp);
    _set(viewData, ['values', epName], {
      value: newData.value,
    });
    if (newData.color) {
      _set(viewData, ['values', epName, 'color'], newData.color);
    }
    viewData.type = viewType;
    viewData.structureType = globalConstants.DATASTRUCTURETYPE_LAST;
  });
  return viewData;
}
