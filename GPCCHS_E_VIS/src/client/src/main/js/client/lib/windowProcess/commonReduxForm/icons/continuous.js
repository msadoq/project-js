// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// END-HISTORY
// ====================================================================

import React from 'react';

const Continuous = () => (
  <svg width="90%" height="12">
    <g>
      <title>background</title>
      <rect fill="none" id="canvas_background" height="22" width="70" y="-1" x="-1" />
      <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
        <rect fill="url(#gridpattern)" strokeWidth="0" y="0" x="0" height="100%" width="100%" />
      </g>
    </g>
    <g>
      <title>Layer 1</title>
      <line strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_1" y2="7" x2="55" y1="7" x1="5" strokeWidth="2" stroke="#333" fill="none" />
    </g>
  </svg>
);

export default Continuous;
