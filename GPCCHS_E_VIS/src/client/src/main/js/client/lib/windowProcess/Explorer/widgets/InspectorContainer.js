import { connect } from 'react-redux';
import Inspector from './Inspector';
import {
  getInspectorDataId,
  getInspectorDisplayingTM,
  getInspectorStaticDataChildren,
  getInspectorStaticDataLoading,
} from '../../../store/selectors/inspector';
import {
  isInspectorStaticDataNodeToggled as toggleNode,
} from '../../../store/actions/inspector';

const mapStateToProps = (state) => {
  const dataId = getInspectorDataId(state);
  const isDisplayingTM = getInspectorDisplayingTM(state);
  const staticData = getInspectorStaticDataChildren(state);
  const staticDataLoading = getInspectorStaticDataLoading(state);
  return {
    dataId,
    isDisplayingTM,
    staticData,
    staticDataLoading,
  };
};

const InspectorContainer = connect(mapStateToProps, { toggleNode })(Inspector);

export default InspectorContainer;
