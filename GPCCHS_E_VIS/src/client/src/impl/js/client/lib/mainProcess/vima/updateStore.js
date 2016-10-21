import _each from 'lodash/each';
import u from 'updeep';
import compareTimebars from './update';
import {
  getTimebar,
  getTimelinesFromTimebar,
  getTimebarUuidById,
} from '../../store/selectors/timebars';

import {
  updateId,
  updateVisuWindow,
  updateSpeed,
  updatePlayingState,
  updateMasterId,
  addAndMountTimeline,
  unmountAndRemoveTimeline,
  updateTimeline,
} from '../../store/actions/timebars';

export default function updateFromVimaTimebar(state, dispatch, data) {
  if (data.actionType === 'initialUpd') {
    return;
  }
  const timebarId = getTimebarUuidById(state, data.id);
  if (timebarId < 0) {
    throw new Error(`Unknown timebar ${data.id}`);
  }
  const oldTimebar = getTimebar(state, timebarId);

  const oldTimelines = getTimelinesFromTimebar(state, oldTimebar);
  const oldTb = u({ timelines: oldTimelines }, oldTimebar);
  const differences = compareTimebars(oldTb, data);
  if (!differences) {
    return;
  }

  if (differences.idUpdate) {
    dispatch(updateId(timebarId, differences.idUpdate));
  }
  if (differences.visuWindowUpdate) {
    dispatch(updateVisuWindow(timebarId, differences.visuWindowUpdate));
  }

  if (differences.speedUpdate) {
    dispatch(updateSpeed(timebarId, differences.speedUpdate));
  }
  if (differences.playingStateUpdate) {
    dispatch(updatePlayingState(timebarId, differences.playingStateUpdate));
  }
  if (differences.timelineUpdate) {
    const tlUpd = differences.timelineUpdate;
    if (tlUpd.masterId) {
      dispatch(updateMasterId(timebarId, tlUpd.masterId));
    }
    // TODO timeline update
    _each(tlUpd.timelines, (tl, uuid) => {
      dispatch(updateTimeline(timebarId, uuid, tl));
    });
  }
  if (differences.timelineAdded) {
    _each(differences.timelineAdded, (tl) => {
      dispatch(addAndMountTimeline(timebarId, tl));
    });
  }
  if (differences.timelineRemoved) {
    _each(differences.timelineRemoved, (tl) => {
      dispatch(unmountAndRemoveTimeline(timebarId, tl.id));
    });
  }
}
