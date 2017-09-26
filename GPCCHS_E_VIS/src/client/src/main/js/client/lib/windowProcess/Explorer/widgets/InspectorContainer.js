// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5822 : 20/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5822 : 24/03/2017 : inspector view: separate general data from specific TM data
// VERSION : 1.1.2 : DM : #5822 : 27/03/2017 : fix openInspector and InspectorContainer imports
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : add buttons to collapse and expand inspector static data
// VERSION : 1.1.2 : DM : #5822 : 03/05/2017 : Inspector : display dynamic data
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import Inspector from './Inspector';
import {
  getInspectorViewId,
  getInspectorViewType,
  getInspectorDataId,
  getInspectorEpName,
  getInspectorField,
  getInspectorDisplayingTM,
  getInspectorStaticDataChildren,
  getInspectorStaticDataLoading,
} from '../../../store/reducers/inspector';
import {
  isInspectorStaticDataNodeToggled as toggleNode,
  isInspectorStaticDataNodeLoading as loadingNode,
  toggleAllInspectorStaticDataNodes as toggleAllNodes,
} from '../../../store/actions/inspector';
import {
  getDataSelectors,
} from '../../../viewManager';

const mapStateToProps = (state) => {
  const viewId = getInspectorViewId(state);
  const viewType = getInspectorViewType(state);
  const epName = getInspectorEpName(state);
  const field = getInspectorField(state);
  const dataId = getInspectorDataId(state);
  const isDisplayingTM = getInspectorDisplayingTM(state);
  const staticData = getInspectorStaticDataChildren(state);
  const staticDataLoading = getInspectorStaticDataLoading(state);
  const dynamicData = (viewType && viewId && epName)
    ? getDataSelectors(viewType).getLastValue(state, { epName, viewId })
    : null;
  return {
    epName,
    field,
    dataId,
    isDisplayingTM,
    staticData,
    staticDataLoading,
    dynamicData,
  };
};

const InspectorContainer = connect(mapStateToProps, {
  toggleNode,
  toggleAllNodes,
  loadingNode,
})(Inspector);

export default InspectorContainer;
