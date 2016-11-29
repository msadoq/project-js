/* eslint no-underscore-dangle: 0 */

const _get = require('lodash/get');
const _reduce = require('lodash/reduce');
const _isObject = require('lodash/isObject');
const async = require('async');
const { v4 } = require('node-uuid');
const fs = require('../common/fs');
const validation = require('./validation');
const vivl = require('../../VIVL/main');
const { dirname } = require('path');
const addUuidToAxes = require('../dataManager/structures/range/addUuidToAxes');
const globalConstants = require('common/constants');
// const { requestPathFromOId } = require('../mainProcess/websocket');

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

function readViews(viewsToRead, requestPathFromOId, cb) {
  async.reduce(viewsToRead, [], (list, identity, fn) => {
    fs.readJsonFromPath(identity.pageFolder, identity.path, identity.oId, identity.absolutePath,
      requestPathFromOId, (err, viewContent) => {
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
        // Add uuid on axes
        const structureType = vivl(viewContent.type, 'structureType')();
        switch (structureType) { // eslint-disable-line default-case
          case globalConstants.DATASTRUCTURETYPE_RANGE: {
            viewContent = addUuidToAxes(viewContent); // eslint-disable-line no-param-reassign
          }
        }

        // eslint-disable-next-line no-param-reassign
        list = list.concat(Object.assign({
          type: viewContent.type,
          configuration: viewContent,
        }, {
          path: identity.path,
          oId: identity.oId,
          uuid: identity.uuid,
          absolutePath: fs.getPath(),
          geometry: identity.geometry,
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
function extractViews(content, requestPathFromOId, cb) {
  let pages = content.pages;
  if (!_isObject(pages)) {
    pages = {};
  }

  const viewsToRead = _reduce(pages, (list, p) =>
    list.concat(findPageViewsAndReplaceWithUuid(p)),
  []);

  return readViews(viewsToRead, requestPathFromOId, (err, views) => {
    if (err) {
      return cb(err);
    }

    return cb(null, Object.assign(content, {
      views: _reduce(views, (l, v) => Object.assign(l, { [v.uuid]: v }), {}),
    }));
  });
}

module.exports = { extractViews, readViews, findPageViewsAndReplaceWithUuid };
