const _ = require('lodash');
const { v4 } = require('node-uuid');

/**
 * Find timelines in each .timebars
 * Store each with a uuid in .timelines
 * Then replace timeline object in .timebars with uuid
 *
 * @param content
 * @param cb
 * @returns {*}
 */
module.exports = (content, cb) => {
  const timebars = _.get(content, 'timebars', []);
  // loop on timebars
  // eslint-disable-next-line no-param-reassign
  content.timelines = _.reduce(timebars, (list, timebar, index) => {
    let timelines = _.get(timebar, 'timelines', []);
    if (!_.isArray(timelines)) {
      timelines = [];
    }
    // loop on timelines
    _.each(timelines, (timeline, idx) => {
      const uuid = v4();

      // replace timebar.timelines.item with uuid
      timebars[index].timelines[idx] = uuid;

      // eslint-disable-next-line no-param-reassign
      list[uuid] = Object.assign({}, timeline, { uuid });
    });

    return list;
  }, {});

  return cb(null, content);
};
