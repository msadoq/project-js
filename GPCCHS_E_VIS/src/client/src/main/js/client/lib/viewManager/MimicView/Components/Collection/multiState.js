// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files. Possibility to add it in editor using context menu
// VERSION : 1.1.2 : DM : #6129 : 04/07/2017 : add multistate switch default component to mimic
// END-HISTORY
// ====================================================================

const multistate = '<!-- Multistate switch -->\n' +
'<g transform="translate(40,0)">\n\t' +
  '<g isis_animation="colour" isis_ep="AGA_AM_PRIORITY" isis_operators="<$118$#28f42b*>=$118$#EEE">\n\t\t' +
    '<circle cx="30" cy="12" r="10" stroke="#444" stroke-width="2" fill="#EEE" />\n\t' +
  '</g>\n\t' +
  '<text x="20" y="44" fill="#666" style="font-size:12px">St 1</text>\n\t' +
  '<g isis_animation="colour" isis_ep="AGA_AM_PRIORITY"  isis_operators="<$118$#EEE*>=$118$#28f42b*>=$119$#EEE">\n\t\t' +
    '<circle cx="80" cy="12" r="10" stroke="#444" stroke-width="2" fill="#EEE" />\n\t' +
  '</g>\n\t' +
  '<text x="70" y="44" fill="#666" style="font-size:12px">St 2</text>\n\t' +
  '<g isis_animation="colour" isis_ep="AGA_AM_PRIORITY"  isis_operators="<$119$#EEE*>=$119$#28f42b">\n\t\t' +
    '<circle cx="130" cy="12" r="10" stroke="#444" stroke-width="2" fill="#EEE" />\n\t' +
  '</g>\n\t' +
  '<text x="120" y="44" fill="#666" style="font-size:12px">St 3</text>\n' +
'</g>\n';

export default multistate;
