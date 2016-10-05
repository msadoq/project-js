const _ = require('lodash');
const external = require('../../../external.main');

/**
 * Find connected data in .views, and store each with a uuid in .connectedData
 *
 * @param content
 * @param cb
 * @returns {*}
 */
module.exports = (content, cb) => {
  let views = content.views;
  if (!_.isObject(views)) {
    views = {};
  }

  const connectedData = _.reduce(views, (list, view) => {
    const extractor = _.get(external, `${view.type}.getConnectedDataFromViewDocument`);
    if (!extractor) {
      return list;
    }

    return list.concat(extractor(view));
  }, []);

  return cb(null, Object.assign(content, {
    connectedData: _.reduce(connectedData, (l, v) => Object.assign(l, { [v.uuid]: v }), {}),
  }));
};
