const vGauge = '<!-- VERTICAL GAUGE -->\n' +
'<g transform="translate(40,10)">\n\t' +
  '<path d="M26,1 l24,0 l0,200 l-24,0 z" style=" fill:#DDD" />\n\t' +
  '<g isis_animation="scaleY" isis_ep="AGA_AM_PRIORITY" isis_domain="117,120" isis_fixed="bottom">\n\t\t' +
    '<g isis_animation="colour" isis_ep="AGA_AM_PRIORITY" isis_operators="<=$119$#8AE*>$118$#45C">\n\t\t\t' +
      '<path d="M26,1 l24,0 l0,200 l-24,0 z" style=" fill:#5C2" />\n\t\t' +
    '</g>\n\t' +
  '</g>\n\t' +
  '<g isis_animation="translateY" isis_ep="AGA_AM_PRIORITY" isis_domain="117,120" isis_width="200" isis_direction="top">\n\t\t' +
    '<path d="M23,198 l0,3 l30,0 l0,-3 z" style=" fill: #666" />\n\t' +
  '</g>\n\t' +
  '<text x="0" y="200" fill="#666" style="font-size:10px">117</text>\n\t' +
  '<text x="0" y="6" fill="#666" style="font-size:10px">120</text>\n\t' +
  '<text x="12" y="150" fill="#666" style="font-weight:bold;font-size:11px;" transform="rotate(-90, 12, 150)">AGA_AM_PRIORITY</text>\n' +
'</g>\n';

export default vGauge;
