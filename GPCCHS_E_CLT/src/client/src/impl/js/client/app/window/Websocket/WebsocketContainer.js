import React from 'react';
import { connect } from 'react-redux';
import { getStatus } from '../../store/selectors/hss';
import Websocket from './Websocket';

const WebsocketContainer = props => <Websocket {...props} />;

function mapStateToProps(state, { windowId, children }) {
  return {
    windowId,
    ws: getStatus(state, windowId) || { status: 'disconnected' },
    children,
  };
}
export default connect(mapStateToProps)(WebsocketContainer);
