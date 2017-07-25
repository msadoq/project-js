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

const hexa = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
const style = '<style>.eps{ max-width: 850px; padding: 5px; } .ep { margin: 2px; display: inline-block; padding: 3px 10px; text-align: center; width: 60px; height: 28px; border: 1px solid #33B; background: #336; }</style>';

export const data20Eps = () => {
  const data = {};
  const entryPoints = {};
  const eps = epIds.filter((v, i) => i < 20);
  for (let i = 0; i < 20; i += 1) {
    data[eps[i]] = { value: i, color: '#FFF' };
    entryPoints[eps[i]] = {};
  }
  const epSpans = eps.map(v => `<span>{{${v}}}</span>`).join('');
  return {
    data,
    content: `${style}<div class="eps">${epSpans}</div>`,
    entryPoints,
  };
};

export const data40Eps = () => {
  const data = {};
  const entryPoints = {};
  const eps = epIds.filter((v, i) => i < 40);
  for (let i = 0; i < 40; i += 1) {
    data[eps[i]] = { value: i, color: '#FFF' };
    entryPoints[eps[i]] = {};
  }
  const epSpans = eps.map(v => `<span>{{${v}}}</span`).join('');
  return {
    data,
    content: `${style}<div class="eps">${epSpans}</div>`,
    entryPoints,
  };
};

export const data40EpsRandom = () => {
  const data = {};
  const entryPoints = {};
  const eps = epIds.filter((v, i) => i < 40);
  for (let i = 0; i < 40; i += 1) {
    data[eps[i]] = { value: Math.round(Math.random() * 1000), color: '#FFF' };
    entryPoints[eps[i]] = {};
  }
  const epSpans = eps.map(v => `<span>{{${v}}}</span`).join('');
  return {
    data,
    content: `${style}<div class="eps">${epSpans}</div>`,
    entryPoints,
  };
};

export const data100EpsRandom = () => {
  const data = {};
  const entryPoints = {};
  const eps = epIds.filter((v, i) => i < 100);
  for (let i = 0; i < 100; i += 1) {
    data[eps[i]] = { value: Math.round(Math.random() * 1000), color: '#FFF' };
    entryPoints[eps[i]] = {};
  }
  const epSpans = eps.map(v => `<span>{{${v}}}</span`).join('');
  return {
    data,
    content: `${style}<div class="eps">${epSpans}</div>`,
    entryPoints,
  };
};

export const data200EpsRandom = () => {
  const data = {};
  const entryPoints = {};
  const eps = epIds.filter((v, i) => i < 200);
  for (let i = 0; i < 200; i += 1) {
    data[eps[i]] = { value: Math.round(Math.random() * 1000), color: '#FFF' };
    entryPoints[eps[i]] = {};
  }
  const epSpans = eps.map(v => `<span>{{${v}}}</span`).join('');
  return {
    data,
    content: `${style}<div class="eps">${epSpans}</div>`,
    entryPoints,
  };
};

export const data200EpsRandomColors = () => {
  const data = {};
  const entryPoints = {};
  const eps = epIds.filter((v, i) => i < 200);
  for (let i = 0; i < 200; i += 1) {
    data[eps[i]] = {
      value: Math.round(Math.random() * 1000),
      color: `#F${hexa[Math.floor(Math.random() * 16)]}${hexa[Math.floor(Math.random() * 16)]}`,
    };
    entryPoints[eps[i]] = {};
  }
  const epSpans = eps.map(v => `<span>{{${v}}}</span>`).join('');
  return {
    data,
    content: `${style}<div class="eps">${epSpans}</div>`,
    entryPoints,
  };
};
