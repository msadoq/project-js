import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import makeCreateStore from '../store/createStore';
import { CodeEditorContainer } from './CodeEditorContainer';

process.title = 'gpcchs_editor';

const store = makeCreateStore('renderer', global.parameters.get('DEBUG') === 'on')();

render(
  <Provider store={store}>
    <CodeEditorContainer />
  </Provider>,
  document.getElementById('root')
);
