import React, { PropTypes, PureComponent } from 'react';

export default class HistoryView extends PureComponent {
  static propTypes = {
    data: PropTypes.shapeOf({
      indexes: PropTypes.object.isRequired,
      values: PropTypes.object.isRequired,
    }),
  };

  render() {
    return (
      <div />
    );
  }
}
