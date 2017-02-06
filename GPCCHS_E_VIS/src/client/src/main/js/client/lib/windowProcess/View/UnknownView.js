import React, { PureComponent, PropTypes } from 'react';

export default class UnknownView extends PureComponent {
  static propTypes = {
    type: React.PropTypes.string,
    viewId: PropTypes.string.isRequired,
  };

  static defaultProps = {
    type: '',
  };

  render() {
    return (
      <div>View #{this.props.viewId} has unknown type: {this.props.type}</div>
    );
  }
}
