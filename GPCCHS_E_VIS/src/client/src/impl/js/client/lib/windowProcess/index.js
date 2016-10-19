import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import WindowContainer from './Window/WindowContainer';
import WebsocketContainer from './Websocket/WebsocketContainer';
import debug from '../common/debug/windowDebug';
import { initStore, getStore } from '../store/windowStore';
import { remove } from '../store/actions/hss';
import { disconnect } from '../common/websocket/windowWebsocket';
import './global.css';
import '../shortcuts.global.css';

const logger = debug('window:index');

const search = global.location.search;
const windowId = search.replace('?windowId=', '');

initStore();

if (process.env.NODE_ENV === 'development') {
  // Enable why-did-you-update when necessary only
  window.whyDidYouUpdate = () => {
    // eslint-disable-next-line global-require
    const { whyDidYouUpdate } = require('why-did-you-update');
    const internal = [
      'Connect'
    ];
    const dependencies = [
      'Glyphicon', 'NavItem', // Bootstrap
      'SafeAnchor', 'DraggableCore', 'Resizable',
      'ReactGridLayout', 'ResponsiveReactGridLayout',
      'SizeMeReferenceWrapper', 'Button', 'Tabs', 'GridItem'
    ];
    const excludeList = internal.concat(dependencies).join('|');
    whyDidYouUpdate(React, {
      exclude: new RegExp(excludeList)
    });
    window.whyDidYouUpdate.loaded = true;
  };
}

// TODO : factorize in separate module, test to embed in WebsocketContainer
window.addEventListener('beforeunload', () => {
  logger.info('onbeforeunload called');
  disconnect();
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
