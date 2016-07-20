const { binCache } = require('../../io/loki');

exports.addData = (metaData, binData) => {
  const data = Object.assign(metaData, { binPayload: binData });
  return new Promise((resolve, reject) => {
    resolve(binCache.insert(data));
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
  }
);
