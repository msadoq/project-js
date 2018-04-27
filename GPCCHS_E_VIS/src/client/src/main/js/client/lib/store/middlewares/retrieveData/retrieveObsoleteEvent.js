// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : Add skeleton for incomingData and retrieveData middleware + their test
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Add PubSubController and retrieveLast/Range update
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Major changes : all data consumption is now plugged
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update tests and implementation . .
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix error in retrieveLast and update its related tests
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Clean console log . . .
// VERSION : 1.1.2 : FA : #7578 : 24/08/2017 : Add robustness code on dataId retrieval
// VERSION : 1.1.2 : DM : #6700 : 28/08/2017 : Add some exectuion map + minor lint fix
// END-HISTORY
// ====================================================================
import _forEach from 'lodash/forEach';
import executionMonitor from 'common/logManager/execution';
import * as types from '../../types';
import { add } from '../../../serverProcess/models/registeredArchiveQueriesSingleton';
import { newData } from '../../actions/incomingData';
import { getLastRecords } from '../../../serverProcess/models/lokiKnownRangesData';
import { getUpperIntervalIsInKnownRanges } from '../../reducers/knownRanges';

const type = 'OBSOLETE_EVENT';

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
      for (let j = 0; j < intervals.length; j += 1) {
        execution.start('Check if in known ranges');
        const { isInInterval, interval, filters } = getUpperIntervalIsInKnownRanges(getState(),
          tbdId,
          intervals[j]);
        execution.stop('Check if in known ranges');
        const flatIdLogBookEvent =
          `LogbookEventDefinition.OBSOLETE_PARAMETER<LogbookEvent>:${dataId.sessionId}:${dataId.domainId}:${dataId.provider}::`;
        const dataIdLogBookEvent = {
          catalog: 'LogbookEventDefinition',
          parameterName: 'OBSOLETE_PARAMETER',
          comObject: 'LogbookEvent',
          domainId: dataId.domainId,
          domain: dataId.domain,
          sessionName: dataId.sessionName,
          sessionId: dataId.sessionId,
          provider: dataId.provider,
        };
        // if not in known ranges a query to DC is needed
        if (!isInInterval) {
          const queryId =
            ipc.dc.requestTimebasedQuery(
              flatIdLogBookEvent,
              dataIdLogBookEvent,
              intervals[j],
              { filters });
          add(queryId, flatIdLogBookEvent, type, dataId);
        } else {
          // if in known range, first we need to know if events are present in cache

          // in this case dispatch newData from event cache
          // else we need to make a query to DC
        }
      }
    }
    execution.stop('global');
    execution.print();
  }
  return nextAction;
};

export default retrieveObsoleteEvent;
