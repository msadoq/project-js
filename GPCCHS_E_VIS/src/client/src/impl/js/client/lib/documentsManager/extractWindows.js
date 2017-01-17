const __ = require('lodash/fp/__');
const contains = require('lodash/fp/contains');
const map = require('lodash/fp/map');
const isArray = require('lodash/fp/isArray');
const path = require('lodash/fp/path');
const cond = require('lodash/fp/cond');
const compose = require('lodash/fp/compose');
const always = require('lodash/fp/always');
const prop = require('lodash/fp/prop');
const assoc = require('lodash/fp/assoc');
const filter = require('lodash/fp/filter');
const indexBy = require('lodash/fp/indexBy');

const { v4 } = require('node-uuid');

// not pure (due to uuid generation)
const setUUID = obj => assoc('uuid', v4(), obj);
const otherwise = () => true;
const indexWindows = cond([
  [isArray, compose(indexBy(prop('uuid')), map(setUUID))],
  [otherwise, always({})]
]);
const supportedWindowTypes = [
  'documentWindow',
];
const filterByTypes = filter(compose(contains(__, supportedWindowTypes), prop('type')));

const getWindows = compose(indexWindows, filterByTypes, path('__original.windows'));

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
