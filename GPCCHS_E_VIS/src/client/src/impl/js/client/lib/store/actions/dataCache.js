import simple from '../simpleActionCreator';
import * as types from '../types';
import dataMap from '../../mainProcess/data/dataMap';

export const writePayload = simple(types.DATA_IMPORT_PAYLOADS, 'payloads', 'remoteIds');

export function importPayload(payload) {
  return (dispatch, getState) => {
    // make your data computing
    const remoteIds = dataMap(getState());
    dispatch(writePayload(payload, remoteIds));
  };
}
