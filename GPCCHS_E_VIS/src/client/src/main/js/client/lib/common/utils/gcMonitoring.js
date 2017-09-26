// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 10/03/2017 : Add Garbage Collector monitoring tool
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Use logger in gc monitoring
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Remove use of console.time from gcMonitoring
// VERSION : 1.1.2 : DM : #3622 : 15/03/2017 : Fix production webpack build errors
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Update project dependencies and remove broken code (gcMonitoring)
// END-HISTORY
// ====================================================================

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
