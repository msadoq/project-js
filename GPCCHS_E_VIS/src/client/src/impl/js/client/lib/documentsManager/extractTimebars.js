const _ = require('lodash');
const { v4 } = require('node-uuid');

/**
 * Find timebars in document JSON and store each with a uuid in .timebars
 *
 * @param content
 * @param cb
 * @returns {*}
 */
module.exports = (content, cb) => {
  let timebars = _.get(content, '__original.timebars');
  if (!_.isArray(timebars)) {
    timebars = [];
  }

  timebars = _.map(timebars, w => Object.assign(w, { uuid: v4() }));

  return cb(null, Object.assign(content, {
    timebars: _.reduce(timebars, (l, v) => Object.assign(l, { [v.uuid]: v }), {}),
  }));
};
