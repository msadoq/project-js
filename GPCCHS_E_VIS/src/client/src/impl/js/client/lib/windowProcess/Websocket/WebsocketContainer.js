import React from 'react';
import { connect } from 'react-redux';
import { getStatus } from '../../store/selectors/hss';
import Websocket from './Websocket';

const WebsocketContainer = props => <Websocket {...props} />;

const mapStateToProps = (state, props) => ({
  ws: getStatus(state, props.windowId)
});

export default connect(mapStateToProps)(WebsocketContainer);
