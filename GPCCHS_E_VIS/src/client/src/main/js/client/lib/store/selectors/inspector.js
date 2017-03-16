import _get from 'lodash/get';

export const getInspectorSessionId = state => state.inspector.sessionId;
export const getInspectorDomainId = state => state.inspector.domainId;
export const getInspectorDataId = state => state.inspector.dataId;
export const getInspectorStaticData = state => state.inspector.staticData;
export const getInspectorStaticDataLoading = state => state.inspector.staticData.loading;
export const getInspectorStaticDataNodeToggled = (state, path) => (_get(state.inspector.staticData, [...path, 'toggled']) === true);
