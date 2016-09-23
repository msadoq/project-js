import React, { Component, PropTypes } from 'react';
import { getWebsocket } from '../websocket';

export default class Subscription extends Component {
  static propTypes = {
    windowId: PropTypes.string,
    cd: PropTypes.object.isRequired,
  };
  componentDidMount() {
    const { windowId, cd } = this.props;
    getWebsocket().write({
      event: 'connectedDataOpen',
      payload: {
        windowId: windowId,
        dataId: {
          catalog: cd.catalog,
          parameterName: cd.parameterName,
          comObject: cd.comObject,
          sessionId: cd.sessionId,
          domainId: cd.domainId,
        },
      },
    });
  }
  componentWillUnmount() {
    const { windowId, cd } = this.props;
    getWebsocket().write({
      event: 'connectedDataClose',
      payload: {
        windowId: windowId,
        dataId: {
          catalog: cd.catalog,
          parameterName: cd.parameterName,
          comObject: cd.comObject,
          sessionId: cd.sessionId,
          domainId: cd.domainId,
        },
      },
    });
  }
  render() {
    return <div>{`${this.props.cd.catalog}.${this.props.cd.parameterName}<${this.props.cd.comObject}>@${this.props.cd.domainId}:${this.props.cd.sessionId}`}</div>;
  }
}
