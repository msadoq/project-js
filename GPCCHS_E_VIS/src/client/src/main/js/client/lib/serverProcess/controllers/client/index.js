// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move serverProcess code one level upper
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 23/06/2017 : First draft implementation of dataRequesting management on server
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : First draft implementation of dataRequesting management on server
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Add realTimeHandler and goNowHandler in player middleware
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Remove health management obsolete code
// VERSION : 1.1.2 : DM : #6700 : 12/07/2017 : Remove orchestration logic and IPC controller
// VERSION : 1.1.2 : DM : #6700 : 20/07/2017 : Remove obsolete onServerDebug interface, ipcs and model
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Remove serverDebug ipc . .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean IPC about FMD_GET/FMD_CREATE and RELOAD_SESSIONS/GET_SESSION_TIME
// VERSION : 1.1.2 : FA : #7145 : 26/07/2017 : [FT:#7145] Add refactoring comments in ipc and controllers (main, server, renderer)
// VERSION : 1.1.2 : FA : #7145 : 03/08/2017 : Remove useless ipc in mainProcess + serverProcess controllers
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Fix prepare last error . .
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix some tests and remove some old code
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Modify controllers error due to previous merge
// END-HISTORY
// ====================================================================

const zmq = require('common/zmq');
const constants = require('../../../constants');

const handle = require('../../../common/ipc/handle');
const reply = require('../../../common/ipc/reply');

const onReduxCurrentState = require('./onReduxCurrentState');
const onReduxDispatch = require('./onReduxDispatch');
const onProductLog = require('./onProductLog');

const pushToDc = args => zmq.push('dcPush', args);

const controller = {
  [constants.IPC_METHOD_REDUX_CURRENT_STATE]: (...args) => onReduxCurrentState(reply, ...args),
  [constants.IPC_METHOD_REDUX_DISPATCH]: onReduxDispatch,
  [constants.IPC_METHOD_PRODUCT_LOG]: (...args) => onProductLog(pushToDc, ...args), // TODO : middleware
};

module.exports = data => handle(
  controller,
  data,
  payload => process.send(payload)
);
