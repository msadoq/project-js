import handle from '../../../common/ipc/handle';

const controller = {};

export default (electronEvent, data) => handle(
  controller,
  data,
  response => electronEvent.sender.send('global', response)
);
