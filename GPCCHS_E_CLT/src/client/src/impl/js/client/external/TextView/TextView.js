import React, { Component, PropTypes } from 'react';

export default class TextView extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    interval: PropTypes.object.isRequired,
    configuration: PropTypes.object.isRequired,
    size: PropTypes.object.isRequired,
    // entryPoints: PropTypes.array.isRequired,
    // links: PropTypes.array,
    // defaultRatio: PropTypes.object,
  };
  render() {
    return (
      <div>
        ok text view
        size: {this.props.size.width}x{this.props.size.height}
        {JSON.stringify(this.props.interval)}
        {JSON.stringify(this.props.data)}
      </div>
    );
  }
}
