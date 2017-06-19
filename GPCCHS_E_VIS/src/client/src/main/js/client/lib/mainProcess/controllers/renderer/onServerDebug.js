import getLogger from '../../../common/logManager';
import reply from '../../../common/ipc/reply';
import { server } from '../../ipc';

const logger = getLogger('main:controllers:renderer:onServerDebug');

export default function (queryId) {
  server.requestServerDebug(({ err, debug }) => {
    if (err) {
      logger.error(err);
      reply(queryId);
      return;
    }

    reply(queryId, debug);
  });
}
