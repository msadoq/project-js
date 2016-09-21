const _ = require('lodash');
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
  let windows = _.get(content, '__original.windows');
  if (!_.isArray(windows)) {
    windows = [];
  }

  windows = _.map(
    _.filter(windows, w => supportedWindowTypes.indexOf(w.type) !== -1),
    w => Object.assign(w, { uuid: v4() })
  );

  return cb(null, Object.assign(content, { windows }));
};
