import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getView } from '../../store/selectors/views';
import View from './View';

const ViewContainer = props => <View {...props} />;

ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { type, configuration } = getView(state, ownProps.viewId);
  return {
    ...ownProps,
    type,
    configuration,
  };
};

export default connect(mapStateToProps)(ViewContainer);
