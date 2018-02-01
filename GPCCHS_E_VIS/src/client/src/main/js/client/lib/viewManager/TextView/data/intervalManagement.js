// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : remove structure last and range
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : DataMap simplification : removing structureType
// END-HISTORY
// ====================================================================

// export function addInterval(knownIntervals, interval) {
//   // TODO factorize or replace with existing function (rperrot)
//   const existing = _find(knownIntervals, i => i[0] === interval[0] && i[1] === interval[1]);
//   if (existing) {
//     return knownIntervals;
//   }
//
//   return [...knownIntervals, interval];
// }

export default function getExpectedInterval(lower, current) {
  return [lower, current];
}

// export function retrieveNeededIntervals(knownInterval, interval) {
//   return (!knownInterval || knownInterval[0] !== interval[0] || knownInterval[1] !== interval[1])
//     ? [interval]
//     : [];
// }
