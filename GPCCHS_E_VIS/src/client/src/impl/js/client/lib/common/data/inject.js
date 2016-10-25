import profiling from '../debug/profiling';
import { importPayload } from '../../store/actions/dataCache';
import debug from '../debug/mainDebug';

const logger = debug('data:inject');

export default function inject(dispatch, data) {
  logger.verbose('begin');

  const start = profiling.start();

  dispatch(importPayload(data));

  profiling.stop(
    start,
    `dataInjection done (${
      Object.keys(data).length ? Object.keys(data).length : 0
    } remoteId injected)`
  );
}
