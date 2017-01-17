const { v4 } = require('node-uuid');
const async = require('async');

const map = require('lodash/fp/map');
const find = require('lodash/fp/find');
const update = require('lodash/fp/update');

const isNil = require('lodash/fp/isNil');
const compose = require('lodash/fp/compose');
const flatten = require('lodash/fp/flatten');
const assoc = require('lodash/fp/assoc');
const prop = require('lodash/fp/prop');
const values = require('lodash/fp/values');
const indexBy = require('lodash/fp/indexBy');
const pluck = require('lodash/fp/pluck');
const propOr = require('lodash/fp/propOr');
const reject = require('lodash/fp/reject');

const fmd = require('../common/fmd');
const fs = require('../common/fs');
const validation = require('./validation');

function readPages(folder, pagesToRead, done) {
  async.map(pagesToRead, (page, next) => {
    fmd.readJson(folder, page.path, page.oId, page.absolutePath, (err, pageContent) => {
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

const editPages = compose(map, update('pages'), map);

const newUUID = v4;
const injectUUID = obj => assoc('uuid', newUUID(), obj);
const setTimebarId = timebars => (page) => {
  const timebar = find(tb => tb.id === page.timebarId, timebars) || {};
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
