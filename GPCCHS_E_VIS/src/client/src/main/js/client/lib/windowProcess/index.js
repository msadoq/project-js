import { ipcRenderer } from 'electron';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import HealthMonitor from './Window/HealthMonitor';
import WindowContainer from './Window/WindowContainer';
import makeCreateStore from './store';
import mainController from './controllers/main';
import { main } from './ipc';

const windowId = global.windowId; // see index.html

process.title = 'gpcchs_renderer';

// ipc with main
ipcRenderer.on('global', mainController);

if (global.parameters.get('WDYU') === 'on') {
  // eslint-disable-next-line global-require, "DV6 TBC_CNES Loaded at runtime only if activated"
  const { whyDidYouUpdate } = require('why-did-you-update');
  const excludeList = [
    'Connect', 'Glyphicon', 'NavItem', 'SafeAnchor', 'DraggableCore', 'Resizable',
    'ReactGridLayout', 'ResponsiveReactGridLayout', 'Button', 'Tabs', 'GridItem', 'Grid', 'Row',
    'Col', 'DropdownMenu', 'DropdownToggle', 'MenuItem', 'Tooltip', 'Modal',
  ];
  whyDidYouUpdate(React, {
    exclude: new RegExp(excludeList.join('|')),
  });
}

/**
 * Request initialState asynchronously from main process
 */
main.requestReduxCurrentState(({ state }) => {
  const store = makeCreateStore(global.parameters.get('DEBUG') === 'on')(state);

  render(
    <HealthMonitor windowId={windowId}>
      <Provider store={store}>
        <WindowContainer windowId={windowId} />
      </Provider>
    </HealthMonitor>,
    document.getElementById('root')
  );
});
