import profiling from '../../common/debug/profiling';
import { importPayload } from '../../store/actions/dataCache';
import debug from '../../common/debug/mainDebug';

const logger = debug('data:requests');

export default function dataReceived(dispatch, data) {
  logger.verbose('begin data/received');

  const start = profiling.start();

  dispatch(importPayload(data));

  profiling.stop(
    start,
    `dataReceived done (${
      Object.keys(data).length ? Object.keys(data).length : 0
    } remoteId injected)`
  );
}
