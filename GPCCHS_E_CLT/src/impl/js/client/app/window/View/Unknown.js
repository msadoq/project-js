import React, { Component, PropTypes } from 'react';

export default class View extends Component {
  static propTypes = {
    type: React.PropTypes.string,
    viewId: PropTypes.string.isRequired,
  };
  render() {
    return (
      <div>View #{this.props.viewId} has unknown type: '{this.props.type}'</div>
    );
  }
}
