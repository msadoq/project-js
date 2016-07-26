import React, { Component, PropTypes } from 'react';

export default class View extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    points: PropTypes.any,
  };
  render() {
    return (
      <div>
        <pre>
          {JSON.stringify(this.props.points)}
        </pre>
      </div>
    );
  }
}
