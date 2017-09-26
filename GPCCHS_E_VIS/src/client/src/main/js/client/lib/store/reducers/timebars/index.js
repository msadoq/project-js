// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for each reducer
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getTimebarMasterId simple selector in store/reducers/timebars
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getFirstTimebarId simple selectors in store/reducers/timebars
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getTimebar and getTimebars simple selectors in store/reducers/timebars
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add getTimebarId selector . .
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Fix or comment some coding standard warnings
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : change thunk pause into simple action
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : change thunk pause into simple action
// VERSION : 1.1.2 : DM : #7111 : 03/07/2017 : Add config parameter VISU_WINDOW_MAX_DURATION to limit visuWindow per view
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Rename documentManager actions . .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import u from 'updeep';
import { createSelector } from 'reselect';

import * as types from '../../types';
import timebar from './timebar';
import { get } from '../../../common/configurationManager';

const maxVisuWindowDuration = get('VISU_WINDOW_MAX_DURATION');

/* --- Reducer -------------------------------------------------------------- */
export default function timebarsReducer(stateTimebars = {}, action) {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_TIMEBAR_CREATE_NEW:
      return _.set(action.payload.timebarUuid, timebar(undefined, action), stateTimebars);
    case types.WS_WORKSPACE_OPENED: {
      const setPayloadTimebar = _.set('payload.timebar');
      const singleTimebarReducer = state => (
        timebar(undefined, setPayloadTimebar(state, action))
      );
      return _.compose(
        _.merge(stateTimebars),              // 4. merge with old stateTimebars
        _.mapValues(_.unset('timelines')),   // 3. remove all timelines, this is handled by timebarTimelines reducer
        _.indexBy('uuid'),                   // 2. index timebars array by uuid
        _.map(singleTimebarReducer)          // 1. apply single timebar reducer on all timebars
      )(action.payload.timebars);
    }
    case types.HSC_PAUSE: {
      return _.mapValues(t => _.set('realTime', false, t), stateTimebars);
    }
    default: {
      if (
        action.payload &&
        action.payload.timebarUuid &&
        stateTimebars[action.payload.timebarUuid]
      ) {
        const currentTimebar = stateTimebars[action.payload.timebarUuid];
        return u({
          [action.payload.timebarUuid]: timebar(currentTimebar, action),
        }, stateTimebars);
      }
      return stateTimebars;
    }
  }
}

/* --- Selectors ------------------------------------------------------------ */
export const getTimebars = state => state.timebars;
export const getTimebar = (state, { timebarUuid }) => state.timebars[timebarUuid];
export const getTimebarId = createSelector(
  getTimebar,
  _.get('id')
);
export const getFirstTimebarId = _.pipe(getTimebars, _.keys, _.get(0));
export const getTimebarMasterId = (state, { timebarUuid }) => _.get(['timebars', timebarUuid, 'masterId'], state);

export const getTimebarVisuWindowDuration = (state, { timebarUuid }) => {
  const tb = state.timebars[timebarUuid];
  if (!tb) {
    return 0;
  }
  return tb.visuWindow.upper - tb.visuWindow.lower;
};

export const isMaxVisuDurationExceeded = (state, { viewType, timebarUuid }) => {
  if (maxVisuWindowDuration[viewType]) {
    return getTimebarVisuWindowDuration(state, { timebarUuid }) > maxVisuWindowDuration[viewType];
  }
  return false;
};
