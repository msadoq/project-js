import simple from '../simpleActionCreator';
import * as types from '../types';

export const updateInspectorSessionId = simple(types.HSC_UPDATE_INSPECTOR_SESSION_ID, 'sessionId');
export const updateInspectorDomainId = simple(types.HSC_UPDATE_INSPECTOR_DOMAIN_ID, 'domainId');
export const updateInspectorDataId = simple(types.HSC_UPDATE_INSPECTOR_DATA_ID, 'dataId');
export const isInspectorStaticDataNodeToggled = simple(types.HSC_IS_INSPECTOR_STATIC_DATA_NODE_TOGGLED, 'path', 'toggled');
export const isInspectorStaticDataNodeLoading = simple(types.HSC_IS_INSPECTOR_STATIC_DATA_NODE_LOADING, 'path', 'loading');
export const updateInspectorStaticDataNode = simple(types.HSC_UPDATE_INSPECTOR_STATIC_DATA_NODE, 'path', 'data');
export const updateInspectorStaticData = simple(types.HSC_UPDATE_INSPECTOR_STATIC_DATA, 'data');
export const isInspectorStaticDataLoading = loading =>
  isInspectorStaticDataNodeLoading([], loading);
