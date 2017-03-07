import simple from '../simpleActionCreator';
import * as types from '../types';

export const updateInspectorStaticData = simple(types.HSC_UPDATE_INSPECTOR_STATIC_DATA, 'staticData');
export const updateInspectorIsLoading = simple(types.HSC_UPDATE_INSPECTOR_IS_LOADING, 'isLoading');
export const updateInspectorDataId = simple(types.HSC_UPDATE_INSPECTOR_DATA_ID, 'dataId');
