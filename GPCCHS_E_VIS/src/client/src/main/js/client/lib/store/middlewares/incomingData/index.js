// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 23/08/2017 : Update cache clean mechanism in dev tools
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Add throttle timing in configuration .
// END-HISTORY
// ====================================================================

import pipeMiddlewares from 'store/helpers/pipeMiddlewares';
import { get as getConf } from 'common/configurationManager';
import prepareRange from './prepareRange';
import prepareRangeADE from './prepareRangeADE';
import prepareObsoleteEventADE from './prepareObsoleteEventADE';
import prepareLast from './prepareLast';
import prepareLastADE from './prepareLastADE';
import preparePubSub from './preparePubSub';
import preparePubSubADE from './preparePubSubADE';
import injectData from './injectData';
import pubSubMonitor from './pubSubMonitor';
import constants from '../../../constants';

const versionDCComProtocol = getConf('VERSION_DC_COM_PROTOCOL');

const createIncomingDataMiddleware = (lokiKnownRangesManager,
                                      timingInjectData,
                                      timingPubSubMonitor) => pipeMiddlewares(
  preparePubSub(lokiKnownRangesManager),
  prepareRange(lokiKnownRangesManager),
  prepareLast(lokiKnownRangesManager),
  injectData(timingInjectData),
  pubSubMonitor(timingPubSubMonitor)
);

const createIncomingDataMiddlewareADE = (lokiKnownRangesManager,
                                         lokiObsoleteEventManager,
                                         timingInjectData,
                                         timingPubSubMonitor) => pipeMiddlewares(
  preparePubSubADE(lokiKnownRangesManager, lokiObsoleteEventManager),
  prepareRangeADE(lokiKnownRangesManager),
  prepareLastADE(lokiKnownRangesManager),
  prepareObsoleteEventADE(lokiObsoleteEventManager),
  injectData(timingInjectData),
  pubSubMonitor(timingPubSubMonitor)
);

const versionMap = {
  [constants.DC_COM_V1]: createIncomingDataMiddleware,
  [constants.DC_COM_V2]: createIncomingDataMiddlewareADE,
};

export default versionMap[versionDCComProtocol];
