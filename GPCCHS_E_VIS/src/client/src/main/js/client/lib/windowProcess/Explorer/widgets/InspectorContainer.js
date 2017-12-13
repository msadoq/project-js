import { connect } from 'react-redux';
import {
  getInspectorViewId,
  getInspectorViewType,
  getInspectorDataId,
  getInspectorEpName,
  getInspectorField,
  getInspectorDisplayingTM,
  getInspectorStaticDataChildren,
  getInspectorStaticDataLoading,
} from 'store/reducers/inspector';
import {
  isInspectorStaticDataNodeToggled as toggleNode,
  isInspectorStaticDataNodeLoading as loadingNode,
  toggleAllInspectorStaticDataNodes as toggleAllNodes,
} from 'store/actions/inspector';
import {
  getDataSelectors,
} from 'viewManager';
import Inspector from './Inspector';

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
