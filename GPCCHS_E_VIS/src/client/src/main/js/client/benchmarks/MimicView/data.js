// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6816 : 02/08/2017 : add mimic benchmark with isolated mimicView component
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

const epIds = [
  'aaaaa', 'aaaab', 'aaaac', 'aaaad', 'aaaae', 'aaaaf', 'aaaag', 'aaaah', 'aaaai', 'aaaaj', 'aaaak', 'aaaal', 'aaaam',
  'abbba', 'abbbb', 'abbbc', 'abbbd', 'abbbe', 'abbbf', 'abbbg', 'abbbh', 'abbbi', 'abbbj', 'abbbk', 'abbbl', 'abbbm',
  'accca', 'acccb', 'acccc', 'acccd', 'accce', 'acccf', 'acccg', 'accch', 'accci', 'acccj', 'accck', 'acccl', 'acccm',
  'addda', 'adddb', 'adddc', 'adddd', 'addde', 'adddf', 'adddg', 'adddh', 'adddi', 'adddj', 'adddk', 'adddl', 'adddm',
  'aeeea', 'aeeeb', 'aeeec', 'aeeed', 'aeeee', 'aeeef', 'aeeeg', 'aeeeh', 'aeeei', 'aeeej', 'aeeek', 'aeeel', 'aeeem',
  'afffa', 'afffb', 'afffc', 'afffd', 'afffe', 'affff', 'afffg', 'afffh', 'afffi', 'afffj', 'afffk', 'afffl', 'afffm',
  'aggga', 'agggb', 'agggc', 'agggd', 'aggge', 'agggf', 'agggg', 'agggh', 'agggi', 'agggj', 'agggk', 'agggl', 'agggm',
  'ahhha', 'ahhhb', 'ahhhc', 'ahhhd', 'ahhhe', 'ahhhf', 'ahhhg', 'ahhhh', 'ahhhi', 'ahhhj', 'ahhhk', 'ahhhl', 'ahhhm',
  'baaaa', 'baaab', 'baaac', 'baaad', 'baaae', 'baaaf', 'baaag', 'baaah', 'baaai', 'baaaj', 'baaak', 'baaal', 'baaam',
  'bbbba', 'bbbbb', 'bbbbc', 'bbbbd', 'bbbbe', 'bbbbf', 'bbbbg', 'bbbbh', 'bbbbi', 'bbbbj', 'bbbbk', 'bbbbl', 'bbbbm',
  'bccca', 'bcccb', 'bcccc', 'bcccd', 'bccce', 'bcccf', 'bcccg', 'bccch', 'bccci', 'bcccj', 'bccck', 'bcccl', 'bcccm',
  'bddda', 'bdddb', 'bdddc', 'bdddd', 'bddde', 'bdddf', 'bdddg', 'bdddh', 'bdddi', 'bdddj', 'bdddk', 'bdddl', 'bdddm',
  'beeea', 'beeeb', 'beeec', 'beeed', 'beeee', 'beeef', 'beeeg', 'beeeh', 'beeei', 'beeej', 'beeek', 'beeel', 'beeem',
  'bfffa', 'bfffb', 'bfffc', 'bfffd', 'bfffe', 'bffff', 'bfffg', 'bfffh', 'bfffi', 'bfffj', 'bfffk', 'bfffl', 'bfffm',
  'bggga', 'bgggb', 'bgggc', 'bgggd', 'bggge', 'bgggf', 'bgggg', 'bgggh', 'bgggi', 'bgggj', 'bgggk', 'bgggl', 'bgggm',
  'bhhha', 'bhhhb', 'bhhhc', 'bhhhd', 'bhhhe', 'bhhhf', 'bhhhg', 'bhhhh', 'bhhhi', 'bhhhj', 'bhhhk', 'bhhhl', 'bhhhm',
  'caaaa', 'caaab', 'caaac', 'caaad', 'caaae', 'caaaf', 'caaag', 'caaah', 'caaai', 'caaaj', 'caaak', 'caaal', 'caaam',
  'cbbba', 'cbbbb', 'cbbbc', 'cbbbd', 'cbbbe', 'cbbbf', 'cbbbg', 'cbbbh', 'cbbbi', 'cbbbj', 'cbbbk', 'cbbbl', 'cbbbm',
  'cccca', 'ccccb', 'ccccc', 'ccccd', 'cccce', 'ccccf', 'ccccg', 'cccch', 'cccci', 'ccccj', 'cccck', 'ccccl', 'ccccm',
  'cddda', 'cdddb', 'cdddc', 'cdddd', 'cddde', 'cdddf', 'cdddg', 'cdddh', 'cdddi', 'cdddj', 'cdddk', 'cdddl', 'cdddm',
  'ceeea', 'ceeeb', 'ceeec', 'ceeed', 'ceeee', 'ceeef', 'ceeeg', 'ceeeh', 'ceeei', 'ceeej', 'ceeek', 'ceeel', 'ceeem',
  'cfffa', 'cfffb', 'cfffc', 'cfffd', 'cfffe', 'cffff', 'cfffg', 'cfffh', 'cfffi', 'cfffj', 'cfffk', 'cfffl', 'cfffm',
  'cggga', 'cgggb', 'cgggc', 'cgggd', 'cggge', 'cgggf', 'cgggg', 'cgggh', 'cgggi', 'cgggj', 'cgggk', 'cgggl', 'cgggm',
  'chhha', 'chhhb', 'chhhc', 'chhhd', 'chhhe', 'chhhf', 'chhhg', 'chhhh', 'chhhi', 'chhhj', 'chhhk', 'chhhl', 'chhhm',
];

