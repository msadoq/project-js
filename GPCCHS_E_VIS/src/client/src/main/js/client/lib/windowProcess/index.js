import React from 'react';
import { ipcRenderer } from 'electron';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import monitoring from 'common/log/monitoring';
import WindowContainer from './Window/WindowContainer';
import { initStore, getStore } from '../store/windowStore';
import CircuitBreaker from './CircuitBreaker';
import mainController from './controllers/main';

const search = global.location.search;
const windowId = search.replace('?windowId=', '');

process.title = 'gpcchs_renderer';

monitoring.start();

// store
initStore();

// ipc with main
ipcRenderer.on('global', mainController);

if (global.parameters.get('DEBUG') === 'on') {
  // Enable why-did-you-update when necessary only
  window.whyDidYouUpdate = () => {
    // eslint-disable-next-line global-require
    const { whyDidYouUpdate } = require('why-did-you-update');
    const internal = [
      'Connect'
    ];
    const dependencies = [
      'Glyphicon', 'NavItem', 'SafeAnchor', 'DraggableCore', 'Resizable', 'ReactGridLayout',
      'ResponsiveReactGridLayout', 'Button', 'Tabs', 'GridItem',
      'Grid', 'Row', 'Col', 'DropdownMenu', 'DropdownToggle', 'MenuItem', 'Tooltip',
      'Modal'
    ];
    const excludeList = internal.concat(dependencies).join('|');
    whyDidYouUpdate(React, {
      // include: /^View$/,
      exclude: new RegExp(excludeList)
    });
    window.whyDidYouUpdate.loaded = true;
  };
}

const store = getStore();
CircuitBreaker({
  store,
  windowId,
});

render(
  <Provider store={store}>
    <WindowContainer windowId={windowId} />
  </Provider>,
  document.getElementById('root')
);
