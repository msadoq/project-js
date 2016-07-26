import React from 'react';
import Websocket from '../components/Websocket';
import { connect } from 'react-redux';

const WebsocketContainer = props => <Websocket {...props} />;

function mapStateToProps(state) {
  return state.websocket;
}

function mapDispatchToProps() {
  // TODO use IPC communication to request main
  return {
    disconnect: () => {},
    connect: () => {},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WebsocketContainer);
