const debug = require('../io/debug')('cache:filter');
const constants = require('../constants');

// TODO : refactor and test correctly

const dcLokiOperatorMapping = {
  [constants.FILTEROPERATOR_EQ]: '$eq',
  [constants.FILTEROPERATOR_NE]: '$ne',
  [constants.FILTEROPERATOR_LT]: '$lt',
  [constants.FILTEROPERATOR_LE]: '$lte',
  [constants.FILTEROPERATOR_GT]: '$gt',
  [constants.FILTEROPERATOR_GE]: '$gte',
  [constants.FILTEROPERATOR_CONTAINS]: '$contains',
  [constants.FILTEROPERATOR_ICONTAINS]: '$containsNone',
};

const resolveCacheFilter = filter => ({
  [`jsonPayload.${filter.field}`]: {
    [dcLokiOperatorMapping[filter.operator]]: filter.value,
  },
});

const resolveCacheFilters = filterArray => (
  filterArray.constructor === Array
    ? filterArray.map(filter => resolveCacheFilter(filter))
    : []
);

const applyFilter = (data, filter) => {
  if (data[filter.field] !== undefined) {
    debug.debug(`applyFilter ${filter} to data ${data}`);
    switch (filter.operator) {
      case 'OP_EQ':
        debug.debug('applyFilter OP_EQ');
        return (data[filter.field] === filter.value);
      case 'OP_NE':
        debug.debug('applyFilter OP_NE');
        return (data[filter.field] !== filter.value);
      case 'OP_LT':
        debug.debug('applyFilter OP_LT');
        return (data[filter.field] < filter.value);
      case 'OP_LE':
        debug.debug('applyFilter OP_LE');
        return (data[filter.field] <= filter.value);
      case 'OP_GT':
        debug.debug('applyFilter OP_GT');
        return (data[filter.field] > filter.value);
      case 'OP_GE':
        debug.debug('applyFilter OP_GE');
        return (data[filter.field] >= filter.value);
      case 'OP_CONTAINS':
        debug.debug('applyFilter OP_CONTAINS');
        return data[filter.field].includes(filter.value);
      case 'OP_ICONTAINS':
        debug.debug('applyFilter OP_ICONTAINS');
        return !(data[filter.field].includes(filter.value));
      default:
        return true;
    }
  } else {
    return true;
  }
};

const matchFilters = (data, subscription) => {
  const filters = subscription.filter;
  debug.debug(`apply ${filters.length} filter(s) to data`);
  for (const filter of filters) {
    if (applyFilter(data, filter) === false) return false;
  }
  return true;
};

module.exports = { resolveCacheFilters, matchFilters };
