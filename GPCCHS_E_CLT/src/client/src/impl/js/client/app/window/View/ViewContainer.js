import React from 'react';
import { connect } from 'react-redux';
import { getView } from '../../store/mutations/viewReducer';
import { getTimebar } from '../../store/mutations/timebarReducer';
import View from './View';

import forView from '../../connectedData/forView';

const ViewContainer = props => <View {...props} />;

const mapStateToProps = (state, ownProps) => {
  const { type, configuration } = getView(state, ownProps.viewId);

  const timebar = getTimebar(state, ownProps.timebarId);
  const { lower, current, upper } = timebar.visuWindow;

  return {
    ...ownProps,
    type,
    configuration,
    lower,
    current,
    upper,
    connectedData: forView(state, ownProps.timebarId, ownProps.viewId),
  }
};

export default connect(mapStateToProps)(ViewContainer);
