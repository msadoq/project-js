import React from 'react';
import Websocket from '../components/Window/Websocket';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { websocketStubToggle } from '../actions/websocket';

const WebsocketContainer = props => <Websocket {...props} />;

function mapStateToProps(state) {
  return state.websocket;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    disconnect: () => {},
    connect: () => {},
    toggleStub: websocketStubToggle,
  }, dispatch);
  // TODO use IPC communication to request main?
}

export default connect(mapStateToProps, mapDispatchToProps)(WebsocketContainer);
