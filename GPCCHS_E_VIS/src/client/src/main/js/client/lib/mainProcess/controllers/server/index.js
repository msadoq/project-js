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
