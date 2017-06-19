import _ from 'lodash/fp';

/*
 * copy a prop to another
 * example: copyProp('a', 'b.c', { a: true }); // => { a: true, b: { c: true } }
*/
export const copyProp = _.curry((keyFrom, keyTo, obj) => {
  const value = _.get(keyFrom, obj);
  return value ? _.set(keyTo, value, obj) : obj;
});

/*
 * move a prop
 * example: moveProp('a', 'b.c', { a: true }); // => { b: { c: true } }
*/
export const moveProp = _.curry((keyFrom, keyTo, obj) => _.pipe(
  copyProp(keyFrom, keyTo),
  _.unset(keyFrom)
)(obj));
