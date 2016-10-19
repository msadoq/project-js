/* eslint no-underscore-dangle: 0 */

const _ = require('lodash');
const async = require('async');
const { v4 } = require('node-uuid');
const fs = require('../../common/fs');
const validation = require('./validation');
const vivl = require('../../../VIVL/main');

const supportedViewTypes = [
  'PlotView',
  'TextView',
  'MimicView',
];

function findPageViewsAndReplaceWithUuid(page) {
  const views = _.get(page, 'views');
  return _.reduce(views, (list, view, index) => {
    if (!view.oId && !view.path) {
      return list;
    }

    const uuid = v4();

    // replace page.views.item with uuid
    views[index].uuid = uuid;

    // add page to read in list
    list.push(Object.assign({}, view, { uuid })); // eslint-disable-line no-param-reassign

    return list;
  }, []);
}

function readViews(folder, viewsToRead, cb) {
  async.reduce(viewsToRead, [], (list, identity, fn) => {
    const filepath = identity.path || identity.oId;
    fs.readJsonFromPath(folder, filepath, (err, viewContent) => {
      if (err) {
        return fn(err);
      }
      if (supportedViewTypes.indexOf(viewContent.type) === -1) {
        return fn(new Error(`Unsupported view type '${viewContent.type}'`), list);
      }
      let schema;
      try {
        schema = vivl(viewContent.type, 'getSchemaJson')();
      } catch (e) {
        return fn(new Error(`Invalid schema on view type '${viewContent.type}'`), list);
      }
      const validationError = validation(viewContent.type, viewContent, schema);
      if (validationError) {
        return fn(validationError);
      }
      // eslint-disable-next-line no-param-reassign
      list = list.concat(Object.assign({
        type: viewContent.type,
        configuration: viewContent,
      }, {
        path: identity.path,
        oId: identity.oId,
        uuid: identity.uuid,
      }));

      return fn(null, list);
    });
  }, cb);
}

/**
 * Find views in .pages, read files and store each with a uuid in .views
 *
 * @param content
 * @param cb
 * @returns {*}
 */
function extractViews(content, cb) {
  let pages = content.pages;
  if (!_.isObject(pages)) {
    pages = {};
  }

  const viewsToRead = _.reduce(pages, (list, p) =>
    list.concat(findPageViewsAndReplaceWithUuid(p)),
  []);

  return readViews(content.__folder, viewsToRead, (err, views) => {
    if (err) {
      return cb(err);
    }

    return cb(null, Object.assign(content, {
      views: _.reduce(views, (l, v) => Object.assign(l, { [v.uuid]: v }), {}),
    }));
  });
}

module.exports = { extractViews, readViews, findPageViewsAndReplaceWithUuid };
