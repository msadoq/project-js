import { v4 } from 'node-uuid';
import simple from './simpleActionCreator';
import * as types from './types';
import {
  add as addEntryPoint,
  remove as removeEntryPoint,
} from './entryPointActions';

/**
 * Simple actions
 */
export const add = simple(types.WS_VIEW_ADD, 'viewId', 'type', 'configuration', 'entryPoints');
export const remove = simple(types.WS_VIEW_REMOVE, 'viewId');
export const mountEntryPoint = simple(types.WS_VIEW_ENTRYPOINT_MOUNT, 'viewId', 'entryPointId');
export const unmountEntryPoint = simple(types.WS_VIEW_ENTRYPOINT_UNMOUNT, 'viewId', 'entryPointId');

/**
 * Compound actions
 */
export function addAndMount(viewId) {
  return dispatch => {
    const entryPointId = v4();
    dispatch(addEntryPoint(entryPointId));
    dispatch(mountEntryPoint(viewId, entryPointId));
  };
}

export function unmountAndRemove(viewId, entryPointId) {
  return dispatch => {
    dispatch(unmountEntryPoint(viewId, entryPointId));
    dispatch(removeEntryPoint(entryPointId));
  };
}
