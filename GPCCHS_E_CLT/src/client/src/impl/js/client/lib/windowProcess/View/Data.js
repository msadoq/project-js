import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getTimebar } from '../../store/selectors/timebars';
import external from '../../../external.main';

const Data = props => {
  const ViewType = props.component;
  return <ViewType {...props} />;
};

Data.propTypes = {
  timebarId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  // current visualisation window
  const timebar = getTimebar(state, ownProps.timebarId);

  // data
  // TODO retrieve view remoteId/localId list, reselect state.dataCache and pass to view

  return {
    ...ownProps,
    interval: timebar.visuWindow,
    data: [
      { timestamp: 10, value: 'x' },
      { timestamp: 11, value: 'y' },
      { timestamp: 12, value: 'z' },
    ],
  };
};

export default connect(mapStateToProps)(Data);
