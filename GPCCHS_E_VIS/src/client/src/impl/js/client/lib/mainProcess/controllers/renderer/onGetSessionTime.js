import getLogger from 'common/log';
import reply from 'common/ipc/reply';
import { server } from '../../ipc';

const logger = getLogger('main:controllers:renderer:onGetSessionTime');

export default function (queryId) {
  server.requestSessionTime(({ err, time }) => {
    if (err) {
      return logger.error(err);
    }

    reply(queryId, time);
  });
}
