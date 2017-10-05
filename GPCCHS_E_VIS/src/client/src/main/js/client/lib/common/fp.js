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

/*
 * A stoppable reduce function (only for arrays)
 * Use 'reduce.done' to complete reducing.
 * This is inspired by JS transducers.
*/
const REDUCED_KEY = Symbol('@@reduced');

export const reduce = _.curry((reducer, initialAcc, t) => {
  let acc = initialAcc;
  for (let k = 0; k < t.length; k += 1) {
    acc = reducer(acc, t[k]);
    if (acc && acc[REDUCED_KEY]) {
      return acc.value;
    }
  }
  return acc;
});

reduce.done = x => ({
  value: x,
  [REDUCED_KEY]: true,
});
