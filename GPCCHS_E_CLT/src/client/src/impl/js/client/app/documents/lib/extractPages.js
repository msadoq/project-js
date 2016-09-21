const _ = require('lodash');
const async = require('async');
const { v4 } = require('node-uuid');
const fs = require('../fs');
const validation = require('../validation');

function findWindowPagesAndReplaceWithUuid(window) {
  const pages = _.get(window, 'pages');
  return _.reduce(pages, (list, page, index) => {
    if (!page.oId && !page.path) {
      return list;
    }

    const uuid = v4();

    // replace window.pages.item with uuid
    pages[index] = uuid;

    // add page to read in list
    list.push(Object.assign({}, page, { uuid })); // eslint-disable-line no-param-reassign

    return list;
  }, []);
}

function readPages(folder, pagesToRead, cb) {
  async.reduce(pagesToRead, [], (list, identity, fn) => {
    const filepath = identity.path || identity.oId;
    fs.readJsonFromPath(folder, filepath, (err, pageContent) => {
      if (err) {
        return fn(err);
      }
      const validationError = validation('page', pageContent);
      if (validationError) {
        return fn(validationError);
      }

      // eslint-disable-next-line no-param-reassign
      list = list.concat(Object.assign(pageContent, identity));

      return fn(null, list);
    });
  }, cb);
}

/**
 * Find timebars in .windows, read files and store each with a uuid in .pages
 *
 * @param content
 * @param cb
 * @returns {*}
 */
module.exports = (content, cb) => {
  let windows = content.windows;
  if (!_.isObject(windows)) {
    windows = {};
  }

  const pagesToRead = _.reduce(windows, (list, w) =>
      list.concat(findWindowPagesAndReplaceWithUuid(w)),
  []);

  return readPages(content.__folder, pagesToRead, (err, pages) => {
    if (err) {
      return cb(err);
    }

    return cb(null, Object.assign(content, {
      pages: _.reduce(pages, (l, v) => Object.assign(l, { [v.uuid]: v }), {}),
    }));
  })
};
