import pipe from 'lodash/fp/pipe';
import compose from 'lodash/fp/compose';
import join from 'lodash/fp/join';
import has from 'lodash/fp/has';
import indexBy from 'lodash/fp/indexBy';
import negate from 'lodash/fp/negate';
import find from 'lodash/fp/find';
import flatten from 'lodash/fp/flatten';
import values from 'lodash/fp/values';
import pluck from 'lodash/fp/pluck';
import map from 'lodash/fp/map';
import mapValues from 'lodash/fp/mapValues';
import always from 'lodash/fp/always';
import prop from 'lodash/fp/prop';
import propOr from 'lodash/fp/propOr';
import assoc from 'lodash/fp/assoc';
import cond from 'lodash/fp/cond';
import anyPass from 'lodash/fp/anyPass';
import update from 'lodash/fp/update';
import isObject from 'lodash/fp/isObject';

import { dirname } from 'path';
import async from 'async';
import { v4 } from 'uuid';
import globalConstants from 'common/constants';

import { readDocument } from './io';
import fs from '../common/fs';
import validation from './validation';
import vivl from '../../VIVL/main';
import addUuidToAxes from '../dataManager/structures/range/addUuidToAxes';

const formattedValidation = compose(join('\n'), validation);
const indexByUUID = indexBy(prop('uuid'));

const supportedViewTypes = [
  'PlotView',
  'TextView',
  'DynamicView',
  'MimicView',
];

const readViews = fmdApi => (viewsToRead, done) => {
  async.reduce(viewsToRead, [], (views, view, next) => {
    const { pageFolder, path, oId } = view;
    readDocument(fmdApi)(pageFolder, path, oId, view.absolutePath, (err, viewContent) => {
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
      const validationError = formattedValidation(viewContent.type, viewContent, schema);
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
};

// side effects due to uuid generation (v4)
function preparePageViews(page) {
  const pageFolder = dirname(page.absolutePath);
  const isInvalidView = negate(anyPass([has('oId'), has('path')]));
  const hasInvalidView = pipe(prop('views'), find(isInvalidView));
  if (hasInvalidView(page)) {
    throw new Error('Invalid view in pages (extractViews)');
  }
  const injectUUIDAndPageFolder = update('views',
      pipe(
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
 * @param cb
 * @returns {*}
 */
const extractViews = fmdApi => (content, cb) => {
  try {
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

    return readViews(fmdApi)(getAllViews(nextContent), (err, views) => {
      if (err) {
        return cb(err);
      }
      const setViews = assoc('views', indexByUUID(views));
      return cb(null, setViews(nextContent));
    });
  } catch (e) {
    cb(e);
  }
};

export default {
  extractViews,
  readViews,
};
