import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import vivl from '../../../VIVL/main';
import { getComponent } from '../../../VIVL/window';
import { getView } from '../../store/selectors/views';
import { makeGetTimebarTimelines } from '../../store/selectors/timebars';

import View from './View';

let selector = {};
const getTimebarTimelines = makeGetTimebarTimelines();

const ViewContainer = props => <View {...props} />;

ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { type, configuration } = getView(state, ownProps.viewId);
  const ViewTypeComponent = getComponent(type);

  // @TODO possible memory leak as we do not remove
  // unused selectors (deleted widget)
  if (!selector[ownProps.viewId]) {
    selector[ownProps.viewId] = vivl(type, 'getDataFromCache')();
  }

  return {
    type,
    configuration,
    component: ViewTypeComponent,
    data: selector[ownProps.viewId](state, {
      ...ownProps,
      configuration,
      timelines: getTimebarTimelines(state, { timebarId: ownProps.timebarId }), // memoized
    })
};
};

// return function to avoid page grid layout and React DOM re-conciliation issue
export default () => connect(mapStateToProps)(ViewContainer);
