const { decode, getType } = require('../../../utils/adapters');
const _each = require('lodash/each');
const _chunk = require('lodash/chunk');
const { writeFile } = require('fs');
const { join } = require('path');
const executionMonitor = require('../../../common/logManager/execution');
const logger = require('../../../common/logManager')('controllers:onTimebasedPubSubData');
const loggerData = require('../../../common/logManager')('controllers:incomingData');
const { get } = require('../../../common/configurationManager');
const flattenDataId = require('../../../common/flattenDataId');
const { add: addToQueue } = require('../../models/dataQueue');
const { getOrCreateTimebasedDataModel } = require('../../models/timebasedDataFactory');
const connectedDataModel = require('../../models/connectedData');
const { set: setLastPubSubTimestamp } = require('../../models/lastPubSubTimestamp');
const { createDumpFolder, getDumpFolder } = require('../../utils/dumpFolder');

const dump = (get('DUMP') === 'on');

/**
 * Trigger on new incoming message NewDataMessage from DC.
 *
 * - if there is no remoteId for this dataId, stop logic
 * - loop over arguments (timestamp, payload) peers
 *    - loop over remoteId
 *        - if timestamp not in interval in connectedData model, continue to next iteration
 *        - deprotobufferize payload
 *        - queue a ws newData message (sent periodically)
 *
 * @param queryIdBuffer (not used for now)
 * @param dataIdBuffer
 * @param payloadsBuffers
 */
module.exports = (
  queryIdBuffer,
  dataIdBuffer,
  ...payloadsBuffers
) => {
  logger.silly('called');
  const execution = executionMonitor('pubSubData');
  execution.start('global');

  logger.silly('received data from pubSub');

  execution.start('decode dataId');
  // deprotobufferize dataId
  logger.silly('decode dataId');
  const dataId = decode('dc.dataControllerUtils.DataId', dataIdBuffer);
  execution.stop('decode dataId');

  // get payload type
  const payloadProtobufType = getType(dataId.comObject); //TODO Error in GetType ( xxx.xxx.comObject VS comObject )
  if (typeof payloadProtobufType === 'undefined') {
    logger.error('unsupported comObject', dataId.comObject); // TODO send error to client
    return 0;
  }

  execution.start('retrieve subscription');
  const flatDataId = flattenDataId(dataId);
  if (!connectedDataModel.exists(flatDataId)) {
    logger.silly('no query registered for this dataId', dataId);
    return;
  }
  if (payloadsBuffers.length % 2 !== 0) {
    logger.silly('payloads should be sent by (timestamp, payloads) peers');
    return;
  }

  let dumpFolder;
  if (dump) {
    createDumpFolder(dataId);
    dumpFolder = getDumpFolder(dataId);
  }
  // loop over arguments peers (timestamp, payload)
  _each(_chunk(payloadsBuffers, 2), (payloadBuffer) => {
    execution.start('decode timestamp');
    const timestamp = decode('dc.dataControllerUtils.Timestamp', payloadBuffer[0]);
    execution.stop('decode timestamp');

    setLastPubSubTimestamp(timestamp.ms);

    let decodedPayload;
    execution.start('control interval');
    // if timestamp not in interval in connectedData model, continue to next iteration
    const isKnownInterval = connectedDataModel.isTimestampInKnownIntervals(
      flatDataId, timestamp.ms
    );

    const date = new Date(timestamp.ms);

    if (!isKnownInterval) {
      loggerData.debug({
        controller: 'onTimebasedPubSubData',
        flatDataId,
        date,
        isKnownInterval,
      });
      return;
    }
    execution.stop('control interval');

    // decode Payload only once by payloadBuffer loop to avoid resource-consuming
    if (!decodedPayload && typeof payloadProtobufType !== 'undefined') {
      execution.start('decode payload');
      // deprotobufferize payload
      decodedPayload = decode(dataId.comObject, payloadBuffer[1]);
      execution.stop('decode payload');
    }

    // dump
    if (dump && dumpFolder) {
      // save a file per timestamp with binary payload
      writeFile(join(dumpFolder, timestamp.ms.toString()), payloadBuffer[1], (err) => {
        if (err) {
          loggerData.warn(`Error writing dump file ${timestamp}`);
        }
      });
    }

    loggerData.debug({
      controller: 'onTimebasedPubSubData',
      flatDataId,
      date,
      rawValue: decodedPayload.rawValue,
      extractedValue: decodedPayload.extractedValue,
      convertedValue: decodedPayload.convertedValue,
    });

    const tbd = {
      timestamp: timestamp.ms,
      payload: decodedPayload,
    };

    execution.start('retrieve timebasedData model');
    const timebasedDataModel = getOrCreateTimebasedDataModel(flatDataId);
    execution.stop('retrieve timebasedData model');

    execution.start('store in timebasedData model');
    timebasedDataModel.addRecord(tbd.timestamp, tbd.payload);
    execution.stop('store in timebasedData model');

    execution.start('queue payloads');
    logger.silly('queue pubSub point to client');
    // queue a ws newData message (sent periodically)
    addToQueue(flatDataId, tbd.timestamp, tbd.payload);
    execution.stop('queue payloads');

    execution.stop('global');
    execution.print();
  });
};
