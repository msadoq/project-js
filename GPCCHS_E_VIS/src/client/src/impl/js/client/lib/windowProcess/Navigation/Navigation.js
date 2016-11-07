import React, { Component, PropTypes } from 'react';

import Debug from './Debug';

export default class Navigation extends Component {
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
