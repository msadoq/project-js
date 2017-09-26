// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move common/callback and common/ipc modules in client sub-component
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Refactor DC error handling (direct dispatch from server)
// END-HISTORY
// ====================================================================

import constants from '../../../constants';
import handle from '../../../common/ipc/handle';

import onReduxPatch from './onReduxPatch';

const controller = {
  [constants.IPC_METHOD_REDUX_PATCH]: onReduxPatch,
};

export default (process, data) => handle(
  controller,
  data,
  response => process.send(response)
);
