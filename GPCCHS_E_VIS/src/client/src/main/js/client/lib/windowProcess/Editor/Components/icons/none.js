import React from 'react';

const None = () => (
  <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
    <g>
      <title>background</title>
      <rect fill="none" id="canvas_background" height="12" width="12" y="-1" x="-1" />
      <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
        <rect fill="url(#gridpattern)" strokeWidth="0" y="0" x="0" height="100%" width="100%" />
      </g>
    </g>
  </svg>
);

export default None;
