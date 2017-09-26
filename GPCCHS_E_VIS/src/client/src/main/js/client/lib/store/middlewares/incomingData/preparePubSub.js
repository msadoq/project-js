// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix forecast error and fix related tests
// VERSION : 1.1.2 : FA : #7578 : 23/08/2017 : Add throttle mechanism to pubSubController
// VERSION : 1.1.2 : FA : #7578 : 24/08/2017 : Add robustness code on dataId retrieval
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Add redux and patch workflow improvment + remove store observer
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Add execution map trace in three middlewares to make performance analysis easier
// VERSION : 1.1.2 : DM : #6700 : 30/08/2017 : move dumpBuffer use in a specific middleware
// VERSION : 1.1.2 : DM : #6816 : 06/09/2017 : test perfs on hss process
// END-HISTORY
// ====================================================================

import _isBuffer from 'lodash/isBuffer';
import * as types from '../../types';
import {
  isDataIdInCache,
  isTimestampInKnownRanges,
  getKnownRanges,
} from '../../reducers/knownRanges';
import {
  isDataIdInDatamapLast,
  isTimestampInLastDatamapInterval,
} from '../../../dataManager/mapSelector';
import { decode, getType } from '../../../utils/adapters';
import { applyFilters } from '../../../viewManager/commonData/applyFilters';
import { set as setLastPubSubTimestamp } from '../../../serverProcess/models/lastPubSubTimestamp';
import executionMonitor from '../../../common/logManager/execution';
import dataMapGenerator from '../../../dataManager/map';
import { newData } from '../../../store/actions/incomingData';

const logger = require('../../../common/logManager')('middleware:preparePubSub');

const preparePubSub = lokiManager => ({ dispatch, getState }) => next => (action) => {
  const nextAction = next(action);
  if (action.type !== types.INCOMING_PUBSUB_DATA) {
    return nextAction;
  }

  const execution = executionMonitor('middleware:preparePubSub');
  execution.start('global');

  // check payloads parity
  const payloadBuffersMap = action.payload.data;
  const payloadBuffersArray = Object.keys(payloadBuffersMap);
  // Compute dataMap
  execution.start('dataMap');
  const state = getState();
  const dataMap = dataMapGenerator(state);
  execution.stop('dataMap');

  let payloadsJson = {};

  for (let i = 0; i < payloadBuffersArray.length; i += 1) {
    const { dataId, payloadBuffers } = payloadBuffersMap[payloadBuffersArray[i]];
    // get payload type and check validity
    const payloadProtobufType = getType(dataId.comObject);
    if (typeof payloadProtobufType === 'undefined') {
      // TODO dispatch error
      logger.error('unsupported comObject', dataId.comObject);
      execution.stop('global');
      execution.print();
      return nextAction;
    }

    // Retrieves tbdIds corresponding to dataId from store.knownRanges (storeTbdIds)
    execution.start('isDataIdInCache');
    const storeTbdIds = isDataIdInCache(state, { dataId });
    execution.stop('isDataIdInCache');
    // Retrieve tbdIds corresponding to dataId from dataMap.expectedLastInterval (dataMapTbdIds)
    execution.start('isDataIdInDatamapLast');
    const dataMapTbdIds = isDataIdInDatamapLast(state, dataId);
    execution.stop('isDataIdInDatamapLast');

    // Reduce peers as data by decoding timestamp buffers
    // Loop over peers and for each decode timestamp
    let iBuffer = 0;
    while (iBuffer < payloadBuffers.length) {
      // Get elements by peer
      const timeBuffer = payloadBuffers[iBuffer];
      const dataBuffer = payloadBuffers[iBuffer + 1];
      iBuffer += 2;
      // robustness code, LPISIS could send empty ZeroMQ frame
      if (_isBuffer(timeBuffer) && _isBuffer(dataBuffer)) {
        execution.start('decode timestamp');
        const timestamp = decode('dc.dataControllerUtils.Timestamp', timeBuffer);
        execution.stop('decode timestamp');

        // persist last received pub/sub timestamp
        setLastPubSubTimestamp(timestamp.ms);

        // decode Payload only once by payloadBuffer loop to avoid resource-consuming
        execution.start('decode payload');
        const decodedPayload = decode(payloadProtobufType, dataBuffer);
        execution.stop('decode payload');

        // For each tbdId in storeList
        execution.start('process for ranges');
        for (let j = 0; j < storeTbdIds.length; j += 1) {
          const tbdId = storeTbdIds[j];
          const filters = getKnownRanges(state, { tbdId }).filters;
          payloadsJson = updateFinalPayload(state, {
            tbdId,
            timestamp: timestamp.ms,
            decodedPayload,
            isInIntervals: isTimestampInKnownRanges,
            filters,
            addRecord: lokiManager.addRecord,
          }, payloadsJson);
        }
        execution.stop('process for ranges');

        // For each tbdId in dataMapList
        execution.start('process for lasts');
        for (let k = 0; k < dataMapTbdIds.length; k += 1) {
          const tbdId = dataMapTbdIds[k];
          // If tbdId already present in final object, checks if current timestamp is already stored
          if (!payloadsJson[tbdId] || !payloadsJson[tbdId][timestamp.ms]) {
            const filters = dataMap.perLastTbdId[tbdId].filters;
            payloadsJson = updateFinalPayload(state, {
              tbdId,
              timestamp: timestamp.ms,
              decodedPayload,
              isInIntervals: isTimestampInLastDatamapInterval,
              filters,
            }, payloadsJson);
          }
        }
        execution.stop('process for lasts');
      }
    }
  }
  // dispatch data per tbdId
  const tbdIds = Object.keys(payloadsJson);

  if (tbdIds.length) {
    dispatch(newData(payloadsJson));
  }

  execution.stop('global');
  execution.print();
  return nextAction;
};

/**
 * Add a set of values in a collection for a given tbdId
 * @param {Object} state
 * @param {Object}
            {string} tbdId: tbdId of data to check
            {number} timestamp: timestamp to check in ms
            {Object} decodedPayload: the decoded payload
            {function} isInIntervals: check if data is in intervals (state, { tbdId, timestamp })
            {function} isInInterval
            {Array} filters
            {function} addRecord: function to add record in cache. Can be undefined
 * @param {Object} finalPayloads
 * @return {Object} updated finalPayload
 */
export const updateFinalPayload = (
  state,
  { tbdId, timestamp, decodedPayload, isInIntervals, filters, addRecord },
  finalPayloads
) => {
  const updatedPayloads = finalPayloads;
  // If timestamp is in a known interval
  if (isInIntervals(state, { tbdId, timestamp })) {
    // If data validates filters
    if (applyFilters(decodedPayload, filters)) {
      // Store data in cache with the current tbdId
      if (addRecord) {
        addRecord(tbdId, { timestamp, payload: decodedPayload });
      }
      // Add data to final object with the current tbdId
      if (!updatedPayloads[tbdId]) {
        updatedPayloads[tbdId] = {};
      }
      updatedPayloads[tbdId][timestamp] = decodedPayload;
    }
  }
  return updatedPayloads;
};

export default preparePubSub;
