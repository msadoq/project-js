import _ from 'lodash/fp';

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

  const data = array.map(oid => getData(oid));
  const dataType = _.getOr(null, 'type', data[0]);
  const field = dataType === 'double' || dataType === 'long' ? 'symbol' : 'value';
  const result = _.sortBy(
    _.flow(getData, _.get(field))
    , array
  );
  return sortMode === 'ASC'
    ? result
    : result.reverse();
});

export default sortDataBy;
