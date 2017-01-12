const {
  pipe, compose, ifElse, has, either,
  indexBy, map, filter, flatten, values, pluck,
  is, always, prop, propOr, assoc, over, lensProp,
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

// side effects due to uuid generation (v4)
function preparePageViews(page) {
  const pageFolder = dirname(page.absolutePath);
  const inViews = over(lensProp('views'));
  const injectUUIDAndPageFolder = inViews(
      pipe(
        filter(either(has('oId'), has('path'))),
        map(view => ({
          ...view,
          pageFolder,
          uuid: v4(),
        }))
      )
  );
  return injectUUIDAndPageFolder(page);
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
  const getAllViews = pipe(
    propOr({}, 'pages'),
    ifElse(
      is(Object),
      compose(flatten, values, pluck('views')),
      always([]),
    ),
  );

  const prepareAllPagesViews = over(lensProp('pages'), map(preparePageViews));
  const nextContent = prepareAllPagesViews(content);

  return readViews(getAllViews(nextContent), requestPathFromOId, (err, views) => {
    if (err) {
      done(err);
    }
    const setViews = assoc('views', indexByUUID(views));
    return done(null, setViews(nextContent));
  });
}

module.exports = { extractViews, readViews };
