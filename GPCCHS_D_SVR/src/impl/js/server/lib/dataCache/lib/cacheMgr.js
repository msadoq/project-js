const { cachePullSocket } = require('../../io/zmq');

const binCache = require('./binCache.js');
const jsonCache = require('./jsonCache.js');
const dataTypesCtrl = require('../../dataTypesController');
const subscriptionMgr = require('./subscriptionsMgr');
const protoBuf = require('protobufjs');
let wsSocket = null;

exports.newSubscription = (subscription) => {
  subscriptionMgr.addSubscription(subscription);
  jsonCache.findData(subscription).then((storedData) => {
    const batPoints = [];
    storedData.forEach((data) => {
      wsSocket.emit('Parameters', data.jsonPayload);
      const jsonPayLoad = data.jsonPayload;
      jsonPayLoad.parameters.forEach((item) => {
        const batPoint = [];
        batPoint.push(data.dataTime);
        batPoint.push(item.rawValue);
        batPoints.push(batPoint);
      });
    });
    const plotJson = {
      type: 'addPoints',
      id: 'batman',
      points: batPoints,
    };
    wsSocket.emit(`plot${subscription.subId}`, JSON.stringify(plotJson));
  });
};

exports.unserializeBin = (subscription) => {
};

exports.setWebSocket = (io) => {
  wsSocket = io;
  wsSocket.sockets.on('connection', () => {
    console.log('Un client est connecté !');
  });
};

cachePullSocket.on('message', (header, payload) => {
  const batPoints = [];
  const headerJson = JSON.parse(header);
  const headerBin = JSON.parse(header);

  binCache.addData(headerBin, payload).then((insertedBinData) => {
  });

  dataTypesCtrl.binToJson(payload).then((decodedJson) => {
    jsonCache.addData(headerJson, decodedJson).then((insertedJsonData) => {
    });
    const subscriptions = subscriptionMgr.getSubscriptions(headerJson);
    subscriptions.forEach((subscription) => {
      wsSocket.emit('Parameters', decodedJson);
      decodedJson.parameters.forEach((item) => {
        const batPoint = [];
        batPoint.push(headerJson.dataTime);
        batPoint.push(item.rawValue);
        batPoints.push(batPoint);
      });

      const plotJson = {
        type: 'addPoints',
        id: 'batman',
        points: batPoints,
      };
      wsSocket.emit(`plot${subscription.subId}`, JSON.stringify(plotJson));
    });
  });
});

