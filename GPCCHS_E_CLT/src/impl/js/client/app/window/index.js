import React from 'react';
import { render } from 'react-dom';
import WindowIdProvider from './Window/WindowIdProvider';
import WindowContainer from './Window/WindowContainer';
import { Provider } from 'react-redux';
import { initStore, getStore } from '../store/windowStore';
import './global.css';
import '../shortcuts.global.css';

const search = global.location.search;
const windowId = search.replace('?windowId=', '');

initStore();

setTimeout(() => {
  render(
    <Provider store={getStore()}>
      <WindowIdProvider windowId={windowId}>
        <WindowContainer windowId={windowId} />
      </WindowIdProvider>
    </Provider>,
    document.getElementById('root')
  );
}, 150);
