import { each, get } from 'lodash';
import { createSelector } from 'reselect';

import vivl from '../VIVL/main';
import decline from './declineEntryPoint';

const getDomains = state => state.domains;
const getCache = state => state.dataCache;
const getTimebars = state => state.timebars;
const getTimelines = state => state.timelines;
const getViews = state => state.views;
const getView = (state, { viewId }) => getViews(state)[viewId];

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

// TODO : handle simple plot
// TODO : handle simple text
// TODO : handle wildcard multi lines
// TODO : handle parametric plot
export default function makeEntryPointsMap() {
  return createSelector([
    getDomains,
    getTimebars,
    getTimelines,
    getCache,
    (state, { timebarId }) => timebarId,
    getView,
  ], (domains, timebars, timelines, cache, timebarId, view) => {
    // get entryPoints by names
    const entryPoints = vivl(view.type, 'entryPointsMapFromState')(view.configuration);

    // TODO: get invalids for textview

    const map = {};

    each(entryPoints, (ep, name) => {
      if (view.type === 'PlotView') {
        const data = getDataFromState(state, configuration);
        /**
         * TO SUPPORT MULTI LINE WE SHOULD GET A PLOT VIEW DATA MAP WITH:
         * {
         *   'name(1)': { x: ..., y: ... },
         *   'name(2)': { x: ..., y: ... },
         *   'other name': { x: ..., y: ... },
         * }
         */

        // each(x, (localIds, remoteId) => {
          // each(localIds, (localId) => {
          //   // TODO : multi-line
          //   const x = decline(domains, timebars, timelines, view.type, timebarId, ep.x);
          //   const y = decline(domains, timebars, timelines, view.type, timebarId, ep.y);
          //
          //   cacheX = get(cache, [remoteId, localId, 'data'], []);
          //   cacheY = get(cache, [remoteId, localId, 'data'], []);
          //   if (!cacheX.length || !cacheY.length) {
          //     return;
          //   }
          //
          //   const data = cacheX.reduce((list, timestamp, referenceTime) => {
          //     const value = cacheY[referenceTime];
          //     if (!value) {
          //       return list;
          //     }
          //
          //     return list.concat(value);
          //   }, []);
          //
          //   map[name] = data; // TODO : multi-line
          // });
        // });
      } else if (view.type === 'TextView') {
        // const value = '';
        // map[name] = value;
        // TODO GET CACHE
        console.log('entryPointsMap NOW GET CACHE FOR', ep);
      }
    });

    // => map the remoteIds/localIds for a given view (memoized selector)
    // => retrieve corresponding dataCaches (memoized selector)
    // => merge each dataCache to return { 'name' : value } or { 'name' : {x: value, y: value} }
    return map;
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
