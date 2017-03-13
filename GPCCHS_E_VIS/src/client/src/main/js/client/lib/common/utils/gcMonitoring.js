const gcWatch = require('gc-watch');
const getLogger = require('common/log');

const logger = getLogger('gcMonitoring');

export default function () {
  let size;
  let time;
  let gcStartTime;
  let gcEndTime;

  const getHeapSize = () => Math.floor(process.memoryUsage().heapUsed / (1024 * 1024));
  const getTime = () => (new Date()).getTime();

  gcWatch.on('beforeGC', () => {
    // detect memory usage, push stats etc.
    size = getHeapSize();
    gcStartTime = getTime();
  });

  gcWatch.on('afterGC', () => {
    // calculate memory freed by GC, etc.
    logger.info('-------------------------------------------------');
    logger.info(`GC passed, memory free ${size - getHeapSize()} mb (Total: ${getHeapSize()} mb)`);
    gcEndTime = getTime();
    logger.info(`GC duration: ${gcEndTime - gcStartTime} ms`);
    logger.info(`Since last GC tick : ${getTime() - (time || getTime())} ms`);
    logger.info('-------------------------------------------------');
    time = getTime();
  });
}
