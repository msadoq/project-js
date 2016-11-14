/* eslint no-underscore-dangle: 0 */

const _isObject = require('lodash/isObject');
const _reduce = require('lodash/reduce');
const _get = require('lodash/get');
const _find = require('lodash/find');
const _startsWith = require('lodash/startsWith');
const async = require('async');
const { v4 } = require('node-uuid');
const fs = require('../common/fs');
const fsNode = require('fs');
const validation = require('./validation');
const { join } = require('path');

const parameters = require('../common/parameters');

const root = parameters.FMD_ROOT;


function findWindowPagesAndReplaceWithUuid(window, timebars) {
  const pages = _get(window, 'pages');
  return _reduce(pages, (list, page, index) => {
    if (!page.oId && !page.path) {
      return list;
    }

    const uuid = v4();

    const timebar = _find(timebars, tb => tb.id === pages[index].timeBarId);
    const timebarId = timebar ? timebar.uuid : null;

    // replace window.pages.item with uuid
    pages[index] = uuid;

    // add page to read in list
    // eslint-disable-next-line no-param-reassign
    list.push(Object.assign({}, page, {
      uuid,
      timebarId,
    }));

    return list;
  }, []);
}

function readPages(folder, pagesToRead, cb) {
  async.reduce(pagesToRead, [], (list, identity, fn) => {
    let filepath = identity.path || identity.oId;
    // TODO: if oId defined, ask FMD to get path
    if (!_startsWith(filepath, '/')) {
      // relative path from workspace folder
      filepath = join(folder, filepath);
    } else {
      try {
        fsNode.accessSync(join(root, filepath), fsNode.constants.F_OK);
        // FMD path
        filepath = join(root, filepath);
      } catch (e) {
        // path is already absolute
      }
    }
    fs.readJsonFromAbsPath(filepath, (err, pageContent) => {
      if (err) {
        return fn(err);
      }
      const validationError = validation('page', pageContent);
      if (validationError) {
        return fn(validationError);
      }

      // eslint-disable-next-line no-param-reassign
      list = list.concat(Object.assign(pageContent, identity, { absolutePath: filepath }));

      return fn(null, list);
    });
  }, cb);
}

/**
 * Find timebars in .windows, read files and store each with a uuid in .pages
 *
 * @param content
 * @param cb
 * @returns {*}
 */
function extractPages(content, cb) {
  let windows = content.windows;
  if (!_isObject(windows)) {
    windows = {};
  }

  const pagesToRead = _reduce(windows, (list, w) =>
      list.concat(findWindowPagesAndReplaceWithUuid(w, _get(content, 'timebars', {}))),
  []);
  return readPages(content.__folder, pagesToRead, (err, pages) => {
    if (err) {
      return cb(err);
    }

    return cb(null, Object.assign(content, {
      pages: _reduce(pages, (l, v) => Object.assign(l, { [v.uuid]: v }), {}),
    }));
  });
}

module.exports = { extractPages, readPages, findWindowPagesAndReplaceWithUuid };
