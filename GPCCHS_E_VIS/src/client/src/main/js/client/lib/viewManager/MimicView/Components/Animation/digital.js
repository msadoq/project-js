// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files.
//  Possibility to add it in editor using context menu
// VERSION : 2.0.0 : DM : #6129 : 17/11/2017 : Fix mimic default components & transformations
// VERSION : 2.0.0 : DM : #6129 : 17/11/2017 : Fix mimic bench & refacto
// END-HISTORY
// ====================================================================

const digital = `
<g transform="translate(__TRANSLATE_FROM__,__TRANSLATE_TO__)"> 
  <g isis_x="0" isis_y="0" isis_animation="textBox" isis_ep="__ENTRY_POINT__" isis_textcolor="<|0|#e74c3c;;>=|0|#2ecc71;;>=|25|#3498db;;>=|50|#e74c3c;;>=|75|#f1c40f;;>=|100|#e74c3c" isis_font="Digital" isis_size="64px">-</g>\t 
</g>;
`;

export default digital;
