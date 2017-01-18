import { PropTypes } from 'react';
import { connect } from 'react-redux';
import DynamicView from './DynamicView';

export const DynamicViewContainer = connect(null, null)(DynamicView);

DynamicViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired
};
export default DynamicViewContainer;
