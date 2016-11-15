/* eslint no-underscore-dangle: 0 */

const _get = require('lodash/get');
const _reduce = require('lodash/reduce');
const _isObject = require('lodash/isObject');
const _startsWith = require('lodash/startsWith');
const async = require('async');
const { v4 } = require('node-uuid');
const fs = require('../common/fs');
const fsNode = require('fs');
const validation = require('./validation');
const vivl = require('../../VIVL/main');
const { join, dirname } = require('path');
const parameters = require('../common/parameters');

const root = parameters.FMD_ROOT;

const supportedViewTypes = [
  'PlotView',
  'TextView',
  'MimicView',
];

function findPageViewsAndReplaceWithUuid(page) {
  const views = _get(page, 'views');
  // extract page folder
  const pageFolder = dirname(page.absolutePath);
  return _reduce(views, (list, view, index) => {
    if (!view.oId && !view.path) {
      return list;
    }

    const uuid = v4();

    // replace page.views.item with uuid
    views[index].uuid = uuid;

    // add page to read in list
    // eslint-disable-line no-param-reassign
    list.push(Object.assign({}, view, { uuid }, { pageFolder }));

    return list;
  }, []);
}

function readViews(viewsToRead, cb) {
  async.reduce(viewsToRead, [], (list, identity, fn) => {
    let filepath = identity.path || identity.oId;
    // TODO when oId defined, ask DC (?) to get path
    if (!_startsWith(filepath, '/')) {
      // relative path from page folder
      filepath = join(identity.pageFolder, filepath);
    } else {
      try {
        fsNode.accessSync(join(root, filepath), fsNode.constants.F_OK);
        filepath = join(root, filepath);
      } catch (e) {
        // already absolute path
      }
    }
    fs.readJsonFromAbsPath(filepath, (err, viewContent) => {
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
        absolutePath: filepath,
        // geometry: identity.geometry,
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
  if (!_isObject(pages)) {
    pages = {};
  }

  const viewsToRead = _reduce(pages, (list, p) =>
    list.concat(findPageViewsAndReplaceWithUuid(p)),
  []);

  return readViews(viewsToRead, (err, views) => {
    if (err) {
      return cb(err);
    }

    return cb(null, Object.assign(content, {
      views: _reduce(views, (l, v) => Object.assign(l, { [v.uuid]: v }), {}),
    }));
  });
}

module.exports = { extractViews, readViews, findPageViewsAndReplaceWithUuid };
