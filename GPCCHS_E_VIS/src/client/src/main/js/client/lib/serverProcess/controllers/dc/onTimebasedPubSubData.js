const { decode, getType } = require('../../../utils/adapters');
const _find = require('lodash/find');
const _get = require('lodash/get');
const _includes = require('lodash/includes');
const executionMonitor = require('../../../common/logManager/execution');
const logger = require('../../../common/logManager')('controllers:onTimebasedPubSubData');
const loggerData = require('../../../common/logManager')('controllers:incomingData');
const flattenDataId = require('../../../common/flattenDataId');
const { add: addToQueue } = require('../../models/dataQueue');
const { getOrCreateTimebasedDataModel } = require('../../models/timebasedDataFactory');
const connectedDataModel = require('../../models/connectedData');
const { set: setLastPubSubTimestamp } = require('../../models/lastPubSubTimestamp');
const { dumpBuffer } = require('../../utils/dumpBuffer');
const dataMapSingleton = require('../../models/dataMapSingleton');
const viewManager = require('../../../viewManager');
const { DATASTRUCTURETYPE_LAST } = require('../../../constants');
const intervalManager = require('../../../common/intervals');


/** Check if timestamp is included in at least one interval used with view of last type
 *
 * - loop on views
 *    - if view of type last, loop on entryPoints
 *      - if entryPoint has the same flatDataId, check associated intervals
 *        - if timestamp is in interval, returns element
 *        - otherwise returns undefined
 * @param flatDataId : flat DataId without filter
 * @param timestamp : timestamp to check
 * @return entrypoint if found, otherwise undefined
 ***********************************************************************************/
function isInLastInterval(flatDataId, timestamp) {
  const dataMap = dataMapSingleton.get();
  // Get views of type last
  return _find(dataMap.perView, (view) => {
    if (viewManager.getStructureType(view.type) !== DATASTRUCTURETYPE_LAST) {
      return false;
    }
    // Check entry point
    const epIds = Object.keys(view.entryPoints);
    let i = 0;
    while (i < epIds.length) {
      const epId = epIds[i];
      const ep = view.entryPoints[epId];
      i += 1;
      // check if dataId matches
      if (ep.dataId && flattenDataId(ep.dataId) === flatDataId) {
        // check associated interval
        const interval =
          _get(dataMap.expectedIntervals, [ep.remoteId, ep.localId, 'expectedInterval']);
        if (interval && intervalManager.includesTimestamp(interval, timestamp)) {
          return true;
        }
      }
    }
    return false;
  });
}

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
 * @param args array
 */
module.exports = (args) => {
  logger.silly('called');
  const execution = executionMonitor('pubSubData');
  execution.start('global');

  logger.silly('received data from pubSub');

  // args[0] is queryIdBuffer
  const dataIdBuffer = args[1];

  const payloadBuffers = Array.prototype.slice.call(args, 2);

  // check payloads parity
  if (payloadBuffers.length % 2 !== 0) {
    logger.silly('payloads should be sent by (timestamp, payloads) peers');
    return;
  }

  const numberOfValues = payloadBuffers.length / 2;

  execution.start('decode dataId');
  // deprotobufferize dataId
  logger.silly('decode dataId');
  const dataId = decode('dc.dataControllerUtils.DataId', dataIdBuffer);
  execution.stop('decode dataId');

  // get payload type
  const payloadProtobufType = getType(dataId.comObject);
  if (typeof payloadProtobufType === 'undefined') {
    logger.error('unsupported comObject', dataId.comObject); // TODO send error to client
  }

  execution.start('retrieve subscription');
  const flatDataId = flattenDataId(dataId);
  if (!connectedDataModel.exists(flatDataId)) {
    logger.silly('no query registered for this dataId', dataId);
    return;
  }

  // loop over arguments peers (timestamp, payload)
  while (payloadBuffers.length) {
    // pop the first two buffers from list
    const payloadBuffer = payloadBuffers.splice(0, 2);

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
    // TODO dbrugne: for the moment, datamap is use to check getLast intervals to update value not already used in range intervals
    let isLastIntervals = false;
    if (!isKnownInterval) {
      if (isInLastInterval(flatDataId, timestamp.ms)) {
        isLastIntervals = true;
      }
    }

    const date = new Date(timestamp.ms);

    if (!isKnownInterval && !isLastIntervals) {
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
    if (!decodedPayload) {
      execution.start('decode payload');
      // deprotobufferize payload
      decodedPayload = decode(getType(dataId.comObject), payloadBuffer[1]);
      execution.stop('decode payload');
    }

    // dump: if activated, save a file per timestamp with binary payload
    dumpBuffer(dataId, timestamp.ms, payloadBuffer[1]);

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
    // If range case, stores data in cache
    if (isKnownInterval) {
      execution.start('retrieve timebasedData model');
      const timebasedDataModel = getOrCreateTimebasedDataModel(flatDataId);
      execution.stop('retrieve timebasedData model');

      execution.start('store in timebasedData model');
      timebasedDataModel.addRecord(tbd.timestamp, tbd.payload);
      execution.stop('store in timebasedData model');
    }
    execution.start('queue payloads');
    logger.silly('queue pubSub point to client');
    // queue a ws newData message (sent periodically)
    addToQueue(flatDataId, tbd.timestamp, tbd.payload);
    // Case of flatDataId with filters
    const dataMap = dataMapSingleton.get();
    const rIds = Object.keys(dataMap.expectedIntervals);
    rIds.forEach((id) => {
      // add payload to queue if remoteId = flatDataId + filters
      if (id !== flatDataId && _includes(id, flatDataId)) {
        addToQueue(id, tbd.timestamp, tbd.payload);
      }
    });
    execution.stop('queue payloads');
  }

  execution.stop('global', `${dataId.parameterName}: ${numberOfValues} payloads`);
  execution.print();
};
