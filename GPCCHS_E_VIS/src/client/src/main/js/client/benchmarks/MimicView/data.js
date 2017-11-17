import vGauge from '../../lib/viewManager/MimicView/Components/Collection/vGauge';
import hGauge from '../../lib/viewManager/MimicView/Components/Collection/hGauge';
import digital from '../../lib/viewManager/MimicView/Components/Animation/digital';
import vSlider from '../../lib/viewManager/MimicView/Components/Collection/vSlider';
import hSlider from '../../lib/viewManager/MimicView/Components/Collection/hSlider';

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

export const vgauge = (n) => {
  const data = {};
  const entryPoints = {};
  const eps = epIds.filter((v, i) => i < n);
  for (let i = 0; i < n; i += 1) {
    data[eps[i]] = { value: Math.round(Math.random() * 100), color: '#FFF' };
    entryPoints[eps[i]] = {};
  }

  const epSvg = eps.map((v, i) => vGauge
    .replace(/__ENTRY_POINT__/g, v)
    .replace('__TRANSLATE_FROM__', (100 + ((i % 10) * 100)))
    .replace('__TRANSLATE_TO__', (100 + (Math.floor(i / 10) * 200)))
  ).join('');

  return {
    data,
    content: `<g>${epSvg}</g>`,
    entryPoints,
  };
};

export const hgauge = (n) => {
  const data = {};
  const entryPoints = {};
  const eps = epIds.filter((v, i) => i < n);
  for (let i = 0; i < n; i += 1) {
    data[eps[i]] = { value: Math.round(Math.random() * 100), color: '#FFF' };
    entryPoints[eps[i]] = {};
  }

  const epSvg = eps.map((v, i) => hGauge
    .replace(/__ENTRY_POINT__/g, v)
    .replace('__TRANSLATE_FROM__', (100 + ((i % 10) * 100)))
    .replace('__TRANSLATE_TO__', (100 + (Math.floor(i / 10) * 200)))
  ).join('');

  console.log(epSvg);

  return {
    data,
    content: `<g>${epSvg}</g>`,
    entryPoints,
  };
};

export const vslider = (n) => {
  const data = {};
  const entryPoints = {};
  const eps = epIds.filter((v, i) => i < n);
  for (let i = 0; i < n; i += 1) {
    data[eps[i]] = { value: Math.round(Math.random() * 100), color: '#FFF' };
    entryPoints[eps[i]] = {};
  }

  const epSvg = eps.map((v, i) => vSlider
    .replace(/__ENTRY_POINT__/g, v)
    .replace('__TRANSLATE_FROM__', (100 + ((i % 10) * 100)))
    .replace('__TRANSLATE_TO__', (100 + (Math.floor(i / 10) * 200)))
  ).join('');

  return {
    data,
    content: `<g>${epSvg}</g>`,
    entryPoints,
  };
};

export const hslider = (n) => {
  const data = {};
  const entryPoints = {};
  const eps = epIds.filter((v, i) => i < n);
  for (let i = 0; i < n; i += 1) {
    data[eps[i]] = { value: Math.round(Math.random() * 100), color: '#FFF' };
    entryPoints[eps[i]] = {};
  }

  const epSvg = eps.map((v, i) => hSlider
    .replace(/__ENTRY_POINT__/g, v)
    .replace('__TRANSLATE_FROM__', (100 + ((i % 10) * 100)))
    .replace('__TRANSLATE_TO__', (100 + (Math.floor(i / 10) * 200)))
  ).join('');

  console.log(epSvg);

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

  const epSvg = eps.map((v, i) => digital
    .replace(/__ENTRY_POINT__/g, v)
    .replace('__TRANSLATE_FROM__', (100 + ((i % 10) * 100)))
    .replace('__TRANSLATE_TO__', (100 + (Math.floor(i / 10) * 200)))
  ).join('');

  return {
    data,
    content: `<g>${epSvg}</g>`,
    entryPoints,
  };
};
