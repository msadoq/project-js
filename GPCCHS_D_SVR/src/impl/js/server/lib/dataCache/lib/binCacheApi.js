const dataTypesCtrl = require('../../dataTypesController');
const jsonCacheApi = require('./jsonCacheApi.js');
const { binCache } = require('../../io/loki');

exports.addData = (metaData, binData) => {
  const data = Object.assign(metaData, { binPayload: binData });
  return new Promise((resolve, reject) => {
    resolve(binCache.insert(data));
  });
};

exports.unserializedBin = (query) => {
  findData(query).then((storedData) => {
    storedData.forEach((item) => {
      dataTypesCtrl.binToJson(item).then((decodedJson) => {
        jsonCacheApi.addData(headerJson, decodedJson).then((insertedJsonData) => {
        });
      });
    });
  });
};

exports.findData = (query) => new Promise(
  (resolve, reject) => {
    resolve(binCache.find({
      $and: [
        {
          dataId: query.DataFullName,
        }, {
          dataTime: {
            $gte: query.VisuWindow.dInf,
          },
        }, {
          dataTime: {
            $lte: query.VisuWindow.dSup,
          },
        }, {
          session: query.SessionId,
        },
      ],
    }));
  });


