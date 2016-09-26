import React from 'react';
import { render } from 'react-dom';
import WebsocketContainer from './Websocket/WebsocketContainer';
import WindowContainer from './Window/WindowContainer';
import { Provider } from 'react-redux';
import { initStore, getStore } from '../store/windowStore';
import debug from '../utils/debug';
import { remove } from '../store/mutations/hssActions';
import './global.css';
import '../shortcuts.global.css';

const logger = debug('window:index');

const search = global.location.search;
const windowId = search.replace('?windowId=', '');

initStore();

// TODO : factorize in separate module, test to embed in WebsocketContainer
window.addEventListener('beforeunload', () => {
  logger.info('onbeforeunload called');
  getStore().dispatch(remove(windowId));
});

render(
  <Provider store={getStore()}>
    <WebsocketContainer windowId={windowId}>
      <WindowContainer windowId={windowId} />
    </WebsocketContainer>
  </Provider>,
  document.getElementById('root')
);
