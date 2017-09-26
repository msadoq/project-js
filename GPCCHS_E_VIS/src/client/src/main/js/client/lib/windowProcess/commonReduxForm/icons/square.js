// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// END-HISTORY
// ====================================================================

import React from 'react';

const Square = () => (
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
      <rect id="svg_1" height="8" width="8" y="3" x="2" strokeWidth="1" stroke="#000" fill="#000000" />
    </g>
  </svg>
);

export default Square;
