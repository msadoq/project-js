import simple from '../simpleActionCreator';
import * as types from '../types';

export const addRequest = simple(types.DATA_ADD_REQUEST,
  'remoteId', 'localId', 'dataId', 'filters');
