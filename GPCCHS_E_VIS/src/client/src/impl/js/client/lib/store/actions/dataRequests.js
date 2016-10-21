import simple from '../simpleActionCreator';
import * as types from '../types';

export const addRequests = simple(types.DATA_ADD_REQUESTS, 'requests');
export const removeRequests = simple(types.DATA_REMOVE_REQUESTS, 'requests');
export const removeAllRequests = simple(types.DATA_REMOVE_ALL_REQUESTS);
