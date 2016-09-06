import React from 'react';
import Websocket from '../components/Window/Websocket';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const WebsocketContainer = props => <Websocket {...props} />;

function mapStateToProps(state) {
  return state.mainWebsocket;
}

export default connect(mapStateToProps)(WebsocketContainer);
