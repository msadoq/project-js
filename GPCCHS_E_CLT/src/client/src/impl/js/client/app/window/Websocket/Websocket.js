import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect, disconnect } from '../websocket';

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
    return _.get(this.props, 'ws.status') === 'authenticated'
      ? this.props.children
      : <div>status: {_.get(this.props, 'ws.status')}</div>; // TODO
  }
}
