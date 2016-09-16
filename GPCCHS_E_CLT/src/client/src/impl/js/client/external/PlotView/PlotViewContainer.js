import React from 'react';
import { connect } from 'react-redux';
import { getView } from '../../app/store/mutations/viewReducer';
import PlotView from './PlotView';

const PlotViewContainer = props => <PlotView {...props} />;

function mapStateToProps(state, { viewId, type }) {
  const { title, configuration } = getView(state, viewId);

  return {
    viewId,
    type,
    title,
    configuration,
    state,
  };
}

export default connect(mapStateToProps)(PlotViewContainer);
