const debug = require('../io/debug')('cache');
const _ = require('lodash');
const cacheBinaryModel = require('../models/cacheBinary');
const cacheJsonModel = require('../models/cacheJson');
const { matchFilters } = require('./filterApi');
const { dataTypeController } = require('../dataTypeManager');
const subscriptionsModel = require('../models/subscriptions');
const { getSocketIo } = require('../io/socket.io');

const emitData = (subscriptionId, points) => {
  // TODO : dispatch to corresponding websocket (based on subscriptionId)
  getSocketIo().emit('plot', {
    subscriptionId,
    points,
  });
};

const searchSubscriptionData = subscription => {
  const storedData = cacheJsonModel.retrieveBySubscription(subscription);
  const points = [];
  storedData.forEach((data) => {
    const jsonPayLoad = data.jsonPayload;
    const point = [];
    point.push(data.timestamp.toNumber());
    if (subscription.field === undefined || subscription.field === '*') {
      point.push(jsonPayLoad);
    } else {
      point.push(jsonPayLoad[subscription.field]);
    }
    points.push(point);
  });
  if (points.length > 0) {
    const parameter = subscription.parameter;
    debug.info(
      `Sending found data in cache for ${parameter} for subscription ${subscription.subId}`
    );
    debug.debug(`points: ${points}`);
    emitData(`sub${subscription.subId}`, points);
  }
};

// TODO : remove this bufferisation logic and add to websocket adapter
const dataBuffer = {};
const flushBuffer = () => {
  _.forEach(dataBuffer,
    (v, k) => {
      const points = v.points.splice(0);
      if (points.length > 0) {
        debug.debug(`Sending subscription ${k} to views`);
        emitData(k, points);
      }
    });
  setTimeout(flushBuffer, 40);
};
const init = () => {
  setTimeout(flushBuffer, 40); // TODO : oh my god! use _.throttle if you really need that
};

const onMessage = (header, meta, payload) => {
  dataTypeController.binToJson({ type: 'Header' }, meta).then((metaStr) => {
    cacheBinaryModel.addRecord(metaStr, payload);
    dataTypeController.binToJson(metaStr, payload).then((decodedJson) => {
      cacheJsonModel.addRecord(metaStr, decodedJson);
      debug.debug(`Retrieving ${metaStr.catalog}.${metaStr.parameter}<${metaStr.type}>`);
      debug.debug(`TIME: ${metaStr.timestamp}`);
      const subscriptions = subscriptionsModel.retrieveBySubscription(metaStr);
      debug.debug(`Found ${subscriptions.length} Subscription(s)`);
      subscriptions.forEach((subscription) => {
        if (matchFilters(decodedJson, subscription)) {
          const point = [];
          point.push(metaStr.timestamp.toNumber());
          if (subscription.field === undefined || subscription.field === '*') {
            point.push(decodedJson);
          } else {
            point.push(decodedJson[subscription.field]);
          }
          debug.debug(`point: ${point}`);
          if (dataBuffer[`sub${subscription.subId}`]) {
            dataBuffer[`sub${subscription.subId}`].points.push(point);
          } else {
            dataBuffer[`sub${subscription.subId}`] = { points: [point] };
          }
        }
      });
    });
  });
};

module.exports = {
  init,
  searchSubscriptionData,
  onMessage,
};
