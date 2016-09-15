import { v4 } from 'node-uuid';
import simple from './simpleActionCreator';
import * as types from './types';
import {
  add as addConnectedData,
  remove as removeConnectedData,
} from './connectedDataActions';

/**
 * Simple actions
 */
export const add = simple(types.WS_VIEW_ADD, 'viewId', 'type', 'configuration');
export const remove = simple(types.WS_VIEW_REMOVE, 'viewId');
export const mountConnectedData = simple(types.WS_VIEW_CD_MOUNT, 'viewId', 'connectedDataId');
export const unmountConnectedData = simple(types.WS_VIEW_CD_UNMOUNT, 'viewId', 'connectedDataId');

/**
 * Compound actions
 */
export function addAndMount(viewId) {
  return dispatch => {
    const connectedDataId = v4();
    dispatch(addConnectedData(connectedDataId));
    dispatch(mountConnectedData(viewId, connectedDataId));
  };
}

export function unmountAndRemove(viewId, connectedDataId) {
  return dispatch => {
    dispatch(unmountConnectedData(viewId, connectedDataId));
    dispatch(removeConnectedData(connectedDataId));
  };
}
