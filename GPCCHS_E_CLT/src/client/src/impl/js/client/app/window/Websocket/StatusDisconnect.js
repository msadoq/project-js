import React, { Component, PropTypes } from 'react';

export default class Disconnect extends Component {
  static propTypes = {
    type: React.PropTypes.string,
    windowId: PropTypes.string.isRequired,
  };
  render() {
    return (
      <div> Window #{this.props.windowId}
        has disconnected
        type: {this.props.type}
        state: {this.prpos.status}
      </div>
    );
  }
}
