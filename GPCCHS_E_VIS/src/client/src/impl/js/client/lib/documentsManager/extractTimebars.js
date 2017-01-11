const {
  compose, pipe, always, ifElse,
  prop, path, assoc, is,
  map, indexBy,
} = require('ramda');
const { v4 } = require('node-uuid');

// not pure (due to uuid generation)
const setUUID = obj => assoc('uuid', v4(), obj);
const indexByUUID = compose(indexBy(prop('uuid')), map(setUUID));
const getTimebarsWithUUID = pipe(
  path(['__original', 'timebars']),
  ifElse(is(Array), indexByUUID, always({})),
);

/**
 * Add indexed timebars with freshly generated uuid
 *
 * @param content
 * @param cb
 * @returns {*}
 */
module.exports = (content, cb) => cb(null, {
  ...content,
  timebars: getTimebarsWithUUID(content)
});
