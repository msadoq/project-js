import _get from 'lodash/get';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getComponent } from '../../../VIVL/window';
import { getView } from '../../store/selectors/views';

import View from './View';

const ViewContainer = props => <View {...props} />;

ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { type, configuration } = getView(state, ownProps.viewId);
  const ViewTypeComponent = getComponent(type);

  const data = _get(state, ['viewData', ownProps.viewId], {});
  const visuWindow = _get(state, ['timebars', ownProps.timebarId, 'visuWindow']);

  return {
    type,
    configuration,
    component: ViewTypeComponent,
    data,
    visuWindow,
  };
};

// return function to avoid page grid layout and React DOM re-conciliation issue
export default () => connect(mapStateToProps)(ViewContainer);
