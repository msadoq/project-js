import React, { Component, PropTypes } from 'react';
import WebsocketContainer from './WebsocketContainer';
import TabsContainer from './TabsContainer';

export default class Navigation extends Component {
  static contextTypes = {
    windowId: PropTypes.string,
  };
  render() {
    return (
      <div>
        <WebsocketContainer />
        <TabsContainer windowId={this.context.windowId} />
      </div>
    );
  }
}
