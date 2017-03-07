import React, { PureComponent, PropTypes } from 'react';


export default class Inspector extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.object,
  };

  static defaultProps = {
    data: 'no data to display',
  };

  render() {
    if (this.props.isLoading) {
      return (
        <div>Inspector is loading...</div>
      );
    }
    return (
      <div>Data: {JSON.stringify(this.props.data)}</div>
    );
  }
}
