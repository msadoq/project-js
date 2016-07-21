import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import WindowContainer from './containers/WindowContainer';
import './app.global.css';
import './shortcuts.global.css';

const search = global.location.search;
const windowId = search.replace('?windowId=', '');

const store = require('./store/rendererStore')(
  null,
  process.env.NODE_ENV === 'development'
);

render(
  <Provider store={store}>
    <WindowContainer windowId={windowId} />
  </Provider>,
  document.getElementById('root')
);
