import _ from 'lodash';
import { createSelector } from 'reselect';

/**
 * Returns the entryPoints map for a given view:
 *
 * {
 *   'name': {
 *     'remoteId': [localId]
 *   }
 * }
 *
 * @param state
 * @param props
 * @return object
 */

export default function makeEntryPointsMap() {
  return createSelector([

  ], () => {
    // TODO
    // => map the remoteIds/localIds for a given view (memoized selector)
    // => retrieve corresponding dataCaches (memoized selector)
    // => merge each dataCache to return { 'name' : value } or { 'name' : {x: value, y: value} }
  });
}

// const getView = (state, props) => _.get(state, ['views', props.viewId]);
// // const getTimebar = (state, props) => _.get(state, ['timebars', props.timebarId]);
// const getTimebarId = (state, props) => props.timebarId;
//
// const getViewConnectedData = createSelector(
//   [getView, getTimebarId],
//   (view, timebarId) => {
//     const { type, configuration } = view;
//     if (!configuration) {
//       return undefined;
//     }
//
//     return { type, timebarId, connectedData: getConnectedDataFromState(type, configuration) };
//   }
// );
//
// /**
//  * Creates an entryPoints map for view:
//  *
//  * {
//  *   'name': {
//  *      remoteId: [
//  *        localId,
//  *      ]
//   *   }
//  * }
//  *
//  * @param viewId
//  * @return object
//  */
// export const makeEntryPointsMap = () => createSelector(
//   [
//     getDomains,
//     getTimebars,
//     getTimelines,
//     getViewConnectedData,
//   ],
//   (domains, timebars, timelines, cds) => {
//     // TODO memoize formula parsing (formula)
//     // TODO memoize domains search (redux domains, search)
//     // TODO memoize sessions search (redux timebarTimelines, redux timelines, search)
//     return decorate(domains, timebars, timelines, [cds]);
//   }
// );
