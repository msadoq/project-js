const debug = require('../io/debug')('documents:workspace');
const _ = require('lodash');
const async = require('async');
const documents = require('../documents');
const { v4 } = require('node-uuid');

// TODO aleal remove data.attributes
// TODO aleal unit test
// TODO aleal add JSON schema validation
// TODO same page/view used in more than one window/page

const supportedWindowTypes = [
  'documentWindow',
];

const supportedViewTypes = [
  'PlotView',
  'TextView',
  'MimicView',
];

function listWindows(windows) {
  if (!_.isArray(windows)) {
    return [];
  }

  return _.map(
    _.filter(windows, w => supportedWindowTypes.indexOf(w.type) !== -1),
    w => Object.assign(w, { uuid: v4() })
  );
}

function discoverPages(window) {
  const pages = _.get(window, 'pages');

  // TODO resolve oId as path

  return _.reduce(pages, (list, page, index) => {
    if (!page.oId && !page.path) {
      return list;
    }

    const uuid = v4();

    // replace window.pages.item with uuid
    pages[index] = uuid;

    list.push(Object.assign({}, page, { uuid })); // eslint-disable-line no-param-reassign
    return list;
  }, []);
}

function discoverViews(page) {
  const views = _.get(page, 'views', []);

  // TODO resolve oId as path
  return _.reduce(views, (list, view, index) => {
    if (!view.oId && !view.path) {
      return list;
    }

    const uuid = v4();

    views[index] = Object.assign({}, views[index], { uuid });

    // eslint-disable-next-line no-param-reassign
    list.push(Object.assign({}, { uuid }, view.path ? { path: view.path } : { oId: view.oId }));
    return list;
  }, []);
}

function readPages(content, cb) {
  async.reduce(content.pages, [], (list, identity, fn) => {
    // TODO resolve oId as path
    const filepath = identity.path || identity.oId;
    documents.readJsonFromPath(filepath, (err, pageContent) => {
      if (err) {
        return fn(err);
      }

      // eslint-disable-next-line no-param-reassign
      list = list.concat(Object.assign(_.get(pageContent, 'data.attributes', {}), identity));

      return fn(null, list);
    });
  }, (err, pages) => cb(err, Object.assign(content, { pages })));
}

function readViews(content, cb) {
  async.reduce(content.views, [], (list, identity, fn) => {
    // TODO resolve oId as path
    const filepath = identity.path || identity.oId;
    documents.readJsonFromPath(filepath, (err, viewContent) => {
      if (err) {
        return fn(err);
      }

      if (supportedViewTypes.indexOf(viewContent.data.type) !== -1) {
        // eslint-disable-next-line no-param-reassign
        list = list.concat(Object.assign(
          identity,
          {
            type: viewContent.data.type,
            configuration: _.get(viewContent, 'data.attributes', {}),
          }
        ));
      }

      return fn(null, list);
    });
  }, (err, views) => cb(err, Object.assign(content, { views })));
}

module.exports = (path, callback) => {
  debug.debug(`reading workspace ${path}`);
  async.waterfall([
    cb => documents.readJsonFromPath(path, cb), // <- read workspace
    (workspace, cb) => cb(null, {
      timebar: _.get(workspace, 'data.attributes.timeBarWindow.timeBar', {}),
      windows: _.get(workspace, 'data.attributes.windows', {}),
    }),
    (content, cb) => {
      content.windows = listWindows(content.windows); // eslint-disable-line no-param-reassign
      return cb(null, content);
    },
    (content, cb) => {
      const pages = _.reduce(
        content.windows,
        (list, w) => list.concat(discoverPages(w)),
        []
      );

      return cb(null, Object.assign(content, { pages }));
    },
    (content, cb) => readPages(content, cb),
    (content, cb) => {
      const views = _.reduce(content.pages, (list, p) => list.concat(discoverViews(p)), []);
      return cb(null, Object.assign(content, { views }));
    },
    (content, cb) => readViews(content, cb),
  ], callback);
};
