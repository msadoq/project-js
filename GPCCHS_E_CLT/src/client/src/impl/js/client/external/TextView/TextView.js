import React, { Component, PropTypes } from 'react';

export default class TextView extends Component {
  static propTypes = {
    type: React.PropTypes.string.isRequired,
    viewId: PropTypes.string.isRequired,
    entryPoints: PropTypes.array.isRequired,
    connectedData: PropTypes.array.isRequired,
    links: PropTypes.array,
    defaultRatio: PropTypes.object,
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
