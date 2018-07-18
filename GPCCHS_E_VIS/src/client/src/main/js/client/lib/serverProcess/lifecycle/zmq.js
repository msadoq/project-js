// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 20/06/2017 : Cleanup main and server startup process
// VERSION : 1.1.2 : DM : #6700 : 21/06/2017 : Fix merge and add robustness code in server process
//  bootstraping
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import zmq from 'common/zmq';
import getLogger from 'common/logManager';

const { resolve } = require('path');

const rootVimaFolder = process.env.IS_BUNDLED === 'on' ? __dirname : resolve(__dirname, '../../..');
const dynamicRequire = process.env.IS_BUNDLED === 'on' ? global.dynamicRequire : require;

export default function connectToZmq(pullUrl, pushUrl, name, callback) {
  if (!pullUrl || !pushUrl) {
    throw new Error('Push and pull ZMQ URLs are required');
  }

  const zmqConfiguration = {
    [`${name}Pull`]: {
      type: 'pull',
      role: 'server',
      url: pullUrl,
      handler: dynamicRequire(resolve(rootVimaFolder, 'lib/serverProcess/controllers', name)),
    },
    [`${name}Push`]: {
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
