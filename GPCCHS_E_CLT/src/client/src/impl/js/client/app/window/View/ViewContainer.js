import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getView } from '../../store/mutations/viewReducer';
import { getTimebar } from '../../store/mutations/timebarReducer';
import View from './View';

const ViewContainer = props => <View {...props} />;

ViewContainer.propTypes = {
  timebarId: PropTypes.string.isRequired,
  viewId: PropTypes.string.isRequired,
  openEditor: PropTypes.func,
  closeEditor: PropTypes.func,
  unmountAndRemove: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { type, configuration } = getView(state, ownProps.viewId);

  const timebar = getTimebar(state, ownProps.timebarId);
  const { lower, current, upper } = timebar.visuWindow;

  return {
    ...ownProps,
    type,
    configuration,
    interval: { lower, current, upper }
  };
};

export default connect(mapStateToProps)(ViewContainer);
