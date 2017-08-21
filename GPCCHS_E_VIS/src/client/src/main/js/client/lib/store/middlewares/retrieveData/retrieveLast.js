import * as types from '../../types';
import { getLastRecords } from '../../../serverProcess/models/lokiKnownRangesData';
import { GETLASTTYPE_GET_LAST } from '../../../constants';
import { getUpperIntervalIsInKnownRanges } from '../../reducers/knownRanges';
import { add } from '../../../serverProcess/models/registeredArchiveQueriesSingleton';
import { newData } from '../../actions/incomingData';

const type = 'LAST';
const getLastArguments = { getLastType: GETLASTTYPE_GET_LAST };

const retrieveLast = ipc => ({ dispatch, getState }) => next => (action) => {
  if (action.type === types.VIEWS_NEED_LAST) {
    const neededLast = action.payload.neededLastData;
    const tbdIds = Object.keys(neededLast);
    for (let i = 0; i < tbdIds.length; i += 1) {
      const tbdId = tbdIds[i];
      const { dataId, filters, intervals } = neededLast[tbdIds[i]];
      // const rangesRecords = getRangesRecords(tbdId, intervals)[tbdId];
      // console.log(intervals);
      for (let j = 0; j < intervals.length; j += 1) {
        // TODO pgaucher, can this be optimized ?
        const { isInInterval, interval } = getUpperIntervalIsInKnownRanges(getState(),
                                                                           tbdId,
                                                                           intervals[j]);
        if (!isInInterval) {
          const args = { ...getLastArguments, filters };
          console.log('requestTimebasedQuery last : ', tbdId);
          const queryId = ipc.dc.requestTimebasedQuery(tbdId, dataId, intervals[j], args);
          add(queryId, tbdId, type, dataId);
        } else {
          const lastRecords = getLastRecords(tbdId, interval)[tbdId];
          if (Object.keys(lastRecords).length !== 0) {
            console.log('data exists in last : ', tbdId);
            dispatch(newData({ [tbdId]: lastRecords }));
          } else {
            const args = { ...getLastArguments, filters };
            const queryId = ipc.dc.requestTimebasedQuery(tbdId,
                                                         dataId,
                                                         intervals[j],
                                                         args);
            console.log('Data is in known range but does not exists for last :  requestTimebasedQuery', tbdId);
            add(queryId, tbdId, type, dataId);
          }
        }
      }
    }
  }
  return next(action);
};

export default retrieveLast;
