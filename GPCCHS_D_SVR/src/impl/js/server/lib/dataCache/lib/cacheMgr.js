const { dcPullSockets } = require('../../io/zmq');

const binCache = require('./binCacheApi.js');
const jsonCache = require('./jsonCacheApi.js');
const dataTypesCtrl = require('../../dataTypeManager');
const subscriptionMgr = require('./subscriptionsMgr');
const { cacheWebSocket } = require('../../io/socket.io');

const newSubscription = (subscription) => {
  jsonCache.findData(subscription).then((storedData) => {
    const batPoints = [];
    storedData.forEach((data) => {
      //cacheWebsocket().emit('Parameters', data.jsonPayload);
      const jsonPayLoad = data.jsonPayload;
      const batPoint = [];
      batPoint.push(data.timestamp);
      batPoint.push(jsonPayLoad.rawValue);
      batPoints.push(batPoint);
    });
    const plotJson = {
      type: 'addPoints',
      id: 'batman',
      points: batPoints.sort(),
    };
    console.log(subscription.DataFullName.split('.')[1].split('<')[0]);
    cacheWebSocket().emit(`plotCache${subscription.DataFullName.split('.')[1].split('<')[0]}`, JSON.stringify(plotJson));
  });
};


const onMessage = (header, meta, payload) => {
  //console.log('ONMESSAGE');
  const metaStr = new Buffer(meta).toString('utf8').split('\0')[0];
  const metaJson = JSON.parse(metaStr);
  const metaBin = JSON.parse(metaStr);
  binCache.addData(metaBin, payload).then((insertedBinData) => {});
  dataTypesCtrl.binToJson(metaJson, payload).then((decodedJson) => {
    // console.log('Add Json Data');
    jsonCache.addData(metaJson, decodedJson).then((insertedJsonData) => {  /*console.log(insertedJsonData);*/  });
    // console.log(`REQUIRING SUBSCRIPTION ${metaJson.catalog}.${metaJson.parameter}<${metaJson.type}>`);
    // console.log(`TIME: ${metaJson.timestamp}`);
    const subscriptions = subscriptionMgr.getSubscriptions(metaJson);
    // console.log(`SUB SIZE: ${subscriptions.length}`);
    subscriptions.forEach((subscription) => {
      cacheWebSocket().emit('Parameters', decodedJson);

      const batPoint = [];
      batPoint.push(metaJson.timestamp);
      batPoint.push(decodedJson.rawValue);


      // console.log(subscription.subId);
      cacheWebSocket().emit(`plot${metaJson.parameter}`, batPoint);
    });
  });
};


const init = () => { console.log('INIT'); dcPullSockets.map((s) => s.on('message', onMessage)); };

module.exports = { init, newSubscription };
