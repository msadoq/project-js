// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 30/08/2017 : move dumpBuffer use in a specific middleware
// END-HISTORY
// ====================================================================

import pipeMiddlewares from 'store/helpers/pipeMiddlewares';
import dumpBufferArchive from './dumpBufferArchive';
import dumpBufferPubSub from './dumpBufferPubSub';

const createDumpBufferMiddleware = () => pipeMiddlewares(
  dumpBufferArchive(),
  dumpBufferPubSub()
);

export default createDumpBufferMiddleware;
