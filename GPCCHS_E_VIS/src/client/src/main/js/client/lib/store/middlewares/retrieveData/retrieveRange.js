// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : Add skeleton for incomingData and retrieveData
//  middleware + their test
// VERSION : 1.1.2 : DM : #6700 : 01/08/2017 : Branch full cycle mechanism for rangeData
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Add PubSubController and retrieveLast/Range update
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Major changes : all data consumption is now plugged
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update retrieve range test and implemntation
// VERSION : 1.1.2 : FA : #7578 : 24/08/2017 : Add robustness code on dataId retrieval
// VERSION : 1.1.2 : DM : #6700 : 28/08/2017 : Add some exectuion map + minor lint fix
// VERSION : 2.0.0 : DM : #5806 : 06/10/2017 : Manage GroundAlarm in retrieve range middleware
// VERSION : 2.0.0 : DM : #5806 : 10/10/2017 : Fix issue with comObject naming for GroundAlarms
// VERSION : 2.0.0 : DM : #5806 : 17/10/2017 : UPDATE PUBSUB alarm controler to read properly
//  payload + bug fixes
// VERSION : 2.0.0 : DM : #5806 : 17/10/2017 : Refacto PubSub Alarm + tbd Alarm queries
// VERSION : 2.0.0 : FA : ISIS-FT-2229 : 18/10/2017 : Resolve merge conflict . .
// VERSION : 2.0.0 : DM : #5806 : 13/11/2017 : Pass mode into archive query (GMA/OBA)
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : Fix parseEntryPoint to take into account
//  provider field and update dc stubs
// END-HISTORY
// ====================================================================

import * as types from 'store/types';
import { getRecordsByInterval } from 'serverProcess/models/lokiGeneric';
import { getRangesRecords as getRangesRecordsSamplingOn } from 'serverProcess/models/lokiKnownRangesDataSamplingOn';
import { newData } from 'store/actions/incomingData';
import { getMissingIntervals } from 'store/reducers/knownRanges';
import { getMissingIntervalsSamplingOn } from 'store/reducers/knownRangesSamplingOn';
import { add } from 'serverProcess/models/registeredArchiveQueriesSingleton';
import { sendArchiveQuery } from 'store/actions/knownRanges';
import { sendArchiveQuerySamplingOn } from 'store/actions/knownRangesSamplingOn';
import { get } from 'common/configurationManager';
import mergeIntervals from 'common/intervals/merge';
import executionMonitor from 'common/logManager/execution';
import { PREFIX_KNOWN_RANGES } from 'constants';

const samplingNumber = get('SAMPLING_NUMBER');

const rangesRecordsFunction = (tbdId, intervals, sampl, prefix) => {
  switch (sampl) {
    case 'off': {
      return getRecordsByInterval(prefix, tbdId, intervals);
    }
    case 'on': {
      return getRangesRecordsSamplingOn(tbdId, intervals);
    }
    default: {
      return null;
    }
  }
};
const getMissingIntervalsFunction = (a, b, sampl) => {
  switch (sampl) {
    case 'off': {
      return getMissingIntervals(a, b);
    }
    case 'on': {
      return getMissingIntervalsSamplingOn(a, b);
    }
    default: {
      return null;
    }
  }
};
const samplingStringFunction = (sampl) => {
  switch (sampl) {
    case 'off': {
      return undefined;
    }
    case 'on': {
      return samplingNumber;
    }
    default: {
      return null;
    }
  }
};
const sendArchiveQueryFunction = (a, b, c, d, sampl) => {
  switch (sampl) {
    case 'off': {
      return sendArchiveQuery(a, b, c, d);
    }
    case 'on': {
      return sendArchiveQuerySamplingOn(a, b, c, d);
    }
    default: {
      return null;
    }
  }
};

const type = 'RANGE';
const retrieveRange = ipc => ({ dispatch, getState }) => next => (action) => {
  const execution = executionMonitor('middleware:retrieveRange');
  const nextAction = next(action);
  if (action.type === types.VIEWS_NEED_RANGE) {
    execution.start('global');
    const neededRange = action.payload.neededRangeData;
    const tbdIds = Object.keys(neededRange);
    for (let i = 0; i < tbdIds.length; i += 1) {
      const tbdId = tbdIds[i];
      const { dataId, filters, intervals, mode, sampling } = neededRange[tbdIds[i]];
      const rangesRecords = rangesRecordsFunction(tbdId, intervals, sampling, PREFIX_KNOWN_RANGES);
      if (Object.keys(rangesRecords[tbdId]).length !== 0) {
        dispatch(newData({ [PREFIX_KNOWN_RANGES]: rangesRecords }));
      }
      let mergedInterval = [];
      for (let k = 0; k < intervals.length; k += 1) {
        execution.start('get missing intervals');
        const missingIntervals = getMissingIntervalsFunction(getState(),
          { tbdId,
            queryInterval: intervals[k],
          },
          sampling
        );
        execution.stop('get missing intervals');
        for (let j = 0; j < missingIntervals.length; j += 1) {
          const queryId = ipc.dc.requestTimebasedQuery(
            tbdId,
            dataId,
            missingIntervals[j],
            { filters, alarmMode: { mode } },
            samplingStringFunction(sampling)
          );
          add(queryId, tbdId, PREFIX_KNOWN_RANGES, dataId, samplingStringFunction(sampling));
        }
        execution.start('merge interval');
        mergedInterval = mergeIntervals(mergedInterval, missingIntervals);
        execution.stop('merge interval');
      }
      if (mergedInterval.length !== 0) {
        dispatch(sendArchiveQueryFunction(tbdId, dataId, mergedInterval, filters, sampling));
      }
    }
    execution.stop('global');
    execution.print();
  }
  return nextAction;
};

export default retrieveRange;
