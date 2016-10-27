import simple from '../simpleActionCreator';
import * as types from '../types';
import debug from '../../common/debug/mainDebug';

const logger = debug('store:action:dataCache');

// simple action
export const importPayload = simple(types.DATA_IMPORT_VIEWDATA, 'viewData');
export const removeAllData = simple(types.DATA_REMOVE_ALL_VIEWDATA);
