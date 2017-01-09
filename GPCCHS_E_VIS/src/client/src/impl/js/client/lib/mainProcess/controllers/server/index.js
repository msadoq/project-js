import handle from 'common/ipc/handle';

const controller = {};

export default (process, data) => handle(
  controller,
  data,
  response => process.send(response),
);
