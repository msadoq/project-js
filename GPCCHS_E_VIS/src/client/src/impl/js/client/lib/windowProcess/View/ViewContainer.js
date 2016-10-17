import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import vivl from '../../../VIVL/main';
import { getComponent } from '../../../VIVL/window';
import { getView } from '../../store/selectors/views';
import { getTimebar } from '../../store/selectors/timebars';

import View from './View';

let selector = null;

const ViewContainer = props => <View {...props} />;

ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { type, configuration } = getView(state, ownProps.viewId);

  const ViewTypeComponent = getComponent(type);
  const viewTypeSelector = vivl(type, 'getDataFromCache');
  if (!selector) {
    selector = vivl(type, 'getDataFromCache')();
  }

  // current visualisation window
  const timebar = getTimebar(state, ownProps.timebarId);

  return {
    type,
    configuration,
    component: ViewTypeComponent,
    selector: viewTypeSelector,
    interval: timebar.visuWindow,
    data: selector(state, { ...ownProps, configuration }),
  };
};

export default connect(mapStateToProps)(ViewContainer);
