const vGauge = `
<!-- VERTICAL GAUGE -->
<g transform="translate(__TRANSLATE_FROM__,__TRANSLATE_TO__)">
  <path d="M26,1 l24,0 l0,200 l-24,0 z" style=" fill:#DDD" />
  <g isis_animation="scaleY" isis_ep="__ENTRY_POINT__" isis_domain="0,100"  isis_origin="left, bottom">
    <g isis_animation="colour" isis_ep="__ENTRY_POINT__" isis_color_operators="<|0|#e74c3c;;>=|0|#2ecc71;;>=|25|#3498db;;>=|50|#e74c3c;;>=|75|#f1c40f;;>=|100|#e74c3c">
      <path d="M26,1 l24,0 l0,200 l-24,0 z" style=" fill:#5C2" />
    </g>
  </g>
  <g isis_animation="translateY" isis_ep="__ENTRY_POINT__" isis_domain="0,100" isis_distance="200" isis_direction="bottom">
    <path d="M23,-2 l0,3 l30,0 l0,-3 z" style=" fill: #666" />
  </g>
  <text x="0" y="200" fill="#666" style="font-size:10px">117</text>
  <text x="0" y="6" fill="#666" style="font-size:10px">120</text>
  <text x="12" y="150" fill="#666" style="font-weight:bold;font-size:11px;" transform="rotate(-90, 12, 150)">__ENTRY_POINT__</text>
</g>
`;

export default vGauge;
