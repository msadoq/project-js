import React, { Component, PropTypes } from 'react';

export default class PlotView extends Component {
  static propTypes = {
    type: React.PropTypes.string.isRequired,
    viewId: PropTypes.string.isRequired,
    entryPoints: PropTypes.array.isRequired,
    // connectedData: PropTypes.array.isRequired,
    axes: PropTypes.array,
    grids: PropTypes.array,
    titleStyle: PropTypes.object,
    links: PropTypes.array,
    procedures: PropTypes.array,
    defaultRatio: PropTypes.object,
    legend: PropTypes.object,
    markers: PropTypes.array,
  };
  render() {
    return (
      <div>
        {this.props.type}
        <br />
        {JSON.stringify(this.props.connectedData)}
      </div>
    );
  }
}
