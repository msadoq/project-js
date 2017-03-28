import _ from 'lodash/fp';

/*
 * copy a prop to another
 * example: copyProp('a', 'b.c', { a: true }); // => { a: true, b: { c: true } }
*/
const copyProp = _.curry((keyFrom, keyTo, obj) => {
  const value = _.get(keyFrom, obj);
  return value ? _.set(keyTo, value, obj) : obj;
});

export default { copyProp };
