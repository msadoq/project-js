const {
  pipe, ifElse, has, either,
  indexBy, map, filter, flatten, values,
  is, always, prop, propOr, assoc,
} = require('ramda');

const { dirname } = require('path');
const async = require('async');
const { v4 } = require('node-uuid');
const fs = require('../common/fs');
const validation = require('./validation');
const vivl = require('../../VIVL/main');
const addUuidToAxes = require('../dataManager/structures/range/addUuidToAxes');
const globalConstants = require('common/constants');
// const { requestPathFromOId } = require('../mainProcess/websocket');

const indexByUUID = indexBy(prop('uuid'));

const supportedViewTypes = [
  'PlotView',
  'TextView',
  'MimicView',
];

function prepareViews(page) {
  const injectUUIDAndPageFolder = pipe(
    prop('views'),
    filter(either(has('oId'), has('path'))),
    map(view => ({
      ...view,
      pageFolder: dirname(page.absolutePath), // extract page folder
      uuid: v4(),
    })),
  );
  return injectUUIDAndPageFolder(page);
}

function readViews(viewsToRead, requestPathFromOId, done) {
  async.reduce(viewsToRead, [], (views, view, next) => {
    fs.readJsonFromPath(view.pageFolder, view.path, view.oId, view.absolutePath,
      requestPathFromOId, (err, viewContent) => {
        if (err) {
          return next(err);
        }
        if (supportedViewTypes.indexOf(viewContent.type) === -1) {
          return next(new Error(`Unsupported view type '${viewContent.type}'`), viewsToRead);
        }
        let schema;
        try {
          schema = vivl(viewContent.type, 'getSchemaJson')();
        } catch (e) {
          return next(new Error(`Invalid schema on view type '${viewContent.type}'`), viewsToRead);
        }
        const validationError = validation(viewContent.type, viewContent, schema);
        if (validationError) {
          return next(validationError);
        }
        // Add uuid on axes
        const structureType = vivl(viewContent.type, 'structureType')();

        let viewContentWithIndexedAxes;
        switch (structureType) {
          case globalConstants.DATASTRUCTURETYPE_RANGE: {
            viewContentWithIndexedAxes = addUuidToAxes(viewContent);
            break;
          }
          default:
            viewContentWithIndexedAxes = viewContent;
            break;
        }

        return next(null, views.concat({
          type: viewContent.type,
          configuration: viewContentWithIndexedAxes,
          path: view.path,
          oId: view.oId,
          uuid: view.uuid,
          absolutePath: fs.getPath(),
          geometry: view.geometry,
        }));
      });
  }, done);
}

/**
 * Find views in .pages, read files and store each with a uuid in .views
 *
 * @param content
 * @param requestPathFromOId
 * @param done
 * @returns {*}
 */
function extractViews(content, requestPathFromOId, done) {
  const getViews = pipe(
    propOr({}, 'pages'),
    ifElse(
      is(Object),
      pipe(
        values,
        map(prepareViews),
        flatten,
      ),
      always([]),
    ),
  );

  const viewsToRead = getViews(content);

  return readViews(viewsToRead, requestPathFromOId, (err, views) => {
    if (err) {
      done(err);
    }
    const indexedViews = indexByUUID(views);
    const setViews = assoc('views', indexedViews);
    return done(null, setViews(content));
  });
}

module.exports = { extractViews, readViews };
