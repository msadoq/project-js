import constants from 'constants';
import handle from 'common/ipc/handle';

const onReduxPatch = require('./onReduxPatch');

const controller = {
  [constants.IPC_METHOD_REDUX_PATCH]: onReduxPatch,
};

export default (electronEvent, data) => handle(
  controller,
  data,
  response => electronEvent.sender.send('global', response)
);
