/* eslint-disable import/prefer-default-export */
import simple from 'store/helpers/simpleActionCreator';
import { WS_VIEW_HISTORY_TOGGLE_TRACK_CURRENT } from '../../../store/types';

export const toggleHistoryCurrentTimestampTracking = simple(
  WS_VIEW_HISTORY_TOGGLE_TRACK_CURRENT,
  'viewId'
);
