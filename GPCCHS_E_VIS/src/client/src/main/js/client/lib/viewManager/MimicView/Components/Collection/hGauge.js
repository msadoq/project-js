const hGauge = `
<!-- HORIZONTAL GAUGE --> +
<g transform="translate(__TRANSLATE_FROM__,__TRANSLATE_TO__)"> +
  <path d="M1,16 l200,0 l0,24 l-200,0 z" style=" fill:#DDD" /> +
  <g isis_animation="scaleX" isis_ep="__ENTRY_POINT__" isis_domain="0,100" isis_origin="left,top" isis_scale="0,100"> +
    <g isis_animation="colour" isis_ep="__ENTRY_POINT__" isis_color_operators="<|0|#e74c3c;;>=|0|#2ecc71;;>=|25|#3498db;;>=|50|#e74c3c;;>=|75|#f1c40f;;>=|100|#e74c3c"> +
      <path d="M1,16 l200,0 l0,24 l-200,0 z" style=" fill:#67D" /> +
    </g> +
  </g> +
  <g isis_animation="translateX" isis_ep="__ENTRY_POINT__" isis_domain="0,100" isis_distance="200" isis_direction="right"> +
    <path d="M0,13 l3,0 l0,30 l-3,0 z" style=" fill: #666" /> +
  </g> +
  <text x="0" y="4" fill="#666" style="font-size:10px">0</text> +
  <text x="184" y="4" fill="#666" style="font-size:10px">100</text> +
  <text x="52" y="4" fill="#666" style="font-weight:bold;font-size:11px;">__ENTRY_POINT__</text> +
  <g isis_x="90" isis_y="32"  isis_animation="textBox" isis_ep="__ENTRY_POINT__" isis_textcolor_operators="<|0|#e74c3c;;>=|0|#2ecc71;;>=|25|#3498db;;>=|50|#e74c3c;;>=|75|#f1c40f;;>=|100|#e74c3c"></g> +
</g>;
`;

export default hGauge;
