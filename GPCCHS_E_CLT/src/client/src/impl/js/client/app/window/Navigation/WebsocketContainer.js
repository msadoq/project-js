import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Websocket from './Websocket';
import { getStatus } from '../../store/mutations/hssReducer';

const WebsocketContainer = props => <Websocket {...props} />;

function mapStateToProps(state) {
  return getStatus(state);
}

export default connect(mapStateToProps)(WebsocketContainer);
