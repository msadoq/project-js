const { jsonCache } = require('../../io/loki');

exports.addData = (metaData, jsonData) => {
  const data = Object.assign(metaData, { jsonPayload: jsonData });
  return new Promise((resolve, reject) => {
    const inserted = jsonCache.insert(data);
    resolve(inserted);
  });
};

exports.findData = (query) => new Promise(
  (resolve, reject) => {
    resolve(jsonCache.find(
      {
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
      }
    ));
  }
);

