import _each from 'lodash/each';
import _has from 'lodash/has';
import _get from 'lodash/get';
import _set from 'lodash/set';
import moment from 'moment';

import getLogger from 'common/log';
import globalConstants from 'common/constants';

const logger = getLogger('GPCCHS:data:lastValue');

// Get the nearest value from the current time
export function select(remoteIdPayload, ep, epName, viewSubState) {
  // Entry points on this remoteId
  const lower = ep.expectedInterval[0];
  const current = ep.expectedInterval[1];
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
      return logger.warn('get a payload without .referenceTimestamp key');
    }

    if (timestamp < lower || timestamp > current) {
      return;
    }
    if (timestamp >= previousTime) {
      // Write value depending on its typeof
      const type = _get(p, [ep.field, 'type']);
      let val;
      if (type === 'time') {
        val = moment(_get(p, [ep.field, 'value'])).format('YYYY-MM-DD HH[:]mm[:]ss[.]SSS');
      } else {
        val = _get(p, [ep.field, 'value']);
      }
      newValue = {
        timestamp,
        value: val,
        monit: _get(p, ['monitoringState', 'value']),
      };
      previousTime = timestamp;
    }
  });
  return newValue;
}

export default function extractValues(viewDataState, payload, viewId, entryPoints, count) {
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
    const newData = select(payload[ep.remoteId], ep, epName, currentSubState);
    if (!newData) {
      return;
    }
    if (!viewData) {
      viewData = {};
    }
    _set(viewData, ['index', epName], newData.timestamp);
    _set(viewData, ['values', epName], {
      value: newData.value,
      monit: newData.monit,
    });
    _set(viewData, ['structureType'], globalConstants.DATASTRUCTURETYPE_LAST);
    count.last += 1; // eslint-disable-line no-param-reassign
  });
  return viewData;
}
