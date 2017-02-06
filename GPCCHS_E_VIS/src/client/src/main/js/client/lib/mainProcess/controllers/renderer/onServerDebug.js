import getLogger from 'common/log';
import reply from 'common/ipc/reply';
import { server } from '../../ipc';

const logger = getLogger('main:controllers:renderer:onServerDebug');

export default function (queryId) {
  server.requestServerDebug(({ err, debug }) => {
    if (err) {
      return logger.error(err);
    }

    return reply(queryId, debug);
  });
}
