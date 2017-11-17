const multistate = `
<!-- Multistate switch --> 
<g transform="translate(__TRANSLATE_FROM__,__TRANSLATE_TO__)"> 
  <g isis_animation="colour" isis_ep="__ENTRY_POINT__" isis_color_operators="<|0|#e74c3c;;>=|0|#2ecc71;;>=|25|#3498db;;>=|50|#e74c3c;;>=|75|#f1c40f;;>=|100|#e74c3c"> 
    <circle cx="30" cy="12" r="10" stroke="#444" stroke-width="2" fill="#EEE" /> 
  </g> 
  <text x="20" y="44" fill="#666" style="font-size:12px">St 1</text> 
  <g isis_animation="colour" isis_ep="__ENTRY_POINT__"  isis_color_operators="<|0|#e74c3c;;>=|0|#2ecc71;;>=|25|#3498db;;>=|50|#e74c3c;;>=|75|#f1c40f;;>=|100|#e74c3c"> 
    <circle cx="80" cy="12" r="10" stroke="#444" stroke-width="2" fill="#EEE" /> 
  </g> 
  <text x="70" y="44" fill="#666" style="font-size:12px">St 2</text> 
  <g isis_animation="colour" isis_ep="__ENTRY_POINT__"  isis_color_operators="<|0|#e74c3c;;>=|0|#2ecc71;;>=|25|#3498db;;>=|50|#e74c3c;;>=|75|#f1c40f;;>=|100|#e74c3c"> 
    <circle cx="130" cy="12" r="10" stroke="#444" stroke-width="2" fill="#EEE" /> 
  </g> 
  <text x="120" y="44" fill="#666" style="font-size:12px">St 3</text> 
</g>;
`;

export default multistate;
