import simple from '../simpleActionCreator';
import * as types from '../types';

export const updateInspectorStaticData = simple(types.HSC_UPDATE_INSPECTOR_STATIC_DATA, 'staticData');
export const isInspectorStaticDataLoading = simple(types.HSC_IS_INSPECTOR_STATIC_DATA_LOADING, 'loading');
export const updateInspectorDataId = simple(types.HSC_UPDATE_INSPECTOR_DATA_ID, 'dataId');
export const isInspectorStaticDataNodeToggled = simple(types.HSC_IS_INSPECTOR_STATIC_DATA_NODE_TOGGLED, 'path', 'toggled');
