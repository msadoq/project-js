/* eslint-disable no-continue, "DV6 TBC_CNES Perf. requires 'for', 'continue' avoid complexity" */
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import _last from 'lodash/last';
import _pick from 'lodash/pick';
import _findIndex from 'lodash/findIndex';
import _findLastIndex from 'lodash/findLastIndex';
import _pickBy from 'lodash/pickBy';
import _union from 'lodash/union';
import _map from 'lodash/map';
import getLogger from '../../../common/logManager';
import * as constants from '../../../constants';

const logger = getLogger('view:OnBoardAlarmView:cleanViewData');

/* ************************************************
 * Clean viewData for current viewData
 * @param currentState view data State
 * @param oldViewFromMap current view definition
 * @param newViewFromMap current view definition
 * @param oldIntervals expected intervals for all entry points
 * @param newIntervals expected intervals for all entry points
 * @return cleaned state for current view
/** *********************************************** */
export default function cleanCurrentViewData(
  currentState,
  oldViewFromMap,
  newViewFromMap,
  oldIntervals,
  newIntervals
) {
  // Check if viewMap has changed
  if (_isEqual(newViewFromMap, oldViewFromMap) && _isEqual(oldIntervals, newIntervals)) {
    return currentState;
  }
  // new visible view
  if (!oldViewFromMap || !currentState) {
    return currentState;
  }
  // invisible view
  if (!newViewFromMap) {
    return null;
  }
  // entry point updates
  const oldEntryPoints = oldViewFromMap.entryPoints;
  const newEntryPoints = newViewFromMap.entryPoints;
  const epNames = Object.keys(oldEntryPoints);
  // only one entry point is displayed in a OnBoard alarm view
  if (epNames.length !== 1) {
    return currentState;
  }
  const epName = epNames[0];
  const oldEp = oldEntryPoints[epName];
  const newEp = newEntryPoints[epName];

  // removed entry point if invalid
  // EP definition modified: remove entry point from viewData
  if (isInvalidEntryPoint(oldEp, newEp)) {
    return null;
  }
  // Case of point already in error
  if (newEp.error) {
    return currentState;
  }
  let newState = currentState;
  // update on expected interval
  // If EP is valid, old and new tbdId are the same
  // Consider new localId to take into account offset modification
  const oldInterval = _get(oldIntervals, [oldEp.tbdId, oldEp.localId, 'expectedInterval']);
  const newInterval = _get(newIntervals, [oldEp.tbdId, newEp.localId, 'expectedInterval']);
  if (!newInterval || oldEp.localId !== newEp.localId) {
    return null;
  } else if (oldInterval &&
    (oldInterval[0] !== newInterval[0] || oldInterval[1] !== newInterval[1])) {
    const lower = newInterval[0] + newEp.offset;
    const upper = newInterval[1] + newEp.offset;
    newState = removeViewDataOutOfBounds(newState, lower, upper);
  }

  return newState;
}

function isInvalidEntryPoint(oldEp, newEp) {
  if (!newEp || (newEp.error && newEp.error !== oldEp.error)
    || oldEp.tbdId !== newEp.tbdId) {
    return true;
  }
  return false;
}

/**
 * Get all alarms requiring an ack
 * @param  {object} viewData
 * @return {array}  array of filtered indexes
 */
function getRequireAckIndexes(viewData) {
  const requireAckAlarms = _pickBy(viewData.lines, alarm => (
    alarm.ackState === constants.OBA_ALARM_ACKSTATE_REQUIREACK
  ));

  return _map(requireAckAlarms, viewDataAlarm => viewDataAlarm.oid);
}

/**
 * (Immutable) remove data out of [lower, upper] time range from viewData
 *
 * @param  {Object} viewData
 * @param  {number} lower    lower timestamp
 * @param  {number} upper    upper timestamp
 *
 * @return {Object}          The computed viewdata
 */
function removeViewDataOutOfBounds(viewData, lower, upper) {
  if (lower > upper) {
    logger.warn('Received invalid bounds');
    return null;
  }

  // --- Keep everything --- //

  // state contains no data
  if (!viewData || !viewData.indexes || !viewData.indexes.length) {
    return viewData;
  }

  // All points of entryPoint are in visuWindow
  const firstTimestamp = viewData.lines[viewData.indexes[0]].timestamp;
  const lastTimestamp = viewData.lines[_last(viewData.indexes)].timestamp;
  if (firstTimestamp >= lower && lastTimestamp <= upper) {
    return viewData;
  }

  // --- Drop everything but alarms requiring ack --- //

  if (firstTimestamp > upper || lastTimestamp < lower) {
    const newIndexes = getRequireAckIndexes(viewData);
    const newLines = _pick(viewData.lines, newIndexes);

    return {
      lines: newLines,
      indexes: newIndexes,
    };
  }

  // --- Keep some --- //
  const iLower = _findIndex(viewData.indexes, searchOid => (
    viewData.lines[searchOid].timestamp >= lower
  ));
  let iUpper = _findLastIndex(viewData.indexes, searchOid => (
    viewData.lines[searchOid].timestamp <= upper
  ));
  iUpper = (iUpper === -1) ? viewData.lines.length - 1 : iUpper;

  let newIndexes = viewData.indexes.slice(iLower, iUpper + 1);
  newIndexes = _union(newIndexes, getRequireAckIndexes(viewData)).sort((a, b) => (
    viewData.lines[a].timestamp - viewData.lines[b].timestamp
  ));
  const newLines = _pick(viewData.lines, newIndexes);

  return {
    lines: newLines,
    indexes: newIndexes,
  };
}
