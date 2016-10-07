import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SizeMe from 'react-sizeme';

import { getView } from '../../store/selectors/views';
import { getTimebar } from '../../store/selectors/timebars';
import View from './View';

import remoteId from '../../common/remoteId';
import external from '../../../external.main';

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
    interval: { lower, current, upper },
  };
};

 export default SizeMe({ monitorHeight: true })(connect(mapStateToProps)(ViewContainer));
