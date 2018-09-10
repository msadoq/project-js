// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move common/callback and common/ipc modules in
//  client sub-component
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper
//  modules
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge
//  with dev
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import constants from 'constants';
import handle from 'common/ipc/handle';

const onReduxPatch = require('./onReduxPatch');
const onSingletonPatch = require('./onSingletonPatch');

const controller = {
  [constants.IPC_METHOD_REDUX_PATCH]: onReduxPatch,
  [constants.IPC_METHOD_SINGLETON_PATCH]: onSingletonPatch,
};

export default (electronEvent, data) => handle(
  controller,
  data,
  response => electronEvent.sender.send('global', response)
);
