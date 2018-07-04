const vSlider = `
<!-- VERTICAL SLIDER -->
<g transform="translate(__TRANSLATE_FROM__,__TRANSLATE_TO__)">
  <path d="M28,10 l6,0 l0,200, l-6,0 z" style=" fill: #DDD; stroke: #BBB;" />
  <g isis_animation="translateY" isis_ep="__ENTRY_POINT__" isis_domain="0,100" isis_distance="200" isis_direction="top">
    <g isis_animation="colour" isis_ep="__ENTRY_POINT__"  isis_color_operators="&lt;|0|#e74c3c;;&gt;=|0|#2ecc71;;&gt;=|25|#3498db;;&gt;=|50|#e74c3c;;&gt;=|75|#f1c40f;;&gt;=|100|#e74c3c">
        <ellipse cx="31" cy="210" rx="8" ry="8" style="fill: #EEE; stroke: #BBB;" />
    </g>
  </g>
  <text x="0" y="212" fill="#666" style="font-size:10px">0</text>
  <text x="0" y="14" fill="#666" style="font-size:10px">100</text>
  <text x="14" y="160" fill="#666" style="font-weight:bold;font-size:11px;" transform="rotate(-90, 14, 160)">__ENTRY_POINT__</text>
</g>
`;

export default vSlider;
