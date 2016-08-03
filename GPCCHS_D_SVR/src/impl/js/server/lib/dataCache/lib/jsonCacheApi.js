const debug = require('../../io/debug')('dataCache:jsonCacheApi');
const { jsonDataColl } = require('../../io/loki');
const { resolveCacheFilters } = require('./filterApi');
const util = require('util');

exports.addData = (metaData, jsonData) => {
  const data = Object.assign({}, metaData, { jsonPayload: jsonData });
  return new Promise((resolve) => {
    const inserted = jsonDataColl.insert(data);
    resolve(inserted);
  });
};

exports.findData = (query) => new Promise(
  (resolve) => {
    const catalog = query.catalog; // query.dataFullName.split('.')[0];
    const parameter = query.parameter; // query.dataFullName.split('.')[1].split('<')[0];
    const dInf = query.visuWindow.dInf;
    const dSup = query.visuWindow.dSup;
    const filters = resolveCacheFilters(query.filter);
    debug.info(`Try to find parameter ${parameter} from catalog ${catalog} in interval [${dInf},${dSup}] in cache`);
    (filters.length === 0) ? debug.info('with no filter') : debug.info(`with filter ${util.inspect(filters)}`);
    
    const findFilter = {
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
          session: query.sessionId,
        },
      ],
    };
    
    findFilter.$and = findFilter.$and.concat(filters);
    
    debug.info(findFilter);
    
    resolve(
      jsonDataColl.find(findFilter)
    );
  }
);

