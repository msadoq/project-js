import simple from '../simpleActionCreator';
import * as types from '../types';

// eslint-disable-next-line import/prefer-default-export
export const updateStatus = simple(types.HSC_UPDATE_STATUS, 'status');
