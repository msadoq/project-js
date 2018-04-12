import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

export const toggleZoomState = simple(types.TOGGLE_ZOOM_STATE, 'viewId');
export const toggleSamplingStatus = simple(types.TOGGLE_SAMPLING_STATUS, 'viewId');
