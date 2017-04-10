import React, { PropTypes, PureComponent } from 'react';

export default class PacketView extends PureComponent {
  static propTypes = {
    data: PropTypes.shapeOf({
      indexes: PropTypes.object.isRequired,
      values: PropTypes.object.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <div />
    );
  }
}
