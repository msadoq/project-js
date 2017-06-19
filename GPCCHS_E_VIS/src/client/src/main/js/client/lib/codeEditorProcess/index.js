import { ipcRenderer } from 'electron';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import makeCreateStore from '../windowProcess/store';
import { CodeEditorContainer } from './CodeEditorContainer';
import mainController from '../windowProcess/controllers/main';

process.title = 'gpcchs_editor';

// ipc with main
ipcRenderer.on('global', mainController);

const store = makeCreateStore('renderer', global.parameters.get('DEBUG') === 'on')();

render(
  <Provider store={store}>
    <CodeEditorContainer />
  </Provider>,
  document.getElementById('root')
);
