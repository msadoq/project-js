import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { initStore, getStore } from '../store/windowStore';
import { EditorContainer } from './EditorContainer';

process.title = 'gpcchs_editor';

// store
initStore();

const store = getStore();

render(
  <Provider store={store}>
    <EditorContainer />
  </Provider>,
  document.getElementById('root')
);
