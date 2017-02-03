import getLogger from 'common/log';
import reply from 'common/ipc/reply';
import { server } from '../../ipc';
import { getStore } from '../../../store/mainStore';
import { updateSessions } from '../../../store/actions/sessions';

const logger = getLogger('main:controllers:renderer:onReloadSessions');

export default function (queryId) {
  server.requestSessions(({ err, sessions } = []) => {
    if (err) {
      logger.error(err);
      return;
    }

    // update sessions list in store
    getStore().dispatch(updateSessions(sessions));

    // inform renderer process that sessions are up to date
    reply(queryId, { done: true });
  });
}
