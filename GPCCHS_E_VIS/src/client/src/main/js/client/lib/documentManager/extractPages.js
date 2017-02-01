import { v4 } from 'uuid';
import async from 'async';

import map from 'lodash/fp/map';
import find from 'lodash/fp/find';
import update from 'lodash/fp/update';

import isEmpty from 'lodash/fp/isEmpty';
import isNil from 'lodash/fp/isNil';
import compose from 'lodash/fp/compose';
import flatten from 'lodash/fp/flatten';
import assoc from 'lodash/fp/assoc';
import prop from 'lodash/fp/prop';
import values from 'lodash/fp/values';
import indexBy from 'lodash/fp/indexBy';
import pluck from 'lodash/fp/pluck';
import propOr from 'lodash/fp/propOr';
import reject from 'lodash/fp/reject';

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
  }, (err, pages = []) => done(err, reject(isNil, pages)));
};

const editPages = compose(map, update('pages'), map);

const newUUID = v4;
const injectUUID = obj => assoc('uuid', newUUID(), obj);
const setTimebarId = timebars => (page) => {
  const timebar = find(tb => tb.id === page.timebarId, timebars) || {};
  if (isEmpty(timebar)) {
    throw new Error(`unknow timebarId ${page.timebarId}`);
  }
  return {
    ...page,
    timebarUuid: timebar.uuid,
  };
};
const injectIds = (timebars, windows) => (
  editPages(compose(setTimebarId(timebars), injectUUID))(windows)
);
const getPages = compose(flatten, pluck('pages'), values);
const keepOnlyUUID = editPages(prop('uuid'));

/**
 * Find timebars in .windows, read files and store each with a uuid in .pages
 *
 * @param content
 * @param cb
 * @returns {*}
 */
const extractPages = fmdApi => (content, cb) => {
  try {
    const getWindows = propOr({}, 'windows');
    const getTimebars = propOr({}, 'timebars');
    const newWindows = injectIds(getTimebars(content), getWindows(content));
    const pagesToRead = getPages(newWindows);
    return readPages(fmdApi)(content.__folder, pagesToRead, (err, pages) => {
      if (err) {
        return cb(err);
      }
      return cb(null, {
        ...content,
        windows: keepOnlyUUID(newWindows),
        pages: indexBy(prop('uuid'))(pages),
      });
    });
  } catch (e) {
    cb(e);
  }
};

export default {
  extractPages,
  readPages
};
