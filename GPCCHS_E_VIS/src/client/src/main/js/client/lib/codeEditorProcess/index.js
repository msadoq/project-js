// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 21/02/2017 : Improve and debug code editor
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Implement a new "isomorphic" createStore to centralize Redux configuration
// VERSION : 1.1.2 : DM : #5828 : 16/05/2017 : Cleanup Redux store configuration and introduce three distinct store enhancers for future store synchronisation implementation.
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 19/06/2017 : Remove obsolete arguments in renderer process store creator
// END-HISTORY
// ====================================================================

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
