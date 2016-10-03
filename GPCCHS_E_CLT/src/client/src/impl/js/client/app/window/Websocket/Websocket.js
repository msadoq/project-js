import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect, disconnect, getWebsocket } from '../../websocket/windowWebsocket';
import styles from './Status.css';

export default class Websocket extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    ws: PropTypes.object.isRequired,
    children: PropTypes.element,
  };
  componentDidMount() {
    connect(this.props.windowId);
  }
  componentWillUnmount() {
    disconnect();
  }
  render() {
    const isReady = getWebsocket() && _.get(this.props, 'ws.status') === 'authenticated';
    return isReady
      ? this.props.children
      : <div className={styles.errorpage_background}>
        <div className={styles.errorpage_transbox}>
          <p>Error connection (status: {_.get(this.props, 'ws.status')})</p>
        </div>
      </div>;
  }
}
