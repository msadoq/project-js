import React, { Component, PropTypes } from 'react';
import { getWebsocket } from '../../websocket/windowWebsocket';

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
        localId: cd.localId,
        dataId: cd.dataId,
      },
    });
  }
  componentWillUnmount() {
    const { windowId, cd } = this.props;
    getWebsocket().write({
      event: 'connectedDataClose',
      payload: {
        windowId: windowId,
        localId: cd.localId,
        dataId: cd.dataId,
      },
    });
  }
  render() {
    return <div>{`${this.props.cd.localId}`}</div>;
  }
}
