import constants from '../../../constants';
import handle from '../../../common/ipc/handle';

import onReduxPatch from './onReduxPatch';
import onError from './onError';

const controller = {
  [constants.IPC_METHOD_REDUX_PATCH]: onReduxPatch,
  [constants.IPC_METHOD_ERROR]: onError,
};

export default (process, data) => handle(
  controller,
  data,
  response => process.send(response)
);
