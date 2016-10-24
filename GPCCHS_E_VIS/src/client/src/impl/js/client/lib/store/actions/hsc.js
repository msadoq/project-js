import simple from '../simpleActionCreator';
import * as types from '../types';

export const updateStatus = simple(types.HSC_UPDATE_STATUS, 'status');
