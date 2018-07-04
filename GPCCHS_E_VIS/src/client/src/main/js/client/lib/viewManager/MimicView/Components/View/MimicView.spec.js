import { stripInkscapeCharacters } from './MimicView';

const mimicFile = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   width="1000px"
   height="900px"
   style="padding-top: 10px"
   id="svg2"
   version="1.1"
   inkscape:version="0.91 r13725"
   sodipodi:docname="inkscape.svg">
  <metadata
     id="metadata241">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <defs
     id="defs239" />
  <sodipodi:namedview
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1"
     objecttolerance="10"
     gridtolerance="10"
     guidetolerance="10"
     inkscape:pageopacity="0"
     inkscape:pageshadow="2"
     inkscape:window-width="640"
     inkscape:window-height="480"
     id="namedview237"
     showgrid="false"
     inkscape:zoom="0.26222222"
     inkscape:cx="500"
     inkscape:cy="450"
     inkscape:window-x="0"
     inkscape:window-y="25"
     inkscape:window-maximized="0"
     inkscape:current-layer="svg2" />
  <!-- MULTISTATE SWITCH 6 STATES - |AGA_AM_PRIORITY| -->
  <g
     transform="translate(40,0)"
     isis_ep="AGA_AM_PRIORITY"
     isis_search="on"
     id="g4">
    <g
       isis_animation="colour"
       isis_ep="AGA_AM_PRIORITY"
       isis_color_operators="&lt;|117.5|#F8F8F8;;&gt;=|117.5|#ffe8d3;;&gt;|117.8|#F8F8F8"
       id="g6">
      <rect
         width="200"
         height="200"
         style="fill:#F8F8F8;stroke:#CCC"
         id="rect8" />
    </g>
    <text
       x="50"
       y="26"
       fill="#888"
       style="font-size:12px;font-weight:bold;"
       id="text10">AGA_AM_PRIORITY</text>
    <g
       isis_animation="colour"
       isis_ep="AGA_AM_PRIORITY"
       isis_color_operators="&lt;|119.1|#FFF;;&gt;=|119.1|#96ceaa"
       id="g12">
      <circle
         cx="40"
         cy="60"
         r="8"
         stroke="#444"
         stroke-width="2"
         fill="#FFF"
         id="circle14" />
    </g>
    <text
       x="32"
       y="86"
       fill="#666"
       style="font-size:11px"
       id="text16">St 1</text>
    <g
       isis_animation="colour"
       isis_ep="AGA_AM_PRIORITY"
       isis_color_operators="&lt;|117.5|#FFF;;&gt;=|117.5|#96ceaa;;&gt;|117.8|#FFF"
       id="g18">
      <circle
         cx="100"
         cy="60"
         r="8"
         stroke="#444"
         stroke-width="2"
         fill="#FFF"
         id="circle20" />
    </g>
    <text
       x="92"
       y="86"
       fill="#666"
       style="font-size:11px"
       id="text22">St 2</text>
    <g
       isis_animation="colour"
       isis_ep="AGA_AM_PRIORITY"
       isis_color_operators="&lt;|117.8|#FFF;;&gt;=|117.8|#96ceaa;;&gt;|118.1|#FFF"
       id="g24">
      <circle
         cx="162"
         cy="60"
         r="8"
         stroke="#444"
         stroke-width="2"
         fill="#FFF"
         id="circle26" />
    </g>
    <text
       x="154"
       y="86"
       fill="#666"
       style="font-size:11px"
       id="text28">St 3</text>
    <g
       isis_animation="colour"
       isis_ep="AGA_AM_PRIORITY"
       isis_color_operators="&lt;|118.1|#FFF;;&gt;=|118.1|#96ceaa;;&gt;|118.4|#FFF"
       id="g30">
      <circle
         cx="40"
         cy="120"
         r="8"
         stroke="#444"
         stroke-width="2"
         fill="#FFF"
         id="circle32" />
    </g>
    <text
       x="32"
       y="146"
       fill="#666"
       style="font-size:11px"
       id="text34">St 4</text>
    <g
       isis_animation="colour"
       isis_ep="AGA_AM_PRIORITY"
       isis_color_operators="&lt;|118.4|#FFF;;&gt;=|118.4|#96ceaa;;&gt;|118.8|#FFF"
       id="g36">
      <circle
         cx="100"
         cy="120"
         r="8"
         stroke="#444"
         stroke-width="2"
         fill="#FFF"
         id="circle38" />
    </g>
    <text
       x="92"
       y="146"
       fill="#666"
       style="font-size:11px"
       id="text40">St 5</text>
    <g
       isis_animation="colour"
       isis_ep="AGA_AM_PRIORITY"
       isis_color_operators="&lt;|118.8|#FFF;;&gt;=|118.8|#96ceaa;;&gt;|119.1|#FFF"
       id="g42">
      <circle
         cx="162"
         cy="120"
         r="8"
         stroke="#444"
         stroke-width="2"
         fill="#FFF"
         id="circle44" />
    </g>
    <text
       x="154"
       y="146"
       fill="#666"
       style="font-size:11px"
       id="text46">St 6</text>
    <text
       x="70"
       y="180"
       fill="#2a7bc5"
       style="font-size:12px;cursor:pointer;"
       id="text48">Open in plot</text>
  </g>
