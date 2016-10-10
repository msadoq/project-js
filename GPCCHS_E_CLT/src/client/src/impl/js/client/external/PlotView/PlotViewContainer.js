import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import PlotView from './PlotView';
import plotView from './main';
import remoteId from '../../lib/common/remoteId';

const PlotViewContainer = props => <PlotView {...props} />;

function mapStateToProps(state, ownProps) {
  const { configuration } = ownProps;
  console.log(ownProps);
  return {
    ...ownProps,
    entryPoints: _.get(configuration, 'plotViewEntryPoints', []),
//    connectedData: plotView.getConnectedDataFromState(state, _.get(ownProps, 'viewId')),
    axes: _.get(configuration, 'axes', []),
    grids: _.get(configuration, 'grids', []),
    titleStyle: _.get(configuration, 'titleStyle'),
    links: _.get(configuration, 'links', []),
    procedures: _.get(configuration, 'procedures', []),
    defaultRatio: _.get(configuration, 'defaultRatio', {}),
    legend: _.get(configuration, 'legend', {}),
    markers: _.get(configuration, 'markers', []),
  };
}

export default connect(mapStateToProps)(PlotViewContainer);
