import * as types from 'store/types';
import { getLastRecords } from 'serverProcess/models/lokiKnownRangesData';
import { GETLASTTYPE_GET_LAST } from 'constants';
import { getUpperIntervalIsInKnownRanges } from 'store/reducers/knownRanges';
import { add } from 'serverProcess/models/registeredArchiveQueriesSingleton';
import { newData } from 'store/actions/incomingData';
import executionMonitor from 'common/logManager/execution';

const type = 'LAST';
const getLastArguments = { getLastType: GETLASTTYPE_GET_LAST };

const retrieveLast = ipc => ({ dispatch, getState }) => next => (action) => {
  const execution = executionMonitor('middleware:retrieveLast');

  const nextAction = next(action);
  if (action.type === types.VIEWS_NEED_LAST) {
    execution.start('global');
    const neededLast = action.payload.neededLastData;
    const tbdIds = Object.keys(neededLast);
    for (let i = 0; i < tbdIds.length; i += 1) {
      const tbdId = tbdIds[i];
      const { dataId, filters, intervals } = neededLast[tbdIds[i]];
      for (let j = 0; j < intervals.length; j += 1) {
        // TODO pgaucher, can this be optimized ?
        execution.start('Check if in known ranges');
        const { isInInterval, interval } = getUpperIntervalIsInKnownRanges(getState(),
                                                                           tbdId,
                                                                           intervals[j]);
        execution.stop('Check if in known ranges');
        if (!isInInterval) {
          const args = { ...getLastArguments, filters };
          const queryId = ipc.dc.requestTimebasedQuery(tbdId, dataId, intervals[j], args);
          add(queryId, tbdId, type, dataId);
        } else {
          execution.start('get last records');
          const lastRecords = getLastRecords(tbdId, interval)[tbdId];
          execution.stop('get last records');
          if (Object.keys(lastRecords).length !== 0) {
            dispatch(newData({ [tbdId]: lastRecords }));
          } else {
            const args = { ...getLastArguments, filters };
            const queryId = ipc.dc.requestTimebasedQuery(tbdId,
                                                         dataId,
                                                         intervals[j],
                                                         args);
            add(queryId, tbdId, type, dataId);
          }
        }
      }
    }
    execution.stop('global');
    execution.print();
  }
  return nextAction;
};

export default retrieveLast;
