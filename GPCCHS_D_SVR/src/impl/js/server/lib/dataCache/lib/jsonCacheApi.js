const debug = require('../../io/debug')('dataCache:jsonCacheApi');
const { jsonCache } = require('../../io/loki');
const { resolveCacheFilters } = require('./filterApi');
const util = require('util');

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
    debug.info(query.Filter);
    const filters = resolveCacheFilters(query.Filter);
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
          session: query.SessionId,
        },
      ],
    };
    
    findFilter.$and = findFilter.$and.concat(filters);
    
    debug.info(findFilter);
    
    resolve(
      jsonCache.find(findFilter)
    );
  }
);

