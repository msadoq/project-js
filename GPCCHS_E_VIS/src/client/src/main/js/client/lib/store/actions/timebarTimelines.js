import simple from '../simpleActionCreator';
import * as types from '../types';

export const addTimebar = simple(types.WS_TBTL_ADD_TIMEBAR, 'timebarUuid');
export const mountTimeline = simple(types.WS_TBTL_MOUNT_TIMELINE, 'timebarUuid', 'timelineUuid');
export const removeTimebar = simple(types.WS_TBTL_REMOVE_TIMEBAR, 'timebarUuid');
export const unmountTimeline = simple(types.WS_TBTL_UNMOUNT_TIMELINE, 'timebarUuid', 'timelineUuid');
