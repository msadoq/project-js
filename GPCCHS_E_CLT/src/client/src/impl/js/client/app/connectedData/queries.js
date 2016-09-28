import _ from 'lodash';
import missingIntervals from '../utils/intervals';

/**
 * Apply missing interval logic on connectedData and returns a list of query to pass to HSS
 *
 * @param viewId
 * @param connectedDatum
 * @param prevInterval
 * @param nextInterval
 */
export default function queries(viewId, { localId, dataId, offset }, prevInterval, nextInterval) {
  // TODO TEST
  // TODO handle view type to request only needed value (everything for plot, lower->current for text)
  if (!localId) {
    return [];
  }

  const missing = missingIntervals(
    prevInterval ? [prevInterval.lower + offset, prevInterval.upper + offset] : [],
    [nextInterval.lower + offset, nextInterval.upper + offset]
  );

  if (!missing.length) {
    return [];
  }

  return _.map(missing, (interval) => ({
    viewId,
    localId,
    dataId,
    interval,
  }));
}

// // TODO improve forView/forWindow and return {localId: {...}}
// const prev = _.reduce(props.connectedData, (list, cd) => {
//   return Object.assign({}, list, { [cd.localId]: _.omit(cd, 'localId') });
// }, {});
// const next = _.reduce(nextProps.connectedData, (list, cd) => {
//   return Object.assign({}, list, { [cd.localId]: _.omit(cd, 'localId') });
// }, {});

// determine which connected data has disappeared
// const prevKeys = Object.keys(prev);
// const nextKeys = Object.keys(next);
// const toAdd = _.difference(nextKeys, prevKeys);
// const toRemove = _.difference(prevKeys, nextKeys);
// console.log('TOADD', toAdd);
// console.log('TOREMOVE', toRemove);
// TODO remove from state (???)
// determine missing interval for each connectedData
// TODO
//   - call view type method to determine expected interval (computeExpectedInterval(connectedData))
//   - make diff between state interval (displayed or already required)
//   - dataQuery missing interval
//   - dataQuery add requested interval in state
//   - add clear comment to explain that master timeline has offset=0 (so no need to know master)
