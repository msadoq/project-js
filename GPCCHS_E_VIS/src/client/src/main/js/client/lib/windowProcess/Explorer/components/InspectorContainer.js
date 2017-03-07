import { PropTypes } from 'react';
import { connect } from 'react-redux';
import Inspector from './Inspector';
import {
  getInspectorIsLoading,
  getInspectorStaticData,
} from '../../../store/selectors/inspector';

const mapStateToProps = (state) => {
  const data = getInspectorStaticData(state);
  const isLoading = getInspectorIsLoading(state);
  return {
    isLoading,
    data,
  };
};

const InspectorContainer = connect(mapStateToProps, null)(Inspector);

InspectorContainer.props = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.object,
};

export default InspectorContainer;
