import React from 'react';

const Dot = () => (
  <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
    <g>
      <title>background</title>
      <rect fill="none" id="canvas_background" height="12" width="12" y="-1" x="-1" />
      <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
        <rect fill="url(#gridpattern)" strokeWidth="0" y="0" x="0" height="100%" width="100%" />
      </g>
    </g>
    <g>
      <title>Layer 1</title>
      <ellipse ry="4" rx="4" id="svg_4" cy="7" cx="6" fillOpacity="null" strokeOpacity="null" strokeWidth="1" stroke="#000" fill="#000000" />
    </g>
  </svg>
);

export default Dot;
