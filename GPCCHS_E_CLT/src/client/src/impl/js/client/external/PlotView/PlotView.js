import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

export default class PlotView extends Component {
  static propTypes = {
    type: React.PropTypes.string.isRequired,
    viewId: PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    entryPoints: PropTypes.array.isRequired,
    cData: PropTypes.object.isRequired,
    axes: PropTypes.array,
    grids: PropTypes.array,
    titleStyle: PropTypes.object,
    links: PropTypes.array,
    procedures: PropTypes.array,
    defaultRatio: PropTypes.object,
    legend: PropTypes.object,
    markers: PropTypes.array,
    state: PropTypes.object,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
    unmountAndRemove: PropTypes.func,
  };
  render() {
    if (!this.props.entryPoints || !this.props.entryPoints.length) {
      return <div>invalid configuration for plot</div>; // TODO
    }

    const entryPointsText = _.map(this.props.entryPoints, ep => {
      const x = this.props.cData[ep.connectedDataX.uuid];
      const y = this.props.cData[ep.connectedDataY.uuid];
      return `x:${x.formula} /// y:${y.formula}`;
    });

    return (
      <div>
        {this.props.type}
        <br />
        {entryPointsText}
      </div>
    );
  }
}
