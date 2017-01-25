const globalConstants = require('common/constants');

let iterationNb = 0;
let iterationTime = 0;

let start;

const iterate = () => {
  iterationNb += 1;
  setImmediate(iterate);
};

module.exports = () => {
  if (!start) {
    setImmediate(iterate);
  }
  const delta = process.hrtime(start);
  const totalTime = (delta[0] * 1000) + (delta[1] / 1000000);
  iterationTime = (iterationNb) ? totalTime / iterationNb : 0;
  iterationNb = 0;
  start = process.hrtime();
  console.log('HOUBA HOUBA? HOUBA', iterationTime)
  return (iterationTime < globalConstants.HSS_EVENTLOOP_WARNING);
};
