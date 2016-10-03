import React, { Component, PropTypes } from 'react';
import SizeMe from 'react-sizeme';


class PlotView extends Component {
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
        {JSON.stringify(this.props.size)}
        <br />
        {JSON.stringify(this.props.connectedData)}
      </div>
    );
  }
}
export default (PlotView);
