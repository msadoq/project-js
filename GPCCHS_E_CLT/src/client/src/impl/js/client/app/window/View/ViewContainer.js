import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getView } from '../../store/mutations/viewReducer';
import { getTimebar } from '../../store/mutations/timebarReducer';
import View from './View';

import SizeMe from 'react-sizeme';

import remoteId from '../../connectedData/remoteId';
import external from '../../../external.main';
import forView from '../../../legacy/connectedData/forView';


const ViewContainer = props => <View {...props} />;

ViewContainer.propTypes = {
  timebarId: PropTypes.string.isRequired,
  viewId: PropTypes.string.isRequired,
  // entryPoints: PropTypes.array.isRequired,
  openEditor: PropTypes.func,
  closeEditor: PropTypes.func,
  unmountAndRemove: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { type, configuration } = getView(state, ownProps.viewId);

  const timebar = getTimebar(state, ownProps.timebarId);
  const { lower, current, upper } = timebar.visuWindow;

  const decoratedData = forView(state, ownProps.timebarId, ownProps.viewId);
  return {
    ...ownProps,
    type,
    configuration,
    interval: { lower, current, upper },
    decoratedData,
  };
};

 export default SizeMe({ monitorHeight: true })(connect(mapStateToProps)(ViewContainer));
