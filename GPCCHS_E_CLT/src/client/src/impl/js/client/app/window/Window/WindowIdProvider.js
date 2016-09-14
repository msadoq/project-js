import React, { Component, PropTypes } from 'react';

export default class WindowIdProvider extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    children: PropTypes.element,
  };
  static childContextTypes = {
    windowId: PropTypes.string,
  };
  getChildContext() {
    return {
      windowId: this.props.windowId,
    };
  }
  render() {
    return this.props.children;
  }
}
