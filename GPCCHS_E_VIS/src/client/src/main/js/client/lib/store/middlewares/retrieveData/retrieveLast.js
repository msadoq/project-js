import * as types from '../../types';
import { getRangesRecords } from '../../../serverProcess/models/lokiKnownRangesData';
import { GETLASTTYPE_GET_LAST } from '../../../constants';
import { getUpperIntervalIsInKnownRanges } from '../../reducers/knownRanges';
import ipc from '../../../serverProcess/ipc';
import { add } from '../../../serverProcess/models/registeredArchiveQueriesSingleton';
import { newData } from '../../actions/incomingData';

const type = 'LAST';
const getLastArguments = { getLastType: GETLASTTYPE_GET_LAST }; 

const retrieveLast = () => ({ dispatch, getState }) => next => (action) => {
  if (action.type === types.VIEWS_NEED_LAST) {
    console.log('[RetrieveLastData] VIEWS_NEED_LAST action');
    const neededLast = action.payload.neededLastData;
    const tbdIds = Object.keys(neededLast);
    for (let i = 0; i < tbdIds.length; i += 1) {
      const tbdId = tbdIds[i];
      const { dataId, filters, intervals } = neededLast[tbdIds[i]];

      // const rangesRecords = getRangesRecords(tbdId, intervals)[tbdId];
      for (let j = 0; j < intervals.length; j += 1) {
        // TODO pgaucher, can this be optimized ?
        const { isInInterval, interval } = getUpperIntervalIsInKnownRanges(getState(), tbdId, intervals[j][1]);
        if (!isInInterval) {
          const args = { ...getLastArguments, filters };
          const queryId = ipc.dc.requestTimebasedQuery(tbdId, dataId, intervals[j], args);
          add(queryId, tbdId, type, dataId);
        } else {
          const rangesRecords = getRangesRecords(tbdId, [interval])[tbdId];
          if (Object.keys(rangesRecords).length !== 0) {
            dispatch(newData({ [tbdId]: rangesRecords[rangesRecords.length - 1] }));
          } else {
            const args = { ...getLastArguments, filters };
            const queryId = ipc.dc.requestTimebasedQuery(tbdId, dataId, [[intervals[j][0], interval[0]]], args);
            add(queryId, tbdId, type, dataId);
          }
        }
      }



      // for (let k = 0; k < intervals.length; k += 1){
      //   const missingIntervals = getMissingIntervals(getState(), { tbdId, queryInterval: intervals[k] });
      //   for (let j = 0; j < missingIntervals.length; j += 1){
      //     // TODO pgaucher :  no filters here ?
      //     const queryId = ipc.dc.requestTimebasedQuery(tbdId, dataId, missingIntervals[j], { filters });
      //     add(queryId, tbdId, type, dataId);
      //   }
      //   dispatch(sendArchiveQuery(tbdId, dataId, missingIntervals, filters));
      // }
    }

    // console.log('tbdIds : ', neededLast);
  }
  return next(action);
};

export default retrieveLast;
