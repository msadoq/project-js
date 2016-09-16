import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

export default class PlotView extends Component {
  static propTypes = {
    type: React.PropTypes.string.isRequired,
    viewId: PropTypes.string.isRequired,
    configuration: PropTypes.object.isRequired,
    state: PropTypes.object,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
    unmountAndRemove: PropTypes.func,
  };
  render() {
    const entryPoints = _.get(this.props, 'configuration.plotViewEntryPoints');
    if (!entryPoints || !entryPoints.length) {
      return <div>invalid configuration for plot</div>; // TODO
    }

    const entryPointsText = _.map(entryPoints, ep => {
      const x = this.props.state.connectedData[ep.connectedDataX.uuid];
      const y = this.props.state.connectedData[ep.connectedDataY.uuid];
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
