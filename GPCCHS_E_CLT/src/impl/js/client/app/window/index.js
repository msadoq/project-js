import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { initStore, getStore } from '../store/windowStore';
import WindowContainer from '../containers/WindowContainer';
import './global.css';
import '../shortcuts.global.css';

const search = global.location.search;
const windowId = search.replace('?windowId=', '');

initStore();

render(
  <Provider store={getStore()}>
    <WindowContainer windowId={windowId} />
  </Provider>,
  document.getElementById('root')
);
