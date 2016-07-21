const { jsonCache } = require('../../io/loki');

exports.addData = (metaData, jsonData) => {
  const data = Object.assign(metaData, { jsonPayload: jsonData });
  return new Promise((resolve) => {
    const inserted = jsonCache.insert(data);
    resolve(inserted);
  });
};

exports.findData = (query) => new Promise(
  (resolve) => {
    console.log(query.DataFullName.split('.')[0]);
    console.log(query.DataFullName.split('.')[1].split('<')[0]);
    console.log(query.VisuWindow.dInf);
    console.log(query.VisuWindow.dSup);
    resolve(
      jsonCache.find(
        {
          $and: [
            {
              catalog: query.DataFullName.split('.')[0],
            }, {
              parameter: query.DataFullName.split('.')[1].split('<')[0],
            }, {
              timestamp: {
                $gte: query.VisuWindow.dInf,
              },
            }, {
              timestamp: {
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

