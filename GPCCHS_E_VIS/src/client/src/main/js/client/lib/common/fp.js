import _ from 'lodash/fp';

/*
 * conditional transformer
*/
export const ifElse = _.curry((predicate, _then, _else, data) => (
  predicate(data) ? _then(data) : _else(data)
));

/*
 * conditional transformer
 * example: when(_.equals(-0), _.always(0))
*/
export const when = _.curry((predicate, morphism, data) => (
  ifElse(predicate, morphism, _.identity, data)
));

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
