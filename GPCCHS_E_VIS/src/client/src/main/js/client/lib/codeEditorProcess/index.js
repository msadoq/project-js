import { ipcRenderer } from 'electron';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import makeCreateStore from '../windowProcess/store';
import { CodeEditorContainer } from './CodeEditorContainer';
import mainController from '../windowProcess/controllers/main';
import { main } from '../windowProcess/ipc';

process.title = 'gpcchs_editor';

// ipc with main
ipcRenderer.on('global', mainController);

/**
 * Request initialState asynchronously from main process
 */
main.requestReduxCurrentState(({ state }) => {
  const store = makeCreateStore('renderer', global.parameters.get('DEBUG') === 'on')(state);

  render(
    <Provider store={store}>
      <CodeEditorContainer />
    </Provider>,
    document.getElementById('root')
  );
});
