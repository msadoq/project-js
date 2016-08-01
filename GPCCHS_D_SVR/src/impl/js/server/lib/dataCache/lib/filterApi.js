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
  const field = `jsonPayload.${filter.Field}`;
  const operator = resolveOperator(filter.Operator);
  const resolvedFilter = {};
  resolvedFilter[field] = {};
  resolvedFilter[field][operator] = filter.Value;
  return resolvedFilter;
};

const resolveCacheFilters = (filterArray) => (
  (filterArray.constructor === Array) ?
  filterArray.map((filter) => resolveCacheFilter(filter)) :
  []
);

const applyFilter = (data, filter) => {
  switch (filter.Operator) {
    case 'OP_EQ':
      return (data[filter.Field] === filter.Value);
    case 'OP_NE':
      return (data[filter.Field] !== filter.Value);
    case 'OP_LT':
      return (data[filter.Field] < filter.Value);
    case 'OP_LE':
      return (data[filter.Field] <= filter.Value);
    case 'OP_GT':
      debug.info('applyFilter OP_GT');
      return (data[filter.Field] > filter.Value);
    case 'OP_GE':
      return (data[filter.Field] >= filter.Value);
    case 'OP_CONTAINS':
      return data[filter.Field].includes(filter.Value);
    case 'OP_ICONTAINS':
      return !data[filter.Field].includes(filter.Value);
    default:
      return false;
  }
};

const matchFilters = (data, subscription) => {
  const filters = subscription.Filter;
  for (const filter of filters) {
    if (applyFilter(data, filter) === false) return false;
  }
  return true;
};

module.exports = { operatorMappingObject, resolveCacheFilters, matchFilters };
