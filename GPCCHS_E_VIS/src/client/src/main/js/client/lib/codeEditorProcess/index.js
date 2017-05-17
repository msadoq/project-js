import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { initStore } from '../store/isomorphic';
import { CodeEditorContainer } from './CodeEditorContainer';

process.title = 'gpcchs_editor';

const store = initStore();

render(
  <Provider store={store}>
    <CodeEditorContainer />
  </Provider>,
  document.getElementById('root')
);
