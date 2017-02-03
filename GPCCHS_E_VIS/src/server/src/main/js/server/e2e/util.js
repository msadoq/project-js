// const testUtils = require('../lib/utils/test');
// const Primus = require('common/websocket');
// const cp = require('child_process');
// const chai = require('chai');
// const chaiJestSnapshot = require('chai-jest-snapshot');
//
// chai.use(chaiJestSnapshot);
//
// // If E2E_URL is not defined, HSS server is started
// const mustStartHSS = !process.env.E2E_URL;
// const PORT = mustStartHSS ? 3001 : process.env.PORT;
//
// process.env.E2E_URL = process.env.E2E_URL || 'http://localhost';
// process.env.PORT = PORT;
// process.env.SERVER_PORT = PORT;
//
// const ZMQ_GPCCDC_PUSH_PORT = 5043;
// const ZMQ_GPCCDC_PULL_PORT = 49166;
//
// // Array of callbacks triggered on ws.on('data')
// let onDataCallbacks = [];
//
// // start WS connection to HSS
// const startWS = () => { // eslint-disable-line arrow-body-style
//   return new Promise((resolve) => {
//     const ws = new Primus(testUtils.e2eUrl());
//     ws.on('open', () => {
//       ws.on('data', (...args) => {
//         onDataCallbacks.forEach(cb => cb(...args));
//       });
//       resolve(ws);
//     });
//   });
// };
//
// // stop WS connection to HSS
// const stopWS = ws => Promise.resolve(ws.end());
//
// // Add a callback to onDataCallbacks array. They are called on this.on('data') event
// const addDataCallback = (cb) => {
//   const i = onDataCallbacks.push(cb);
//   // Returns function to remove callback from onDataCallbacks array
//   return () => onDataCallbacks.splice(i - 1, 1);
// };
//
// // Reset onDataCallbacks array
// const resetDataCallbacks = () => {
//   onDataCallbacks = [];
// };
//
// const startDCProcess = () => new Promise((resolve) => {
//   const dc = cp.fork('../../../../../common/src/main/js/common/stubs/dc.js', [], {
//     silent: true, // disable stdin, stdout, stderr
//     env: {
//       ZMQ_GPCCDC_PUSH: `tcp://127.0.0.1:${ZMQ_GPCCDC_PUSH_PORT}`, // use different port from standard HSS
//       ZMQ_GPCCDC_PULL: `tcp://127.0.0.1:${ZMQ_GPCCDC_PULL_PORT}`, // use different port from standard HSS
//     },
//   });
//   resolve(dc);
// });
//
// // Start HSS
// const startHSSProcess = () =>
//   new Promise((resolve) => {
//     const hss = cp.fork('index.js', [], {
//       silent: true, // disable stdin, stdout, stderr
//       env: {
//         SERVER_PORT: PORT,
//         ZMQ_GPCCDC_PUSH: `tcp://127.0.0.1:${ZMQ_GPCCDC_PUSH_PORT}`, // use different port from standard HSS
//         ZMQ_GPCCDC_PULL: `tcp://127.0.0.1:${ZMQ_GPCCDC_PULL_PORT}`, // use different port from standard HSS
//       },
//     });
//     hss.on('message', () => resolve(hss));
//   });
//
// const startHSSAndDC = () => {
//   if (!mustStartHSS) {
//     return Promise.resolve();
//   }
//
//   const processes = [];
//
//   return startDCProcess().then((dc) => {
//     processes.push(dc);
//     return startHSSProcess();
//   }).then((hss) => {
//     processes.push(hss);
//     return processes;
//   });
// };
//
// const getHSSProcess = processes => processes[1];
//
// const stopProcess = (process) => { // eslint-disable-line arrow-body-style
//   return new Promise((resolve) => {
//     if (process) {
//       process.kill();
//     }
//     resolve();
//   });
// };
//
//
// // Stop HSS and DC
// const stopHSSAndDC = (processes) => { // eslint-disable-line arrow-body-style
//   return Promise.all(processes.map(p => stopProcess(p))).then(() => null);
// };
//
// // Snapshot testing
// const getMatchSnapshot = (testCtx, filename) => (obj) => {
//   // eslint-disable-next-line no-param-reassign
//   const ctx = testCtx.ctx.matchSnapshot = testCtx.ctx.matchSnapshot || {
//     testName: testCtx.ctx.test.fullTitle(),
//     count: 1,
//   };
//
//   if (ctx.testName !== testCtx.ctx.test.fullTitle()) {
//     ctx.testName = testCtx.ctx.test.fullTitle();
//     ctx.count = 1;
//   }
//
//   obj.should.to.matchSnapshot(`${filename}.snap`, `${ctx.testName} ${ctx.count}`);
//
//   ctx.count += 1;
// };
//
// module.exports = {
//   startWS,
//   stopWS,
//   addDataCallback,
//   resetDataCallbacks,
//   startHSSAndDC,
//   stopHSSAndDC,
//   stopProcess,
//   getHSSProcess,
//   getMatchSnapshot,
// };
