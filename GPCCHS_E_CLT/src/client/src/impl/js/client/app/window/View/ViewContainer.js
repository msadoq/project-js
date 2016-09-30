import React from 'react';
import { connect } from 'react-redux';
import { getView } from '../../store/mutations/viewReducer';
import View from './View';

import forView from '../../connectedData/forView';

const ViewContainer = props => <View {...props} />;

const mapStateToProps = (state, ownProps) => {
  const { type, configuration } = getView(state, ownProps.viewId);
  return {
    ...ownProps,
    type,
    configuration,
    connectedData: forView(state, ownProps.timebarId, ownProps.viewId),
  };
};

export default connect(mapStateToProps)(ViewContainer);
