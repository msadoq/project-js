import { v4 } from 'uuid';
import async from 'async';

import _ from 'lodash/fp';

import fs from '../common/fs';
import validation from './validation';
import { readDocument } from './io';

const readPages = fmdApi => (folder, pagesToRead, done) => {
  async.map(pagesToRead, (page, next) => {
    readDocument(fmdApi)(folder, page.path, page.oId, page.absolutePath,
      (err, pageContent, properties) => {
        if (err) {
          return next(err);
        }
        const validationError = validation('page', pageContent);
        if (validationError) {
          return next(validationError);
        }

        return next(null, {
          ...pageContent,
          ...page,
          absolutePath: fs.getPath(),
          properties, // Table with document props from FMD
        });
      });
  }, (err, pages = []) => done(err, _.reject(_.isNil, pages)));
};

const editPages = _.compose(_.map, _.update('pages'), _.map);

const newUUID = v4;
const injectUUID = obj => _.assoc('uuid', newUUID(), obj);
const setTimebarId = timebars => (page) => {
  const timebar = _.find(tb => tb.id === page.timebarId, timebars) || {};
  if (_.isEmpty(timebar)) {
    throw new Error(`unknow timebarId ${page.timebarId}`);
  }
  return {
    ...page,
    timebarUuid: timebar.uuid,
  };
};
const injectIds = (timebars, windows) => (
  editPages(_.compose(setTimebarId(timebars), injectUUID))(windows)
);
const getPages = _.compose(_.flatten, _.pluck('pages'), _.values);
const keepOnlyUUID = editPages(_.prop('uuid'));

/**
 * Find timebars in .windows, read files and store each with a uuid in .pages
 *
 * @param content
 * @param cb
 * @returns {*}
 */
const extractPages = fmdApi => (content, cb) => {
  try {
    const getWindows = _.propOr({}, 'windows');
    const getTimebars = _.propOr({}, 'timebars');
    const newWindows = injectIds(getTimebars(content), getWindows(content));
    const pagesToRead = getPages(newWindows);
    return readPages(fmdApi)(content.__folder, pagesToRead, (err, pages) => {
      if (err) {
        return cb(err);
      }
      return cb(null, {
        ...content,
        windows: keepOnlyUUID(newWindows),
        pages: _.indexBy(_.prop('uuid'))(pages),
      });
    });
  } catch (e) {
    return cb(e);
  }
};

export default {
  extractPages,
  readPages,
};
