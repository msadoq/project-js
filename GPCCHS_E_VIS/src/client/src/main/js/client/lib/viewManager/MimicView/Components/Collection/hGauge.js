const hGauge = '<!-- HORIZONTAL GAUGE -->\n' +
'<g transform="translate(120,50)">\n\t' +
  '<path d="M1,16 l200,0 l0,24 l-200,0 z" style=" fill:#DDD" />\n\t' +
  '<g isis_animation="scaleX" isis_ep="AGA_AM_PRIORITY" isis_domain="117,120" isis_origin="left,top">\n\t\t' +
    '<g isis_animation="colour" isis_ep="AGA_AM_PRIORITY" isis_color_operators="<=$119$#8AE*>$118$#45C">\n\t\t\t' +
      '<path d="M1,16 l200,0 l0,24 l-200,0 z" style=" fill:#67D" />\n\t\t' +
    '</g>\n\t' +
  '</g>\n\t' +
  '<g isis_animation="translateX" isis_ep="AGA_AM_PRIORITY" isis_domain="117,120" isis_distance="200" isis_direction="right">\n\t\t' +
    '<path d="M0,13 l3,0 l0,30 l-3,0 z" style=" fill: #666" />\n\t' +
  '</g>\n\t' +
  '<text x="0" y="4" fill="#666" style="font-size:10px">117</text>\n\t' +
  '<text x="184" y="4" fill="#666" style="font-size:10px">120</text>\n\t' +
  '<text x="52" y="4" fill="#666" style="font-weight:bold;font-size:11px;">AGA_AM_PRIORITY</text>\n\t' +
  '<g isis_animation="textBox" isis_ep="AGA_AM_PRIORITY" isis_textcolor_operators="0$#FFF">-</g>\n' +
'</g>\n';

export default hGauge;
