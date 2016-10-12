import React, { Component, PropTypes } from 'react';

export default class PlotView extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    interval: PropTypes.object.isRequired,
    configuration: PropTypes.object.isRequired,
    size: PropTypes.object.isRequired,
    // entryPoints: PropTypes.array.isRequired,
    // axes: PropTypes.array,
    // grids: PropTypes.array,
    // titleStyle: PropTypes.object,
    // links: PropTypes.array,
    // procedures: PropTypes.array,
    // defaultRatio: PropTypes.object,
    // legend: PropTypes.object,
    // markers: PropTypes.array,
  };
  render() {
    return (
      <div>
        ok plot view
        size: {this.props.size.width}x{this.props.size.height}
        {JSON.stringify(this.props.interval)}
        {JSON.stringify(this.props.data)}
      </div>
    );
  }
}
