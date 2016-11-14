/* eslint no-underscore-dangle: 0 */
const _get = require('lodash/get');
const _filter = require('lodash/filter');
const _reduce = require('lodash/reduce');
const _map = require('lodash/map');
const _isArray = require('lodash/isArray');
const { v4 } = require('node-uuid');

const supportedWindowTypes = [
  'documentWindow',
];

/**
 * Find windows in document JSON and store each with a uuid in .windows
 *
 * @param content
 * @param cb
 * @returns {*}
 */
module.exports = (content, cb) => {
  let windows = _get(content, '__original.windows');
  if (!_isArray(windows)) {
    windows = [];
  }

  windows = _map(
    _filter(windows, w => supportedWindowTypes.indexOf(w.type) !== -1),
    w => Object.assign(w, { uuid: v4() })
  );

  return cb(null, Object.assign(content, {
    windows: _reduce(windows, (l, v) => Object.assign(l, { [v.uuid]: v }), {}),
  }));
};
