import _ from 'lodash/fp';
import Long from 'long';
import BigNumber from 'bignumber.js';

const sort = (comparator, t) => t.slice().sort(comparator);

const double = {
  lt: (a, b) => new BigNumber(a).lessThan(new BigNumber(b)),
  gt: (a, b) => new BigNumber(a).greaterThan(new BigNumber(b)),
};

const long = {
  lt: (a, b) => new Long(a).lessThan(new Long(b)),
  gt: (a, b) => new Long(a).greaterThan(new Long(b)),
};

const comparators = {
  double: { ASC: double.gt, DESC: double.lt },
  long: { ASC: long.gt, DESC: long.lt },
  string: { ASC: _.gt, DESC: _.lt },
  number: { ASC: _.gt, DESC: _.lt },
  boolean: { ASC: _.gt, DESC: _.lt },
  time: { ASC: _.gt, DESC: _.lt },
  duration: { ASC: _.gt, DESC: _.lt },
};

/*
  iteratee : The iteratees to sort by
  sortMode : enum('ASC' | 'DESC')
  array : Array

  Take an array of raw data (not converted by convertData)
  and sort it using iteratee and sortMode.

  Throw a TypeError if data specified type is unknown
*/
const sortDataBy = _.curry((iteratee, sortMode, array) => {
  if (sortMode !== 'ASC' && sortMode !== 'DESC') {
    throw new Error('Unknown sortMode : should be ASC or DESC');
  }
  const getData = (x) => {
    const value = iteratee(x);
    if (typeof value === 'string') {
      return { type: 'string', value };
    }
    if (typeof value === 'number') {
      return { type: 'number', value };
    }
    if (typeof value === 'boolean') {
      return { type: 'boolean', value };
    }
    return value;
  };
  return sort((a, b) => {
    const dataA = getData(a);
    const dataB = getData(b);
    if (!comparators[dataA.type]) {
      throw new TypeError(`Unknown comparator for specified type '${dataA.type}'`);
    }
    const getValue = dataA.type === 'double' || dataA.type === 'long' ? _.get('symbol') : _.get('value');
    return comparators[dataA.type][sortMode](getValue(dataA), getValue(dataB));
  }, array);
});

export default sortDataBy;
