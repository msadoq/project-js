const { binDataColl } = require('../../io/loki');

exports.addData = (metaData, binData) => {
  const data = Object.assign({}, metaData, { binPayload: binData });
  return new Promise((resolve, reject) => {
    resolve(binDataColl.insert(data));
  });
};

exports.findData = (query) => new Promise(
  (resolve, reject) => {
    resolve(binDataColl.find({
      $and: [
        {
          dataId: query.dataFullName,
        }, {
          dataTime: {
            $gte: query.visuWindow.dInf,
          },
        }, {
          dataTime: {
            $lte: query.visuWindow.dSup,
          },
        }, {
          session: query.sessionId,
        },
      ],
    }));
  }
);
