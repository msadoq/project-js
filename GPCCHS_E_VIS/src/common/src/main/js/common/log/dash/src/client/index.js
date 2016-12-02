import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/Root';

let root = document.getElementById('root');
if (!root) {
  root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
}

ReactDOM.render(
  <Root />,
  root
)
