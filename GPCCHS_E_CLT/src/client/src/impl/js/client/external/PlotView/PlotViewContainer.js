import React from 'react';
import { connect } from 'react-redux';
import { getView } from '../../app/store/mutations/viewReducer';
import PlotView from './PlotView';
import { getConnectedDataFromState } from './main';

const PlotViewContainer = props => <PlotView {...props} />;

function mapStateToProps(state, { viewId, type }) {
  const { title, configuration } = getView(state, viewId);
  const axes = _.get(configuration, 'axes', []);
  const grids = _.get(configuration, 'grids', []);
  const entryPoints = _.get(configuration, 'plotViewEntryPoints', []);
  const cData = getConnectedDataFromState(state, entryPoints);
  const titleStyle = _.get(configuration, 'titleStyle');
  const links = _.get(configuration, 'links', []);
  const procedures = _.get(configuration, 'procedures', []);
  const defaultRatio = _.get(configuration, 'defaultRatio', {});
  const legend = _.get(configuration, 'legend', {});
  const markers = _.get(configuration, 'markers', []);

  return {
    viewId,
    type,
    title,
    entryPoints,
    cData,
    axes,
    grids,
    titleStyle,
    links,
    procedures,
    defaultRatio,
    legend,
    markers,
    state,
  };
}

export default connect(mapStateToProps)(PlotViewContainer);
