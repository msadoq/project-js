import handle from 'common/ipc/handle';
import globalConstants from 'common/constants';
import onError from './onError';

const controller = {
  [globalConstants.IPC_METHOD_ERROR]: onError,
};

export default (process, data) => handle(
  controller,
  data,
  response => process.send(response)
);
