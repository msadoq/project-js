import getLogger from 'common/log';
import reply from '../../../utils/ipc/reply';
import { server } from '../../ipc';

const logger = getLogger('main:controllers:renderer:onGetSessionTime');

export default function (queryId, sessionId) {
  server.requestSessionTime(sessionId, ({ err, timestamp }) => {
    if (err) {
      logger.error(err);
      return;
    }
    reply(queryId, { timestamp });
  });
}
