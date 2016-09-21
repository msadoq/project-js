import React, { Component, PropTypes } from 'react';
import { getWebsocket } from '../websocket';

export default class Subscription extends Component {
  static propTypes = {
    windowId: PropTypes.string,
    connectedDataId: PropTypes.string.isRequired,
    catalog: PropTypes.string,
    parameterName: PropTypes.string,
    comObject: PropTypes.string,
    sessionId: PropTypes.number,
    domainId: PropTypes.number,
  };
  componentDidMount() {
    getWebsocket().write({
      event: 'connectedDataOpen',
      payload: {
        windowId: this.props.windowId,
        connectedDataId: this.props.connectedDataId,
        catalog: this.props.catalog,
        parameterName: this.props.parameterName,
        comObject: this.props.comObject,
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
        catalog: this.props.catalog,
        parameterName: this.props.parameterName,
        comObject: this.props.comObject,
        sessionId: this.props.sessionId,
        domainId: this.props.domainId,
      },
    });
  }
  render() {
    return null;
  }
}
