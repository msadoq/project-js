import { ipcRenderer } from 'electron';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import HealthMonitor from './Window/HealthMonitor';
import WindowContainer from './Window/WindowContainer';
import makeCreateStore from './store';
import mainController from './controllers/main';
import { main } from './ipc';
import eventLoopMonitoring from '../common/eventLoopMonitoring';
import { updateWindowStatus } from '../store/actions/health';

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

  /* Start Health Monitoring mechanism
  On a status change, the Window Health status is updated
  */
  const { start, stop } = eventLoopMonitoring({
    intervalDelay: 250,
    criticalDelay: 500,
    onStatusChange: status => store.dispatch(updateWindowStatus(windowId, status)),
  });

  render(
    <Provider store={store}>
      <HealthMonitor windowId={windowId} startMonitoring={start} stopMonitoring={stop}>
        <WindowContainer windowId={windowId} />
      </HealthMonitor>
    </Provider>,
    document.getElementById('root')
  );
});
