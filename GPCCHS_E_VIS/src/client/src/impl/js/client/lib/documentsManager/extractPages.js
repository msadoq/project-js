const { v4 } = require('node-uuid');
const {
  ifElse, isNil, identity, map, over, lensProp, compose, flatten, uncurryN,
  assoc, prop, values, indexBy, pluck, propOr, reject,
} = require('ramda');
const _find = require('lodash/find');
const async = require('async');

const fs = require('../common/fs');
const validation = require('./validation');

function readPages(folder, pagesToRead, done) {
  async.map(pagesToRead, (page, next) => {
    fs.readJsonFromPath(folder, page.path, page.oId, page.absolutePath, (err, pageContent) => {
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
      });
    });
  }, (err, pages = []) => done(err, reject(isNil, pages)));
}

const safeMap = f => ifElse(isNil, identity, map(f));
const overPages = over(lensProp('pages'));
const editPages = compose(safeMap, overPages, safeMap);

const newUUID = v4;
const injectUUID = obj => assoc('uuid', newUUID(), obj);
const setTimebarId = timebars => (page) => {
  const timebar = _find(timebars, tb => tb.id === page.timebarId) || {};
  return {
    ...page,
    timebarUuid: timebar.uuid,
  };
};
const injectIds = uncurryN(2)(timebars => (
  editPages(compose(setTimebarId(timebars), injectUUID))
));
const getPages = compose(flatten, pluck('pages'), values);
const keepOnlyUUID = editPages(prop('uuid'));

/**
 * Find timebars in .windows, read files and store each with a uuid in .pages
 *
 * @param content
 * @param cb
 * @returns {*}
 */
function extractPages(content, cb) {
  const getWindows = propOr({}, 'windows');
  const getTimebars = propOr({}, 'timebars');
  const newWindows = injectIds(getTimebars(content), getWindows(content));
  const pagesToRead = getPages(newWindows);
  return readPages(content.__folder, pagesToRead, (err, pages) => {
    const next = obj => (err ? cb(err) : cb(null, obj));
    return next({
      ...content,
      windows: keepOnlyUUID(newWindows),
      pages: indexBy(prop('uuid'))(pages),
    });
  });
}

module.exports = { extractPages, readPages };
