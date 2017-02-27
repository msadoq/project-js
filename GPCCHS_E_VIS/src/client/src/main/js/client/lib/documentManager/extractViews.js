import _ from 'lodash/fp';
import { dirname } from 'path';
import async from 'async';
import { v4 } from 'uuid';

import { readDocument } from './io';
import fs from '../common/fs';
import validation from './validation';
import {
  isViewTypeSupported,
  getSchema,
  getViewModule,
} from '../viewManager';

const indexByUUID = _.indexBy(_.prop('uuid'));

const readViews = fmdApi => (viewsToRead, done) => {
  async.reduce(viewsToRead, [], (views, view, next) => {
    const { pageFolder, path, oId } = view;
    readDocument(fmdApi)(pageFolder, path, oId, view.absolutePath, (err, viewContent) => {
      if (err) {
        next(err);
        return;
      }
      if (!isViewTypeSupported(viewContent.type)) {
        next(new Error(`Unsupported view type '${viewContent.type}'`), viewsToRead);
        return;
      }

      const schema = getSchema(viewContent.type);

      const validationError = validation(viewContent.type, viewContent, schema);
      if (validationError) {
        next(validationError);
        return;
      }

      const configuration =
        getViewModule(viewContent.type)
          .prepareConfigurationForStore(viewContent);

      next(null, views.concat({
        type: viewContent.type,
        configuration,
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
  const isInvalidView = _.negate(_.anyPass([_.has('oId'), _.has('path')]));
  const hasInvalidView = _.pipe(_.prop('views'), _.find(isInvalidView));
  if (hasInvalidView(page)) {
    throw new Error('Invalid view in pages (extractViews)');
  }
  const injectUUIDAndPageFolder = _.update('views',
      _.pipe(
        _.map(view => ({
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
 * @param fmdApi
 * @returns function
 */
const extractViews = fmdApi => (content, cb) => {
  try {
    const otherwise = () => true;
    const getAllViews = _.pipe(
      _.propOr({}, 'pages'),
      _.cond([
        [_.isObject, _.compose(_.flatten, _.values, _.pluck('views'))],
        [otherwise, _.always([])],
      ])
    );

    const prepareAllPagesViews = _.update('pages', _.mapValues(preparePageViews));
    const nextContent = prepareAllPagesViews(content);

    return readViews(fmdApi)(getAllViews(nextContent), (err, views) => {
      if (err) {
        return cb(err);
      }
      const setViews = _.assoc('views', indexByUUID(views));
      return cb(null, setViews(nextContent));
    });
  } catch (e) {
    return cb(e);
  }
};

export default {
  extractViews,
  readViews,
};
