import handle from 'common/ipc/handle';
// import globalConstants from 'common/constants';

const controller = {};

export default (electronEvent, data) => handle(
  controller,
  data,
  response => electronEvent.sender.send('global', response)
);
