const debug = require('../../io/debug')('dataCache:jsonCacheApi');
const { jsonCache } = require('../../io/loki');

exports.addData = (metaData, jsonData) => {
  const data = Object.assign({}, metaData, { jsonPayload: jsonData });
  return new Promise((resolve) => {
    const inserted = jsonCache.insert(data);
    resolve(inserted);
  });
};

exports.findData = (query) => new Promise(
  (resolve) => {
    const catalog = query.DataFullName.split('.')[0];
    const parameter = query.DataFullName.split('.')[1].split('<')[0];
    const dInf = query.VisuWindow.dInf;
    const dSup = query.VisuWindow.dSup;
    debug.info(`Try to find parameter ${parameter} from catalog ${catalog} in interval [${dInf},${dSup}] in cache`);
    resolve(
      jsonCache.find(
        {
          $and: [
            {
              catalog,
            }, {
              parameter,
            }, {
              timestamp: {
                $gte: dInf,
              },
            }, {
              timestamp: {
                $lte: dSup,
              },
            }, {
              session: query.SessionId,
            },
          ],
        }
    ));
  }
);

