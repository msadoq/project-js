const {
  __, compose, always, ifElse,
  view, lensPath,
  prop, assoc, is,
  contains,
  map, filter, indexBy,
} = require('ramda');
const { v4 } = require('node-uuid');

// not pure (due to uuid generation)
const setUUID = obj => assoc('uuid', v4(), obj);
const indexWindows = ifElse(
  is(Array),
  compose(indexBy(prop('uuid')), map(setUUID)),
  always({})
);
const originalWindows = lensPath(['__original', 'windows']);

const supportedWindowTypes = [
  'documentWindow',
];
const filterByTypes = filter(compose(contains(__, supportedWindowTypes), prop('type')));

const getWindows = compose(indexWindows, filterByTypes, view(originalWindows));

/**
 * Add indexed windows with freshly generated uuid
 *
 * @param content
 * @param cb
 * @returns {*}
 */
module.exports = (content, cb) => cb(null, {
  ...content,
  windows: getWindows(content),
});
