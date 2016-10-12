const _ = require('lodash');
import { createSelector } from 'reselect';

import external from '../../../external.main';
import formulaParser from '../../common/formula';
import remoteIdGenerator from '../../common/remoteId';
import localIdGenerator from '../../common/localId';
import domainsFilter from '../../common/domains';
import timelinesFilter from '../../common/sessions';

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

          // current visuWindow
          const visuWindow = _.get(timebars, [timebarId, 'visuWindow']);
          if (!visuWindow) {
            throw new Error('Unexpected store state');
          }
          const selector = _.get(external, [type, 'getExpectedInterval']);
          if (!_.isFunction(selector)) {
            throw new Error('Unexpected external view type', type);
          }

          sublist[remoteId].localIds[localId] = {
            viewType: type,
            field: p.field,
            timebarId,
            offset,
            expectedInterval: selector(
              visuWindow.lower - offset,
              visuWindow.current - offset,
              visuWindow.upper - offset
            ),
          };
        });
      });

      return sublist;
    }, list);
  }, {});
}

/**
 * Return the current client dataMap
 *
 * {
 *   'remoteId': {
 *     dataId: {},
 *     filter: {},
 *     localIds: {
 *       'localId': {
 *          viewType: string,
 *          field: string,
 *          timebarId: string,
 *          offset: number,
 *          expectedInterval: [number, number],
 *        }
 *     }
 *   }
 * }
 *
 * @param state
 * @return object
 */
export default function dataMap(state) {
  return getVisibleRemoteIds(state);
};
