// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 20/06/2017 : Cleanup main and server startup process
// VERSION : 1.1.2 : DM : #6700 : 21/06/2017 : Fix merge and add robustness code in server process bootstraping
// END-HISTORY
// ====================================================================

import zmq from 'common/zmq';
import getLogger from '../../common/logManager';

export default function connectToZmq(pullUrl, pushUrl, callback) {
  if (!pullUrl || !pushUrl) {
    throw new Error('Push and pull ZMQ URLs are required');
  }

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
