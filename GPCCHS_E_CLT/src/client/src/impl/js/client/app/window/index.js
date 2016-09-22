import React from 'react';
import { render } from 'react-dom';
import WebsocketContainer from './Websocket/WebsocketContainer';
import WindowContainer from './Window/WindowContainer';
import { Provider } from 'react-redux';
import { initStore, getStore } from '../store/windowStore';
import './global.css';
import '../shortcuts.global.css';

const search = global.location.search;
const windowId = search.replace('?windowId=', '');

initStore();

render(
  <Provider store={getStore()}>
    <WebsocketContainer windowId={windowId}>
      <WindowContainer windowId={windowId} />
    </WebsocketContainer>
  </Provider>,
  document.getElementById('root')
);
