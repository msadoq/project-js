/* eslint import/no-webpack-loader-syntax:0 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import '!style!css!react-grid-layout/css/styles.css';
import '!style!css!react-resizable/css/styles.css';

import WindowContainer from './Window/WindowContainer';
import { initStore, getStore } from '../store/windowStore';

const search = global.location.search;
const windowId = search.replace('?windowId=', '');

process.title = 'HSC_WINDOW';

initStore();

if (process.env.NODE_ENV === 'development') {
  // Enable why-did-you-update when necessary only
  window.whyDidYouUpdate = () => {
    // eslint-disable-next-line global-require
    const { whyDidYouUpdate } = require('why-did-you-update');
    const internal = [
      'Connect'
    ];
    const dependencies = [
      'Glyphicon', 'NavItem', 'SafeAnchor', 'DraggableCore', 'Resizable', 'ReactGridLayout',
      'ResponsiveReactGridLayout', 'SizeMeReferenceWrapper', 'Button', 'Tabs', 'GridItem',
      'Grid', 'Row', 'Col', 'DropdownMenu', 'DropdownToggle', 'MenuItem'
    ];
    const excludeList = internal.concat(dependencies).join('|');
    whyDidYouUpdate(React, {
      exclude: new RegExp(excludeList)
    });
    window.whyDidYouUpdate.loaded = true;
  };
}

// window.addEventListener('beforeunload', () => {
//   logger.info('onbeforeunload called');
//   // could implement before close logic here
// });

render(
  <Provider store={getStore()}>
    <WindowContainer windowId={windowId} />
  </Provider>,
  document.getElementById('root')
);
