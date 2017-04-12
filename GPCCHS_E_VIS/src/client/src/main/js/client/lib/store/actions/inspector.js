import simple from '../simpleActionCreator';
import * as types from '../types';

// GENERAL
export const isInspectorDisplayingTM = simple(types.HSC_IS_INSPECTOR_DISPLAYING_A_TM, 'displayingTM');
export const updateInspectorRemoteId = simple(types.HSC_UPDATE_INSPECTOR_REMOTE_ID, 'remoteId');
export const updateInspectorDataId = simple(types.HSC_UPDATE_INSPECTOR_DATA_ID, 'dataId');
// STATIC DATA
export const setInspectorStaticData = simple(types.HSC_SET_INSPECTOR_STATIC_DATA, 'data');
export const isInspectorStaticDataLoading = simple(types.HSC_IS_INSPECTOR_STATIC_DATA_LOADING, 'loading');
export const toggleAllInspectorStaticDataNodes = simple(types.HSC_TOGGLE_ALL_INSPECTOR_STATIC_DATA_NODES, 'toggled');
// STATIC DATA NODE
export const updateInspectorStaticDataNode = simple(types.HSC_UPDATE_INSPECTOR_STATIC_DATA_NODE, 'path', 'data');
export const isInspectorStaticDataNodeLoading = simple(types.HSC_IS_INSPECTOR_STATIC_DATA_NODE_LOADING, 'path', 'loading');
export const isInspectorStaticDataNodeToggled = simple(types.HSC_IS_INSPECTOR_STATIC_DATA_NODE_TOGGLED, 'path', 'toggled');
