import { reduce, get } from 'lodash';
import { createSelector } from 'reselect';
import getEntryPointsFromState from './getEntryPointsFromState';
import domainsFilter from '../../../lib/common/domains';
import timelinesFilter from '../../../lib/common/sessions';

const getDomains = state => state.domains;
const getDataCache = state => state.dataCache;
const getTimebars = state => state.timebars;
const getTimelines = state => state.timelines;

const getTimelinesByTimelineId = createSelector(
  [
    getTimebars,
    getTimelines,
    (state, props) => props.timebarId,
  ],
  (timebars, timelines, timebarId) => {
    const ts = get(timebars, [timebarId, 'timelines']);
    return reduce(ts, (list, timelineId) => {
      const timeline = get(timelines, timelineId);
      if (!timeline || !timeline.id || !timeline.sessionId) {
        return list;
      }

      return list.concat(timeline);
    }, []);
  }
);

export default function getDataFromCache() {
  /**
   * Returns cache data for given view.
   *
   * {
   *   'name': [{x, y}],
   * }
   *
   * @param state
   * @param configuration
   * @param timebarId
   * @return {*}
   */
  return createSelector(
    [
      getDomains,
      getTimelinesByTimelineId,
      getDataCache, // TODO change on each dataCache insertion triggering a re-render...
      (state, props) => props.timebarId,
      (state, props) => props.configuration,
    ],
    (domains, timelines, cache, timebarId, configuration) => {
      // console.log('PASS HERE', 'plot', 'getDataFromCache', configuration, timebarId);
      return {};
      // return reduce(getEntryPointsFromState(configuration), (list, ep) => {
      //   // both axes should have a valid connectedData
      //   if (!ep || !ep.connectedDataX || !ep.connectedDataY) {
      //     return list;
      //   }
      //
      //   return Object.assign(list, { [ep.name]: {
      //     x: ep.connectedDataX,
      //     y: ep.connectedDataY,
      //   } });
      //
      //   // const x = formula(ep.connectedDataX.formula);
      //   // const y = formula(ep.connectedDataY.formula);
      //   //
      //   // if (
      //   //   x.catalog === y.catalog
      //   //   && x.parameterName === y.parameterName
      //   //   && x.comObject === y.comObject
      //   // ) {
      //   //   // same TBD parameter
      //   // }
      //   //
      //   // // parametric entryPoint
      //   // const entryPoints = {
      //   //   x: ep.connectedDataX,
      //   //   y: ep.connectedDataY,
      //   // };
      //   // return Object.assign(list, { [ep.name]: entryPoints });
      // }, {});
    }
  );
}
