import React, { Component, PropTypes } from 'react';

export default class TextView extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    data: PropTypes.any,
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
        ok text view ({this.props.viewId})
        size: {this.props.size.width}x{this.props.size.height}
        <br />
        {JSON.stringify(this.props.interval)}
        <br />
        {JSON.stringify(this.props.data)}
      </div>
    );
  }
}
