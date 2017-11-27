import { v4 } from 'uuid';
import { openInCurrentWindow as openModalInCurrentWindow } from '../../../store/actions/modals';

const openAckModal = (viewId, alarmsOids) => {
  const ackId = v4();
  return openModalInCurrentWindow({
    type: 'obaAck',
    title: 'On Board Alarm',
    ackId,
    viewId,
    alarmsOids,
  });
};

export default {
  openAckModal,
};
