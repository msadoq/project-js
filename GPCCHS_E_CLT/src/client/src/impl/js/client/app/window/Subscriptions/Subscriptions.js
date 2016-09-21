import React, { Component, PropTypes } from 'react';
import { getWebsocket } from '../websocket';

export default class Subscription extends Component {
  static propTypes = {
    windowId: PropTypes.string,
    connectedDataId: PropTypes.string.isRequired,
    formula: PropTypes.string,
    sessionId: PropTypes.string,
    domainId: PropTypes.string,
  };
  componentDidMount() {
    getWebsocket().write({
      event: 'connectedDataOpen',
      payload: {
        windowId: this.props.windowId,
        connectedDataId: this.props.connectedDataId,
        formula: this.props.formula,
        sessionId: this.props.sessionId,
        domainId: this.props.domainId,
      },
    });
  }
  componentWillUnmount() {
    getWebsocket().write({
      event: 'connectedDataClose',
      payload: {
        windowId: this.props.windowId,
        connectedDataId: this.props.connectedDataId,
        formula: this.props.formula,
        sessionId: this.props.sessionId,
        domainId: this.props.domainId,
      },
    });
  }
  render() {
    return null;
  }
}
