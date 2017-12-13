// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 07/03/2017 : first draft on inspector: retrieve data from rtd on right-click
// VERSION : 1.1.2 : DM : #5822 : 15/03/2017 : add a tree component and format inspector data to be consumed
// VERSION : 1.1.2 : DM : #5822 : 16/03/2017 : resolve a rtd link in the inspector
// VERSION : 1.1.2 : DM : #5822 : 24/03/2017 : inspector view: separate general data from specific TM data
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : add buttons to collapse and expand inspector static data
// VERSION : 1.1.2 : DM : #5822 : 03/05/2017 : Inspector : display dynamic data
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean IPC about openInspector .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

export const askOpenInspector = simple(types.HSC_ASK_OPEN_INSPECTOR, 'pageId', 'viewId', 'type', 'options');

// GENERAL
export const isInspectorDisplayingTM = simple(types.HSC_IS_INSPECTOR_DISPLAYING_A_TM, 'displayingTM');
export const setInspectorGeneralData = simple(types.HSC_SET_INSPECTOR_GENERAL_DATA, 'viewId', 'viewType', 'epId', 'epName', 'dataId', 'field');
export const deleteInspectorGeneralData = simple(types.HSC_DELETE_INSPECTOR_GENERAL_DATA);
// STATIC DATA
export const setInspectorStaticData = simple(types.HSC_SET_INSPECTOR_STATIC_DATA, 'data');
export const isInspectorStaticDataLoading = simple(types.HSC_IS_INSPECTOR_STATIC_DATA_LOADING, 'loading');
export const toggleAllInspectorStaticDataNodes = simple(types.HSC_TOGGLE_ALL_INSPECTOR_STATIC_DATA_NODES, 'toggled');
// STATIC DATA NODE
export const updateInspectorStaticDataNode = simple(types.HSC_UPDATE_INSPECTOR_STATIC_DATA_NODE, 'path', 'data');
export const isInspectorStaticDataNodeLoading = simple(types.HSC_IS_INSPECTOR_STATIC_DATA_NODE_LOADING, 'path', 'loading');
export const isInspectorStaticDataNodeToggled = simple(types.HSC_IS_INSPECTOR_STATIC_DATA_NODE_TOGGLED, 'path', 'toggled');
