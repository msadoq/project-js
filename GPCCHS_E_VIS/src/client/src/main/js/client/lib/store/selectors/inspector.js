import _get from 'lodash/get';

export const getInspectorStaticData = state => state.inspector.staticData;
export const getInspectorStaticDataLoading = state => state.inspector.staticData.loading;
export const getInspectorDataId = state => state.inspector.dataId;
export const getInspectorStaticDataNodeToggled = (state, path) => (_get(state.inspector.staticData, [...path, 'toggled']) === true);
