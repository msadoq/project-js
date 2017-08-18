import * as types from '../../types';
import {
  isDataIdInCache,
  isTimestampInKnownRanges,
  getKnownRanges } from '../../reducers/knownRanges';
import {
  isDataIdInDatamapLast,
  isTimestampInLastDatamapInterval } from '../../../dataManager/mapSelector';
import { decode, getType } from '../../../utils/adapters';
import { applyFilters } from '../../../viewManager/commonData/applyFilters';
import { set as setLastPubSubTimestamp } from '../../../serverProcess/models/lastPubSubTimestamp';
import executionMonitor from '../../../common/logManager/execution';
import { dumpBuffer } from '../../../serverProcess/utils/dumpBuffer';
import dataMapGenerator from '../../../dataManager/map';
import { newData } from '../../../store/actions/incomingData';

const logger = require('../../../common/logManager')('middlewares:preparePubSub');

const preparePubSub = lokiManager => ({ dispatch, getState }) => next => (action) => { // eslint-disable-line
  // Catches incomingPubSub(dataId, peers)
  if (action.type !== types.INCOMING_PUBSUB_DATA) {
    return next(action);
  }
  // console.log('[PreparePubSubMiddleware] ON_INCOMING_PUBSUB_DATA action');

  const execution = executionMonitor('preparePubSub');
  execution.start('global');

  // check payloads parity
  const payloadBuffers = action.payload.peers;
  if (payloadBuffers.length % 2 !== 0) {
    logger.warn('payloads should be sent by (timestamp, payloads) peers');
    return next(action);
  }

  const state = getState();
  const dataId = action.payload.dataId;
  // ** get payload type and check validity
  const payloadProtobufType = getType(dataId.comObject);
  if (typeof payloadProtobufType === 'undefined') {
    logger.error('unsupported comObject', dataId.comObject); // TODO send error to client
    return next(action);
  }
  // Retrieves tbdIds corresponding to dataId from store.knownRanges (storeTbdIds)
  const storeTbdIds = isDataIdInCache(state, { dataId });
  // Retrieve tbdIds corresponding to dataId from dataMap.expectedLastInterval (dataMapTbdIds)
  const dataMapTbdIds = isDataIdInDatamapLast(state, dataId);
  // Compute dataMap
  const dataMap = dataMapGenerator(state);

  // Reduce peers as data by decoding timestamp buffers
  // Loop over peers and for each decode timestamp
  let payloadsJson = {};
  let iBuffer = 0;
  while (iBuffer < payloadBuffers.length) {
    // Get elements by peer
    const timeBuffer = payloadBuffers[iBuffer];
    iBuffer += 1;
    const dataBuffer = payloadBuffers[iBuffer];
    iBuffer += 1;

    execution.start('decode timestamp');
    const timestamp = decode('dc.dataControllerUtils.Timestamp', timeBuffer);
    execution.stop('decode timestamp');

    setLastPubSubTimestamp(timestamp.ms);
    // dump: if activated, save a file per timestamp with binary payload
    dumpBuffer(dataId, timestamp.ms, dataBuffer);

    // decode Payload only once by payloadBuffer loop to avoid resource-consuming
    execution.start('decode payload');
    // deprotobufferize payload
    const decodedPayload = decode(payloadProtobufType, dataBuffer);
    execution.stop('decode payload');
    // For each tbdId in storeList
    // console.log('storeTbdIds : ', storeTbdIds);
    for (let i = 0; i < storeTbdIds.length; i += 1) {
      const tbdId = storeTbdIds[i];
      const filters = getKnownRanges(state, { tbdId }).filters;
      payloadsJson = updateFinalPayload(state,
        { tbdId,
          timestamp: timestamp.ms,
          decodedPayload,
          isInIntervals: isTimestampInKnownRanges,
          filters,
          addRecord: lokiManager.addRecord },
        payloadsJson);
    }
    // For each tbdId in dataMapList
    for (let i = 0; i < dataMapTbdIds.length; i += 1) {
      const tbdId = dataMapTbdIds[i];
      // If tbdId already present in final object, checks if current timestamp is already stored
      if (!payloadsJson[tbdId] || !payloadsJson[tbdId][timestamp.ms]) {
        const filters = dataMap.perLastTbdId[tbdId].filters;
        payloadsJson = updateFinalPayload(state,
          { tbdId,
            timestamp: timestamp.ms,
            decodedPayload,
            isInIntervals: isTimestampInLastDatamapInterval,
            filters },
          payloadsJson);
      }
    }
  }
  // dispatch data per tbdId
  const tbdIds = Object.keys(payloadsJson);
  if (tbdIds.length) dispatch(newData(payloadsJson));

  return next(action);
};

/**
 * Add a set of values in a collection for a given tbdId
 * @param {function} isInInterval
 * @param {Object}
            {string} tbdId: tbdId of data to check
            {number} timestamp: timestamp to check in ms
            {Object} decodedPayload: the decoded payload
            {function} isInIntervals: check if data is in intervals (state, { tbdId, timestamp })
            {Array} filters
            {function} addRecord: function to add record in cache. Can be undefined
 * @param {Object} finalPayloads
 * @return {Object} updated finalPayload
 */
export const updateFinalPayload = (
  state,
  { tbdId, timestamp, decodedPayload, isInIntervals, filters, addRecord },
  finalPayloads) => {
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
