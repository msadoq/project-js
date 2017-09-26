// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files. Possibility to add it in editor using context menu
// END-HISTORY
// ====================================================================

const knobe = '<!-- KNOBE -->\n' +
'<g transform="translate(220,240)">' +
  '<circle r="80" cx="100" cy="100" stroke="#FDE47F" transform="rotate(126, 100, 100)" stroke-width="10" fill="none" stroke-dasharray="402"></circle>' +
  '<g isis_animation="rotate" isis_ep="AGA_AM_PRIORITY" isis_domain="117,121" isis_angle="292" isis_center="50,50">' +
    '<path d="M100,30 l6,70 q-6,6 -12,0 z" style="fill: #666" transform="rotate(-0, 210, 90)" />' +
  '</g>' +
  '<text x="50" y="130" fill="#999" style="font-weight:bold;font-size:11px;">AGA_AM_PRIORITY</text>' +
  '<text x="14" y="170" fill="#999" style="font-weight:bold;font-size:11px">117</text>' +
  '<text x="92" y="8" fill="#999" style="font-weight:bold;font-size:11px">119</text>' +
  '<text x="168" y="170" fill="#999" style="font-weight:bold;font-size:11px">121</text>' +
'</g>';

export default knobe;
