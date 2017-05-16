const protobuf = require('../../index');

module.exports.testProtobuf = function testProtobuf(type, proto, arraySize, numberIterationDecode){
  const arrayToDecode = initArrayToDecode(proto, arraySize);
  const timeArray = [];
  console.log('[%s] Decode %d elements ', type, arraySize);
  for (let i = 0; i < numberIterationDecode; i += 1) {
    const tmpTimeObject = {};
    tmpTimeObject.adapter = testWithAdapters(type, arrayToDecode);
    tmpTimeObject.noAdapter = testWithoutAdapters(type, arrayToDecode);
    timeArray[i] = tmpTimeObject;
  }
  // tabPerfGlobal.push({ avg: renderTabPerf(timeArray, numberIterationDecode), type });
  return { avg: renderTabPerf(timeArray, numberIterationDecode), type };
};

const initArrayToDecode = (getProto, arraySize) => {
  const arrayToDecode = [];
  for (let i = 0; i < arraySize; i += 1) {
    arrayToDecode.push(getProto());
  }
  return arrayToDecode;
};

const testWithAdapters = (type, arrayToDecode) => {
  const startW = process.hrtime();
  for (let i = 0; i < arrayToDecode.length; i += 1) {
    protobuf.decodeAdapter(type, arrayToDecode[i]);
  }
  const endW = process.hrtime(startW);
  return endW;
};

const testWithoutAdapters = (type, arrayToDecode) => {
  const startW = process.hrtime();
  for (let i = 0; i < arrayToDecode.length; i += 1) {
    protobuf.decodeNoAdapter(type, arrayToDecode[i]);
  }
  const endW = process.hrtime(startW);
  return endW;
};

const renderTabPerf = (timeArray, numberIterationDecode) => {
  let tabRender = '';
  const topBarAtomic = '----------';
  let topBar = ' ------------';
  let indiceBar = '|      i     |';

  let adapterBar = '|   adapter  |';
  let noAdapterBar = '| no adapter |';
  let averageDiff = 0;
  let averageRatio = 0;
  let averageTimeWithA = 0;
  let averageTimeWithoutA = 0;
  for (let i = 0; i < numberIterationDecode; i += 1) {
    const timeValueAdapter = `${timeArray[i].adapter[0]}s${pad(Math.floor(timeArray[i].adapter[1] / 1000000), 3)}ms`;
    const timeValueNoAdapter = `${timeArray[i].noAdapter[0]}s${pad(Math.floor(timeArray[i].noAdapter[1] / 1000000), 3)}ms`;
    const timeA = (timeArray[i].adapter[0] * 1000) + (timeArray[i].adapter[1] / 1000000);
    const timeNoA = (timeArray[i].noAdapter[0] * 1000) + (timeArray[i].noAdapter[1] / 1000000);
    topBar += topBarAtomic;
    indiceBar += `    ${i}    |`;
    adapterBar += ` ${timeValueAdapter} |`;
    noAdapterBar += ` ${timeValueNoAdapter} |`;
    averageTimeWithA += timeA;
    averageTimeWithoutA += timeNoA;
    averageDiff += timeA - timeNoA;
    averageRatio += timeA / timeNoA;
  }
  averageDiff /= numberIterationDecode;
  averageDiff /= 1000;
  averageRatio /= numberIterationDecode;
  averageTimeWithA /= numberIterationDecode;
  averageTimeWithA /= 1000;
  averageTimeWithoutA /= numberIterationDecode;
  averageTimeWithoutA /= 1000;
  console.log(averageDiff.toString().split('.')[0]);
  tabRender += topBar;
  tabRender += '\n';
  tabRender += indiceBar;
  tabRender += '\n';
  tabRender += topBar;
  tabRender += '\n';
  tabRender += adapterBar;
  tabRender += '\n';
  tabRender += topBar;
  tabRender += '\n';
  tabRender += noAdapterBar;
  tabRender += '\n';
  tabRender += topBar;
  tabRender += '\n';
  console.log(tabRender);
  console.log('\nAverage diff : %ss%sms', averageDiff.toString().split('.')[0], averageDiff.toString().split('.')[1].substring(0, 3));
  console.log('Average ratio : %d', averageRatio);
  console.log('Average time with adapters : %ss%sms', averageTimeWithA.toString().split('.')[0], averageTimeWithA.toString().split('.')[1].substring(0, 3));
  console.log('Average time without adapters : %ss%sms', averageTimeWithoutA.toString().split('.')[0], averageTimeWithoutA.toString().split('.')[1].substring(0, 3));
  return averageRatio;
};

const pad = (m, width, z) => {
  const x = z || '0';
  const n = m.toString();
  return n.length >= width ? n : new Array((width - n.length) + 1).join(x) + n;
};
