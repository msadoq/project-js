// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files. Possibility to add it in editor using context menu
// END-HISTORY
// ====================================================================

const vSlider = '<!-- VERTICAL SLIDER -->\n' +
'<g transform="translate(140,120)">\n\t' +
' <path d="M28,10 l6,0 l0,200, l-6,0 z" style=" fill: #DDD; stroke: #BBB;" />\n\t' +
' <g isis_animation="translateY" isis_ep="AGA_AM_PRIORITY" isis_domain="117,120" isis_width="200" isis_direction="top">\n\t\t' +
'   <g isis_animation="colour" isis_ep="AGA_AM_PRIORITY" isis_operators="<=$118$#EEE*>$118$#F70*>$119$#F11">\n\t\t\t' +
'     <ellipse cx="31" cy="210" rx="8" ry="8" style="fill: #EEE; stroke: #BBB;" />\n\t\t' +
'   </g>\n\t' +
' </g>\n\t' +
' <text x="0" y="212" fill="#666" style="font-size:10px">117</text>\n\t' +
' <text x="0" y="14" fill="#666" style="font-size:10px">120</text>\n\t' +
' <text x="14" y="160" fill="#666" style="font-weight:bold;font-size:11px;" transform="rotate(-90, 14, 160)">AGA_AM_PRIORITY</text>\n' +
'</g>\n';

export default vSlider;
