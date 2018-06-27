// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : Add skeleton for incomingData and retrieveData middleware + their test
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Add PubSubController and retrieveLast/Range update
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Major changes : all data consumption is now plugged
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update tests and implementation . .
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix error in retrieveLast and update its related tests
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Clean consoleconsole log . . .
// VERSION : 1.1.2 : FA : #7578 : 24/08/2017 : Add robustness code on dataId retrieval
// VERSION : 1.1.2 : DM : #6700 : 28/08/2017 : Add some exectuion map + minor lint fix
// END-HISTORY
// ====================================================================
import executionMonitor from 'common/logManager/execution';
import { getRecordsByInterval } from 'serverProcess/models/lokiGeneric';
import flattenDataId, { getFlattenDataIdForObsoleteEvent } from 'common/flattenDataId';
import { PREFIX_OBSOLETE_EVENTS } from 'constants';
import * as types from '../../types';
import { add } from '../../../serverProcess/models/registeredArchiveQueriesSingleton';
import { newData } from '../../actions/incomingData';
import { sendArchiveQuery } from '../../actions/ObsoleteEvents';
import { getMissingIntervals } from '../../reducers/ObsoleteEvents';
import mergeIntervals from '../../../common/intervals/merge';

// const type = 'OBSOLETE_EVENT';

const retrieveObsoleteEvent = ipc => ({ dispatch, getState }) => next => (action) => {
  const execution = executionMonitor('middleware:retrieveLast');
  const nextAction = next(action);

  if (action.type === types.VIEWS_NEED_OBSOLETE_EVENT) {
    execution.start('global');
    const neededEvents = action.payload.neededObsoleteEventData;
    const tbdIds = Object.keys(neededEvents);
    for (let i = 0; i < tbdIds.length; i += 1) {
      const tbdId = tbdIds[i];
      const { dataId, intervals } = neededEvents[tbdIds[i]];
      const flatObsoleteEventId = getFlattenDataIdForObsoleteEvent(dataId);
      // getObsoleteEventData
      const obsoleteEventsRecords =
        getRecordsByInterval(PREFIX_OBSOLETE_EVENTS, flatObsoleteEventId, intervals);
      if (Object.keys(obsoleteEventsRecords[flatObsoleteEventId]).length !== 0) {
        dispatch(newData({ [PREFIX_OBSOLETE_EVENTS]: obsoleteEventsRecords }));
      }

      let mergedInterval = [];
      for (let k = 0; k < intervals.length; k += 1) {
        execution.start('get missing intervals');
        const missingIntervals = getMissingIntervals(getState(),
          { tbdId,
            queryInterval: intervals[k],
          });
        execution.stop('get missing intervals');

        for (let j = 0; j < missingIntervals.length; j += 1) {
          const dataIdLogBookEvent = {
            catalog: 'LogbookEventDefinition',
            parameterName: 'OBSOLETE_PARAMETER',
            comObject: 'LogbookEvent',
            domainId: dataId.domainId,
            domain: dataId.domain,
            sessionName: dataId.sessionName,
            sessionId: dataId.sessionId,
            provider: '',
          };
          const flatIdLogBookEvent = flattenDataId(dataIdLogBookEvent);
          const queryId = ipc.dc.requestTimebasedQuery(
            flatIdLogBookEvent,
            dataIdLogBookEvent,
            intervals[k],
            {});

          add(queryId, flatIdLogBookEvent, PREFIX_OBSOLETE_EVENTS, dataId);
        }

        execution.start('merge interval');
        mergedInterval = mergeIntervals(mergedInterval, missingIntervals);
        execution.stop('merge interval');
      }
      if (mergedInterval.length !== 0) {
        dispatch(sendArchiveQuery(flatObsoleteEventId, dataId, mergedInterval));
      }
    }
    execution.stop('global');
    execution.print();
  }
  return nextAction;
};

export default retrieveObsoleteEvent;
