import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

export default class TextView extends Component {
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
    const entryPoints = _.get(this.props, 'configuration.textViewEntryPoints');
    if (!entryPoints || !entryPoints.length) {
      return <div>invalid configuration for text</div>; // TODO
    }

    const entryPointsText = _.map(entryPoints, ep => {
      const e = this.props.state.connectedData[ep.connectedData.uuid];
      return `entryPoint:${e.formula} <br />`;
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
