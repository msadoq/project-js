const debug = require('../../io/debug')('dataCache:filterApi');

const operatorMappingObject = {
  OP_EQ: '$eq',
  OP_NE: '$ne',
  OP_LT: '$lt',
  OP_LE: '$lte',
  OP_GT: '$gt',
  OP_GE: '$gte',
  OP_CONTAINS: '$contains',
  OP_ICONTAINS: '$containsNone',
};

const operatorRegExp = new RegExp(Object.keys(operatorMappingObject).join('|'), 'gi');

const resolveOperator = (operator) => operator.replace(operatorRegExp,
  (matched) => operatorMappingObject[matched]);

const resolveCacheFilter = (filter) => {
  const field = `jsonPayload.${filter.field}`;
  const operator = resolveOperator(filter.operator);
  const resolvedFilter = {};
  resolvedFilter[field] = {};
  resolvedFilter[field][operator] = filter.value;
  return resolvedFilter;
};

const resolveCacheFilters = (filterArray) => (
  (filterArray.constructor === Array) ?
  filterArray.map((filter) => resolveCacheFilter(filter)) :
  []
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

module.exports = { operatorMappingObject, resolveCacheFilters, matchFilters };
