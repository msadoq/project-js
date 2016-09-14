import React, { Component, PropTypes } from 'react';

export default class ConnectedData extends Component {
  static propTypes = {
    formula: PropTypes.string,
    domain: PropTypes.string,
    timeline: PropTypes.string,
    filter: PropTypes.any, // TODO object or array?
  };
  componentDidMount() {
    console.log('send to websocket new param to start listening'); // TODO
  }
  componentWillUnmount() {
    console.log('send to websocket new param to stop'); // TODO
  }
  render() {
    return null;
  }
}
