import { getVisuWindowByViewId } from 'store/selectors/views';
import { getPlayingTimebarId } from '../reducers/hsc';
import { getPageByViewId } from '../reducers/pages';
/**
 * return the current window interval for each pusId
 */
export default function computeMissingPusIntervals(state, dataMap) {
  const queries = {};
  const pusIds = Object.keys(dataMap.perPusId);
  for (let i = 0; i < pusIds.length; i += 1) {
    const pusId = pusIds[i];
    const { dataId, views } = dataMap.perPusId[pusId];
    const visuWindow = getVisuWindowByViewId(state, { viewId: views[0] });
    const playingTimebarId = getPlayingTimebarId(state);
    const page = getPageByViewId(state, { viewId: views[0] });
    // this condition is checking if timebar is currently in playing mode
    // if it is, data are given by the forecast
    // view is not needing data
    if (!playingTimebarId || page.timebarUuid !== playingTimebarId) {
      const interval = [visuWindow.lower, visuWindow.current];
      queries[pusId] = {
        dataId,
        interval,
      };
    }
  }
  return queries;
}
