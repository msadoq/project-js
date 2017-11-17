const knobe = `
<!-- KNOBE --> 
<g transform="translate(__TRANSLATE_FROM__,__TRANSLATE_TO__)"> 
  <circle r="80" cx="100" cy="100" stroke="#FDE47F" transform="rotate(126, 100, 100)" stroke-width="10" fill="none" stroke-dasharray="402"></circle> 
  <g isis_animation="rotate" isis_ep="__ENTRY_POINT__" isis_domain="117,121" isis_angle="292" isis_origin="center,center"> 
    <path d="M100,30 l6,70 q-6,6 -12,0 z" style="fill: #666" transform="rotate(-0, 210, 90)" /> 
  </g> 
  <text x="50" y="130" fill="#999" style="font-weight:bold;font-size:11px;">__ENTRY_POINT__</text> 
  <text x="14" y="170" fill="#999" style="font-weight:bold;font-size:11px">117</text> 
  <text x="92" y="8" fill="#999" style="font-weight:bold;font-size:11px">119</text> 
  <text x="168" y="170" fill="#999" style="font-weight:bold;font-size:11px">121</text> 
</g>
`;

export default knobe;
