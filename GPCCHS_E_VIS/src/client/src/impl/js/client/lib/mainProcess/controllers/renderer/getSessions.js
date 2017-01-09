import getLogger from 'common/log';
import { server } from '../../ipc';
import { getStore } from '../../../store/mainStore';
import { updateSessions } from '../../../store/actions/sessions';

const logger = getLogger('main:controllers:renderer:getSessions');

export default function (reply, event, payload, queryId) {
  server.requestSessions((err, sessions = []) => {
    if (err) {
      return logger.error(err);
    }

    // update sessions list in store
    getStore().dispatch(updateSessions(sessions));

    // inform renderer process that sessions are up to date
    reply({ event: 'runCallback', queryId });
  });
}
