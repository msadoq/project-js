import React from 'react';

const Triangle = () => (
  <svg width="12 " height="12" xmlns="http://www.w3.org/2000/svg">
    <g>
      <title>background</title>
      <rect fill="none" id="canvas_background" height="12" width="12" y="-1" x="-1" />
      <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
        <rect fill="url(#gridpattern)" strokeWidth="0" y="0" x="0" height="100%" width="100%" />
      </g>
    </g>
    <g>
      <title>Layer 1</title>
      <path id="svg_5" d="m2.568685,9.128659l3.562819,-6.572034l3.562818,6.572034l-7.125636,0z" fillOpacity="null" strokeOpacity="null" strokeWidth="1" stroke="#000" fill="#000000" />
    </g>
  </svg>
);

export default Triangle;
