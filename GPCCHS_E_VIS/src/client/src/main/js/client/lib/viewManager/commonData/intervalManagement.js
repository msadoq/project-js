// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : DataMap simplification : removing structureType
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move common/intervals module in client sub-component
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// VERSION : 1.1.2 : DM : #6700 : 23/06/2017 : First draft implementation of dataRequesting management on server
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : First draft implementation of dataRequesting management on server
// END-HISTORY
// ====================================================================

import mergeInterval from 'common/intervals/merge';
import missingIntervals from 'common/intervals/missing';

export function addInterval(knownIntervals, interval) { // TODO deprecate, just a proxy for mergeInterval
  return mergeInterval(knownIntervals, interval);
}

export function retrieveNeededIntervals(knownInterval, interval) {
  return (knownInterval)
    ? missingIntervals([knownInterval], interval)
    : [interval];
}
