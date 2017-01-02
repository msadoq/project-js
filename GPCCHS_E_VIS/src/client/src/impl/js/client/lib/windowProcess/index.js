import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import monitoring from 'common/monitoring';
import { init } from '../ipc/window';
import WindowContainer from './Window/WindowContainer';
import { initStore, getStore } from '../store/windowStore';
import CircuitBreaker from './CircuitBreaker';

const search = global.location.search;
const windowId = search.replace('?windowId=', '');

process.title = 'gpcchs_renderer';

monitoring.start();

// store
initStore();

// ipc
init();

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
      'Grid', 'Row', 'Col', 'DropdownMenu', 'DropdownToggle', 'MenuItem'
    ];
    const excludeList = internal.concat(dependencies).join('|');
    whyDidYouUpdate(React, {
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
