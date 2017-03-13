const gcWatch = require('gc-watch');
const getLogger = require('common/log');

const logger = getLogger('gcMonitoring');

export default function () {
  let size;
  let time;

  const getHeapSize = () => Math.floor(process.memoryUsage().heapUsed / (1024 * 1024));
  const getTime = () => (new Date()).getTime();

  gcWatch.on('beforeGC', () => {
    // detect memory usage, push stats etc.
    size = getHeapSize();
    // eslint-disable-next-line no-console
    console.time('GC Duration');
  });

  gcWatch.on('afterGC', () => {
    // calculate memory freed by GC, etc.
    logger.info('-------------------------------------------------');
    logger.info(`GC passed, memory free ${size - getHeapSize()} mb (Total: ${getHeapSize()} mb)`);
    // eslint-disable-next-line no-console
    console.timeEnd('GC Duration');
    logger.info(`Since last GC tick : ${getTime() - (time || getTime())} ms`);
    logger.info('-------------------------------------------------');
    time = getTime();
  });
}
