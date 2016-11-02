import simple from '../simpleActionCreator';
import * as types from '../types';

export const updateRequests = simple(types.DATA_UPDATE_VIEWREQUESTS, 'viewRequests');
export const updateViewRequest = simple(types.DATA_UPDATE_VIEWREQUEST, 'viewId', 'entryPoints');
