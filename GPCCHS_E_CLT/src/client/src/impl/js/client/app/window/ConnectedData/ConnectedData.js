import React, { Component, PropTypes } from 'react';
import { getWebsocket } from '../websocket';

export default class ConnectedData extends Component {
  static propTypes = {
    connectedDataId: PropTypes.string.isRequired,
    formula: PropTypes.string,
    domain: PropTypes.string,
    timeline: PropTypes.string,
    filter: PropTypes.any, // TODO object or array?
  };
  componentDidMount() {
    console.log('send to websocket new param to start listening'); // TODO
    getWebsocket().write({
      event: 'connectedDataOpen',
      payload: {
        connectedDataId: this.props.connectedDataId,
        formula: this.props.formula,
        domain: this.props.domain,
        timeline: this.props.timeline,
        filter: this.props.filter,
      },
    });
  }
  componentWillUnmount() {
    console.log('send to websocket new param to stop'); // TODO
    getWebsocket().write({
      event: 'connectedDataClose',
      payload: {
        connectedDataId: this.props.connectedDataId,
      },
    });
  }
  render() {
    return null;
  }
}
