import { createSelector } from 'reselect';

import { getTimelines } from '../reducers/timelines';
import { getTimebarTimelines as getTimebarTimelineIds } from '../reducers/timebarTimelines';

import { getTimebarMasterId, getTimebarVisuWindow } from '../reducers/timebars';
import { getFocusedWindowId } from '../reducers/hsc';
import { getWindowFocusedPageId } from '../reducers/windows';
import { getPageTimebarId } from '../reducers/pages';

const getTimebarTimelinesSelector = createSelector(
  [
    getTimebarMasterId,
    getTimelines,
    getTimebarTimelineIds,
  ],
  (masterId, timelines, tbTimelines) => { // Array of timelineUuid of the current timebar
    if (!tbTimelines.length) {
      return [];
    }
    const timebarTimelines = [];
    tbTimelines.forEach((tlUuid) => {
      if (masterId === timelines[tlUuid].id) {
        timebarTimelines.unshift(timelines[tlUuid]);
      } else {
        timebarTimelines.push(timelines[tlUuid]);
      }
    });
    return timebarTimelines;
  }
);

const getCurrentVisuWindow = (state) => {
  const windowId = getFocusedWindowId(state);
  const pageId = getWindowFocusedPageId(state, { windowId });
  const timebarUuid = getPageTimebarId(state, { pageId });
  const visuWindow = getTimebarVisuWindow(state, { timebarUuid });

  return visuWindow;
};

export default {
  getTimebarTimelinesSelector,
  getCurrentVisuWindow,
};
