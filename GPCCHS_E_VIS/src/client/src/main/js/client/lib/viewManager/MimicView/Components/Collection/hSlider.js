const hSlider = `
<!-- HORIZONTAL SLIDER --> +
<g transform="translate(__TRANSLATE_FROM__,__TRANSLATE_TO__)"> +
 <path d="M10,10 l200,0 l0,6 l-200,0 z" style=" fill: #DDD; stroke: #BBB;" /> +
   <g isis_animation="translateX" isis_ep="__ENTRY_POINT__" isis_domain="0,100" isis_distance="200" isis_direction="right"> +
   <g isis_animation="colour" isis_ep="__ENTRY_POINT__" isis_color_operators="<|0|#e74c3c;;>=|0|#2ecc71;;>=|25|#3498db;;>=|50|#e74c3c;;>=|75|#f1c40f;;>=|100|#e74c3c"> +
     <ellipse cx="31" cy="14" rx="8" ry="8" style="fill: #EEE; stroke: #BBB;" /> +
   </g> +
 </g> +
 <text x="2" y="34" fill="#666" style="font-size:10px">0</text> +
 <text x="192" y="34" fill="#666" style="font-size:10px">100</text> +
 <text x="54" y="34" fill="#666" style="font-weight:bold;font-size:11px;">__ENTRY_POINT__</text> +
</g>;
`;

export default hSlider;
