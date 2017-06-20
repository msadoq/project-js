import zmq from 'common/zmq';
import getLogger from '../../common/logManager';

export default function connectToZmq(pullUrl, pushUrl, callback) {
  // eslint-disable-next-line global-require, "DV6 TBC_CNES LPISIS packaging constrain"
  const dcController = require('../controllers/dc');
  const zmqConfiguration = {
    dcPull: {
      type: 'pull',
      role: 'server',
      url: pullUrl,
      handler: dcController,
    },
    dcPush: {
      type: 'push',
      role: 'client',
      url: pushUrl,
    },
    options: {
      logger: getLogger('server:zmq'),
    },
  };

  zmq.open(zmqConfiguration, callback);
}
