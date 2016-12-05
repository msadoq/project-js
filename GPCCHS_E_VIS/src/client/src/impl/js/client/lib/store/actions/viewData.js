import simple from '../simpleActionCreator';
import * as types from '../types';

export const importPayload = simple(types.DATA_IMPORT_VIEWDATA, 'viewData');
export const removeAllData = simple(types.DATA_REMOVE_ALL_VIEWDATA);
export const updateViewData = simple(types.DATA_UPDATE_VIEWDATA, 'viewData');
