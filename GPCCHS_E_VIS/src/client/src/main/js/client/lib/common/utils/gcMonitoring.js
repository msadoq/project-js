// const { get } = require('common/parameters');
// const getLogger = require('common/log');
//
// let start = () => {};
//
// function startMonitoring() {
//   if (get('DEBUG') !== 'on') {
//     return;
//   }
//   const gcWatch = require('gc-watch'); // eslint-disable-line global-require
//   const logger = getLogger('gcMonitoring');
//
//   let size;
//   let time;
//   let gcStartTime;
//   let gcEndTime;
//
//   const getHeapSize = () => Math.floor(process.memoryUsage().heapUsed / (1024 * 1024));
//   const getTime = () => (new Date()).getTime();
//
//   gcWatch.on('beforeGC', () => {
//     // detect memory usage, push stats etc.
//     size = getHeapSize();
//     gcStartTime = getTime();
//   });
//
//   gcWatch.on('afterGC', () => {
//     // calculate memory freed by GC, etc.
//     logger.info('-------------------------------------------------');
//     logger.info(`GC passed, memory free ${size - getHeapSize()} mb (Total: ${getHeapSize()} mb)`);
//     gcEndTime = getTime();
//     logger.info(`GC duration: ${gcEndTime - gcStartTime} ms`);
//     logger.info(`Since last GC tick : ${getTime() - (time || getTime())} ms`);
//     logger.info('-------------------------------------------------');
//     time = getTime();
//   });
// }
//
// if (!process.env.IS_BUNDLED) {
//   start = startMonitoring;
// }
//
// export default {
//   start,
// };
