import _get from 'lodash/get';

// GENERAL
export const getInspectorDisplayingTM = state => state.inspector.displayingTM;
export const getInspectorDataId = state => state.inspector.dataId;
export const getInspectorRemoteId = state => state.inspector.remoteId;
// STATIC DATA
export const getInspectorStaticData = state => state.inspector.staticData;
export const getInspectorStaticDataLoading = state => (_get(state.inspector.staticData, 'loading') === true);
export const getInspectorStaticDataChildren = state => _get(state.inspector.staticData, 'children');
// STATIC DATA NODE
export const getInspectorStaticDataNode = (state, path) =>
  (path.length ? _get(state.inspector.staticData, path) : state.inspector.staticData);
export const getInspectorStaticDataNodeToggled = (state, path) => (_get(state.inspector.staticData, [...path, 'toggled']) === true);
