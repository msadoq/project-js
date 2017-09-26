// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : StateColors serialized in localid and present in viewData
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : WDYU is now activated with configuration parameter (WDYU)
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and un-needed relaxations
// VERSION : 1.1.2 : DM : #5828 : 25/04/2017 : Cleanup windows HTML and loading scripts
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Implement a new "isomorphic" createStore to centralize Redux configuration
// VERSION : 1.1.2 : DM : #5828 : 16/05/2017 : Cleanup Redux store configuration and introduce three distinct store enhancers for future store synchronisation implementation.
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 19/06/2017 : Remove obsolete arguments in renderer process store creator
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Change windowProcess health management to dispatch a Redux action directly.
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add mock delay in profiling loop event - Try to add middlware to induce stress => not possible - Modify health logic, change as soon as the critical delay is reached
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add health mechanism on each process
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Modify health monitoring mechanism : - Handle properly start and stop - Add critical delay value in conf - Only start monitoring on DEBUG
// END-HISTORY
// ====================================================================

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
import { get } from '../common/configurationManager';

const windowId = global.windowId; // see index.html
const HEALTH_CRITICAL_DELAY = get('RENDERER_HEALTH_CRITICAL_DELAY');
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
  const debugEnable = global.parameters.get('DEBUG') === 'on';
  const store = makeCreateStore(debugEnable)(state);

  /* Start Health Monitoring mechanism
  On a status change, the Window Health status is updated
  */
  let monitoringProps = {};
  if (debugEnable) {
    monitoringProps = eventLoopMonitoring({
      criticalDelay: HEALTH_CRITICAL_DELAY,
      onStatusChange: status => store.dispatch(updateWindowStatus(windowId, status)),
      id: 'windows',
    }, store);
  }

  render(
    <Provider store={store}>
      <HealthMonitor windowId={windowId} {...monitoringProps}>
        <WindowContainer windowId={windowId} />
      </HealthMonitor>
    </Provider>,
    document.getElementById('root')
  );
});