</svg>
`;

const expectedString = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   width="1000px"
   height="900px"
   style="padding-top: 10px"
   id="svg2"
   version="1.1"
   inkscape:version="0.91 r13725"
   sodipodi:docname="inkscape.svg">
  
  
  
  <!-- MULTISTATE SWITCH 6 STATES - |AGA_AM_PRIORITY| -->
  <g
     transform="translate(40,0)"
     isis_ep="AGA_AM_PRIORITY"
     isis_search="on"
     id="g4">
    <g
       isis_animation="colour"
       isis_ep="AGA_AM_PRIORITY"
       isis_color_operators="&lt;|117.5|#F8F8F8;;&gt;=|117.5|#ffe8d3;;&gt;|117.8|#F8F8F8"
       id="g6">
      <rect
         width="200"
         height="200"
         style="fill:#F8F8F8;stroke:#CCC"
         id="rect8" />
    </g>
    <text
       x="50"
       y="26"
       fill="#888"
       style="font-size:12px;font-weight:bold;"
       id="text10">AGA_AM_PRIORITY</text>
    <g
       isis_animation="colour"
       isis_ep="AGA_AM_PRIORITY"
       isis_color_operators="&lt;|119.1|#FFF;;&gt;=|119.1|#96ceaa"
       id="g12">
      <circle
         cx="40"
         cy="60"
         r="8"
         stroke="#444"
         stroke-width="2"
         fill="#FFF"
         id="circle14" />
    </g>
    <text
       x="32"
       y="86"
       fill="#666"
       style="font-size:11px"
       id="text16">St 1</text>
    <g
       isis_animation="colour"
       isis_ep="AGA_AM_PRIORITY"
       isis_color_operators="&lt;|117.5|#FFF;;&gt;=|117.5|#96ceaa;;&gt;|117.8|#FFF"
       id="g18">
      <circle
         cx="100"
         cy="60"
         r="8"
         stroke="#444"
         stroke-width="2"
         fill="#FFF"
         id="circle20" />
    </g>
    <text
       x="92"
       y="86"
       fill="#666"
       style="font-size:11px"
       id="text22">St 2</text>
    <g
       isis_animation="colour"
       isis_ep="AGA_AM_PRIORITY"
       isis_color_operators="&lt;|117.8|#FFF;;&gt;=|117.8|#96ceaa;;&gt;|118.1|#FFF"
       id="g24">
      <circle
         cx="162"
         cy="60"
         r="8"
         stroke="#444"
         stroke-width="2"
         fill="#FFF"
         id="circle26" />
    </g>
    <text
       x="154"
       y="86"
       fill="#666"
       style="font-size:11px"
       id="text28">St 3</text>
    <g
       isis_animation="colour"
       isis_ep="AGA_AM_PRIORITY"
       isis_color_operators="&lt;|118.1|#FFF;;&gt;=|118.1|#96ceaa;;&gt;|118.4|#FFF"
       id="g30">
      <circle
         cx="40"
         cy="120"
         r="8"
         stroke="#444"
         stroke-width="2"
         fill="#FFF"
         id="circle32" />
    </g>
    <text
       x="32"
       y="146"
       fill="#666"
       style="font-size:11px"
       id="text34">St 4</text>
    <g
       isis_animation="colour"
       isis_ep="AGA_AM_PRIORITY"
       isis_color_operators="&lt;|118.4|#FFF;;&gt;=|118.4|#96ceaa;;&gt;|118.8|#FFF"
       id="g36">
      <circle
         cx="100"
         cy="120"
         r="8"
         stroke="#444"
         stroke-width="2"
         fill="#FFF"
         id="circle38" />
    </g>
    <text
       x="92"
       y="146"
       fill="#666"
       style="font-size:11px"
       id="text40">St 5</text>
    <g
       isis_animation="colour"
       isis_ep="AGA_AM_PRIORITY"
       isis_color_operators="&lt;|118.8|#FFF;;&gt;=|118.8|#96ceaa;;&gt;|119.1|#FFF"
       id="g42">
      <circle
         cx="162"
         cy="120"
         r="8"
         stroke="#444"
         stroke-width="2"
         fill="#FFF"
         id="circle44" />
    </g>
    <text
       x="154"
       y="146"
       fill="#666"
       style="font-size:11px"
       id="text46">St 6</text>
    <text
       x="70"
       y="180"
       fill="#2a7bc5"
       style="font-size:12px;cursor:pointer;"
       id="text48">Open in plot</text>
  </g>
</svg>
`;

describe('viewManager/MimicView/Components/MimicView', () => {
  it('should parse inkscape characters', () => {
    expect(stripInkscapeCharacters(mimicFile)).toEqual(expectedString);
  });
});
