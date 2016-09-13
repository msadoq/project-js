import React, { Component, PropTypes } from 'react';
import WebsocketContainer from './WebsocketContainer';
import TabsContainer from './TabsContainer';

export default class Navigation extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
  };
  render() {
    return (
      <div>
        <WebsocketContainer />
        <TabsContainer
          windowId={this.props.windowId}
          pageId={this.props.pageId}
        />
      </div>
    );
  }
}
