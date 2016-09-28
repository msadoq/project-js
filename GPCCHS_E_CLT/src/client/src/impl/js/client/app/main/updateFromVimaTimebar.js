import _ from 'lodash';
import u from 'updeep';
import compareTimebars from '../timeBar/tbUpdate';
import { getStore } from '../store/mainStore';
import { getTimebar, getTimelines } from '../store/mutations/timebarReducer';

import {
  updateId,
  updateVisuWindow,
  updateSpeed,
  updatePlayingState,
  updateMasterId,
  addAndMountTimeline,
  unmountAndRemoveTimeline,
  updateTimeline,
} from '../store/mutations/timebarActions';


export default function updateFromVimaTimebar(timebarId, newTimebar) {
  const state = getStore().getState();
  const oldTimebar = getTimebar(state, timebarId);
  const oldTimelines = getTimelines(state, timebarId);

  const oldTb = u({ timelines: oldTimelines }, oldTimebar);
  const differences = compareTimebars(oldTb, newTimebar);
  if (!differences) {
    return;
  }

  const dispatch = getStore().dispatch;

  if (differences.idUpdate) {
    dispatch(updateId(timebarId, differences.idUpdate));
  }
  if (differences.visuWindowUpdate) {
    dispatch(updateVisuWindow(
      timebarId,
      differences.visuWindowUpdate.lower,
      differences.visuWindowUpdate.upper,
      differences.visuWindowUpdate.current
    ));
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
    _.each(tlUpd.timelines, (tl, uuid) => {
      dispatch(updateTimeline(timebarId, uuid, tl));
    });
  }
  if (differences.timelineAdded) {
    _.each(differences.timelineAdded, (tl) => {
      dispatch(addAndMountTimeline(timebarId, tl));
    });
  }
  if (differences.timelineRemoved) {
    _.each(differences.timelineRemoved, (tl) => {
      dispatch(unmountAndRemoveTimeline(timebarId, tl.id));
    });
  }
}
