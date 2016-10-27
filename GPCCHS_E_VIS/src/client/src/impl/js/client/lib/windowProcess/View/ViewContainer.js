import _get from 'lodash/get';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import _throttle from 'lodash/throttle';
// import { constants as globalConstants } from 'common';

// import vivl from '../../../VIVL/main';
import { getComponent } from '../../../VIVL/window';
import { getView } from '../../store/selectors/views';
// import { makeGetTimebarTimelines } from '../../store/selectors/timebars';

import View from './View';

// const selectors = {};
// const getTimebarTimelines = makeGetTimebarTimelines();

const ViewContainer = props => <View {...props} />;

ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { type, title, configuration } = getView(state, ownProps.viewId);
  const ViewTypeComponent = getComponent(type);

  // // TODO possible memory leak as we do not remove
  // // unused selectors (deleted widget)
  // if (!selectors[ownProps.viewId]) {
  //   // TODO: should maybe thottle inside reselector to avoid missing props evolution
  //   selectors[ownProps.viewId] = _throttle(
  //     vivl(type, 'getDataFromCache')(),
  //     globalConstants.HSC_THROTTLE_RENDER
  //   ); // constant
  // }

  const data = _get(state, ['viewData', ownProps.viewId], {});

  return {
    type,
    title,
    configuration,
    component: ViewTypeComponent,
    data,
    // data: selectors[ownProps.viewId](state, {
    //   ...ownProps,
    //   configuration,
    //   timelines: getTimebarTimelines(state, { timebarId: ownProps.timebarId }),
    // }),
  };
};

// return function to avoid page grid layout and React DOM re-conciliation issue
export default () => connect(mapStateToProps)(ViewContainer);
