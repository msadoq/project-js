import React from 'react';

import Log from './Log';

export default ({logs}) => (
  <ul>
    {logs.map((l,i) => <Log key={i} {...l} />)}
  </ul>
);