export const gauge = (n) => {
  const data = {};
  const entryPoints = {};
  const eps = epIds.filter((v, i) => i < n);
  for (let i = 0; i < n; i += 1) {
    data[eps[i]] = { value: Math.round(Math.random() * 100), color: '#FFF' };
    entryPoints[eps[i]] = {};
  }
  const epSvg = eps.map((v, i) => `<g transform="translate(${100 + ((i % 10) * 100)},${100 + (Math.floor(i / 10) * 200)})">
  <path d="M26,1 l24,0 l0,200 l-24,0 z" style=" fill:#DDD" />
  <g isis_animation="scaleY" isis_ep="${v}" isis_domain="0,100" isis_fixed="bottom">
    <path d="M26,1 l24,0 l0,200 l-24,0 z" style=" fill:#96ceaa" />
  </g>
  <g isis_animation="translateY" isis_ep="${v}" isis_domain="0,100" isis_width="200" isis_direction="top">
    <path d="M23,198 l0,3 l30,0 l0,-3 z" style=" fill: #666" />
  </g>
  <text x="0" y="200" fill="#666" style="font-size:10px">117</text>
  <text x="0" y="6" fill="#666" style="font-size:10px">120</text>
  <text x="12" y="150" fill="#666" style="font-weight:bold;font-size:11px;" transform="rotate(-90, 12, 150)">${v}</text>
</g>`).join('');
  return {
    data,
    content: `<g>${epSvg}</g>`,
    entryPoints,
  };
};


export const digitalDisplay = (n) => {
  const data = {};
  const entryPoints = {};
  const eps = epIds.filter((v, i) => i < n);
  for (let i = 0; i < n; i += 1) {
    data[eps[i]] = { value: Math.round(Math.random() * 100), color: '#FFF' };
    entryPoints[eps[i]] = {};
  }
  const epSvg = eps.map((v, i) => `<g transform="translate(${100 + ((i % 10) * 100)},${100 + (Math.floor(i / 10) * 100)})">
  <g isis_x="0" isis_y="0" isis_animation="textBox" isis_ep="${v}" isis_textcolor_thresholds="-1|#0C0;24|#E00;49|#595fed;74|#e5bd2d" isis_font="Digital" isis_size="64px">-</g>
</g>
`).join('');
  return {
    data,
    content: `<g>${epSvg}</g>`,
    entryPoints,
  };
};
