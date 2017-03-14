import { PropTypes } from 'react';
import { connect } from 'react-redux';
import Inspector from './Inspector';
import {
  getInspectorStaticDataLoading,
  getInspectorStaticData,
} from '../../../store/selectors/inspector';
import {
  isInspectorStaticDataNodeToggled as toggleNode,
} from '../../../store/actions/inspector';

const mapStateToProps = (state) => {
  const data = getInspectorStaticData(state);
  const isLoading = getInspectorStaticDataLoading(state);
  return {
    isLoading,
    data,
  };
};

const InspectorContainer = connect(mapStateToProps, { toggleNode })(Inspector);

InspectorContainer.props = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.object,
  toggleNode: PropTypes.func.isRequired,
};

export default InspectorContainer;
