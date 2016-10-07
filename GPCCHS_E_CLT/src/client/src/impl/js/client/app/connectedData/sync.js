const _ = require('lodash');
import { createSelector } from 'reselect';
import external from '../../external.main';

import { getWebsocket } from '../websocket/mainWebsocket';

import { addRequest } from '../store/actions/dataRequests';
import { getStore } from '../store/mainStore';

import missingIntervals from '../connectedData/missingIntervals';
import { mergeIntervals } from '../connectedData/intervals';

import formulaParser from './formula';
import remoteIdGenerator from './remoteId';
import localIdGenerator from './localId';
import domainsFilter from './domains';
import timelinesFilter from './sessions';

const getDomains = state => state.domains;
const getTimebars = state => state.timebars;
const getTimelines = state => state.timelines;
const getWindows = state => state.windows;
const getPages = state => state.pages;
const getViews = state => state.views;

const getWindowsFocusedPageIds = createSelector(
  [getWindows],
  windows => _.reduce(windows, (list, w) => {
    if (!w.focusedPage) {
      return list;
    }

    return list.concat(w.focusedPage);
  }, [])
);

const getWindowsFocusedPage = createSelector(
  [getWindowsFocusedPageIds, getPages],
  (pageIds, pages) => _.reduce(pageIds, (list, pageId) => {
    if (!pages[pageId]) {
      return list;
    }

    return list.concat(pages[pageId]);
  }, [])
);

const getWindowsVisibleViewIds = createSelector(
  [getWindowsFocusedPage],
  pages => _.reduce(pages, (list, page) => {
    if (!page.views || !page.views.length) {
      return list;
    }
    if (!page.timebarId) {
      return list;
    }

    return list.concat({ timebarId: page.timebarId, viewIds: page.views});
  }, [])
);

const getWindowsVisibleViews = createSelector(
  [getWindowsVisibleViewIds, getViews],
  (pages, views) => _.reduce(pages, (list, { timebarId, viewIds }) => {
    return _.reduce(viewIds, (list, viewId) => {
      if (!views[viewId]) {
        return list;
      }

      return list.concat({ viewId, timebarId, viewData: views[viewId] });
    }, []);
  }, [])
);

const getVisibleConnectedData = createSelector(
  [getWindowsVisibleViews],
  (views) => _.reduce(views, (list, view) => {
    if (!view.viewData) {
      return list;
    }

    const { timebarId } = view;
    const { type, configuration } = view.viewData;
    if (!configuration) {
      return list;
    }

    const selector = _.get(external, [type, 'getConnectedDataFromState']);
    if (!_.isFunction(selector)) {
      return list;
    }

    const connectedData = selector(configuration);
    return list.concat({ type, timebarId, connectedData });
  }, [])
);

const getVisibleRemoteIds = createSelector(
  [
    getDomains,
    getTimebars,
    getTimelines,
    getVisibleConnectedData,
  ],
  (domains, timebars, timelines, cds) => {
    // TODO memoize formula parsing (formula)
    // TODO memoize domains search (redux domains, search)
    // TODO memoize sessions search (redux timebarTimelines, redux timelines, search)
    // _.each(cds, ({ type, timebarId, connectedData }) => {
    // //   console.log(
    // //     cd, timebarId,
    // //     // cd.formula,
    // //     // cd.filter,
    // //     // cd.domain,
    // //     // cd.timeline,
    // //     // type,
    // //     //formula.field,
    // //     // timeline.offset
    // //     '=='
    // //   );
    // //   // remoteIds
    // //   // cd.formula, cd.filter, cd.domain, cd.timeline
    // //   // localId
    // //   // viewData.type, formula.field, timeline.offset
    // });
    return decorate(domains, timebars, timelines, cds);
  }
);

// TODO memoized and/or getTimebarWithTimelines as compound selector of getVisibleRemoteIds
function getTimebarTimelines(timebars, timelines, timebarId) {
  const timebarTimelines = _.get(timebars, [timebarId, 'timelines']);
  return _.reduce(timebarTimelines, (list, timelineId) => {
    const timeline = _.get(timelines, timelineId);
    if (!timeline || !timeline.id || !timeline.sessionId) {
      return list;
    }

    return list.concat(timeline);
  }, []);
}

function decorate(domains, timebars, timelines, cds) {
  return _.reduce(cds, (list, { type, timebarId, connectedData }) => {
    return _.reduce(connectedData, (sublist, cd) => {
      const forDomains = domainsFilter(domains, cd.domain);
      if (!forDomains.length) {
        return sublist;
      }

      const forSessionIds = timelinesFilter(
        getTimebarTimelines(timebars, timelines, timebarId),
        cd.timeline
      );

      if (!forSessionIds.length) {
        return sublist;
      }

      _.each(forDomains, (domainId) => {
        _.each(forSessionIds, ({ sessionId, offset }) => {
          // remoteId
          const p = formulaParser(cd.formula);
          const dataId = {
            catalog: p.catalog,
            parameterName: p.parameterName,
            comObject: p.comObject,
            domainId,
            sessionId,
          };
          const remoteId = remoteIdGenerator(dataId, cd.filter);

          // localId
          const localId = localIdGenerator(type, p.field, timebarId, offset);

          // de-duplication
          if (typeof sublist[remoteId] === 'undefined') {
            sublist[remoteId] = {
              dataId: dataId,
              filter: cd.filter,
              localIds: {},
            };
          } else if (typeof sublist[remoteId][localId] !== 'undefined') {
            return;
          }

          sublist[remoteId].localIds[localId] = {
            viewType: type,
            field: p.field,
            offset,
          };
        });
      });

      return sublist;
    }, list);
  }, {});
}

/**
 * A pure function that establish things to do with Redux data and HSS:
 * - Compare previous and next states to find focused pages/views and establish new remoteId and
 *   localId list
 * - Compare visuWindow
 *
 * @param state
 */
module.exports = function syncData(previousState, state, dispatch, websocket) {
  const dataMap = getVisibleRemoteIds(state);

  const queries = missingData(dataMap, null, { lower: 100, upper: 100 });
  // console.log('dataQuery', queries);
  websocket.write({ event: 'dataQuery', payload: queries });

  // dispatch(addRequest(remoteId, localId, dataId, filter));

  // => compare with state.viewsQuery{remoteId{localIds{intervals}}}
  // => compare with state.viewsData{remoteId{localIds{intervals}}}
  // TODO which data have been already requested/set in redux? => reselect selector
  // TODO establish missing interval for each remoteId => compute
  // TODO send to ws

  // TODO transform observable method in actor wrapper:
  //     http://jamesknelson.com/join-the-dark-side-of-the-flux-responding-to-actions-with-actors/
  // return dataMap;
};

function missingData(remoteIds, prevInterval, nextInterval) {
  const queries = {};
  _.each(remoteIds, ({ dataId, filter, localIds }, remoteId) => {
    _.each(localIds, ({ viewType, field, offset }, localId) => {
      // console.log('dataId', filter, remoteId, localId, viewType, field, offset);
      const missing = missingIntervals(
        prevInterval ? [prevInterval.lower + offset, prevInterval.upper + offset] : [],
        [nextInterval.lower + offset, nextInterval.upper + offset]
      );

      if (!missing.length) {
        return [];
      }

      if (!queries[remoteId]) {
        queries[remoteId] = {
          dataId,
          filter,
          intervals: [],
        };
      }

      _.each(missing, (m) => {
        queries[remoteId].intervals = mergeIntervals(queries[remoteId].intervals, m);
      });
    });
  });

  return queries;
}
