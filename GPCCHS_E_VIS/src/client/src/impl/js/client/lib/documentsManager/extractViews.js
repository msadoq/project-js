const pipe = require('lodash/fp/pipe');
const compose = require('lodash/fp/compose');
const has = require('lodash/fp/has');
const indexBy = require('lodash/fp/indexBy');
const filter = require('lodash/fp/filter');
const flatten = require('lodash/fp/flatten');
const values = require('lodash/fp/values');
const pluck = require('lodash/fp/pluck');
const map = require('lodash/fp/map');
const mapValues = require('lodash/fp/mapValues');
const always = require('lodash/fp/always');
const prop = require('lodash/fp/prop');
const propOr = require('lodash/fp/propOr');
const assoc = require('lodash/fp/assoc');
const cond = require('lodash/fp/cond');
const anyPass = require('lodash/fp/anyPass');
const update = require('lodash/fp/update');
const isObject = require('lodash/fp/isObject');

const { dirname } = require('path');
const async = require('async');
const { v4 } = require('node-uuid');
const fs = require('../common/fs');
const validation = require('./validation');
const vivl = require('../../VIVL/main');
const addUuidToAxes = require('../dataManager/structures/range/addUuidToAxes');
const globalConstants = require('common/constants');

const indexByUUID = indexBy(prop('uuid'));

const supportedViewTypes = [
  'PlotView',
  'TextView',
  'MimicView',
];

function readViews(viewsToRead, done) {
  async.reduce(viewsToRead, [], (views, view, next) => {
    const { pageFolder, path, oId } = view;
    fs.readJsonFromPath(pageFolder, path, oId, view.absolutePath, (err, viewContent) => {
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
  const injectUUIDAndPageFolder = update('views',
      pipe(
        filter(anyPass([has('oId'), has('path')])),
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
 * @param done
 * @returns {*}
 */
function extractViews(content, done) {
  const otherwise = () => true;
  const getAllViews = pipe(
    propOr({}, 'pages'),
    cond([
      [isObject, compose(flatten, values, pluck('views'))],
      [otherwise, always([])],
    ]),
  );

  const prepareAllPagesViews = update('pages', mapValues(preparePageViews));
  const nextContent = prepareAllPagesViews(content);

  return readViews(getAllViews(nextContent), (err, views) => {
    if (err) {
      return done(err);
    }
    const setViews = assoc('views', indexByUUID(views));
    return done(null, setViews(nextContent));
  });
}

module.exports = { extractViews, readViews };
