import React, { PureComponent, PropTypes } from 'react';

import Debug from './Debug';

export default class Navigation extends PureComponent {
  static propTypes = {
    windowId: PropTypes.string,
    focusedPageId: PropTypes.string,
  };
  render() {
    return (
      <Debug
        windowId={this.props.windowId}
        focusedPageId={this.props.focusedPageId}
      />
    );
  }
}
