const debug = require('../utils/debug')('documents:workspace');
const _ = require('lodash');
const async = require('async');
const documents = require('../documents');
const { v4 } = require('node-uuid');
const validateJson = require('../schemaManager');
const external = require('../../external.main');
const extractTimebars = require('./lib/extractTimebars');
const extractTimelines = require('./lib/extractTimelines');
const extractWindows = require('./lib/extractWindows');

// TODO same page/view used in more than one window/page

const supportedViewTypes = [
  'PlotView',
  'TextView',
  'MimicView',
];

function validateWorkspace(workspace, cb) { // TODO add specific test
  const err = validateJson('Workspace', workspace);
  if (err) {
    return cb(err);
  }

  return cb(null, workspace);
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

function readPages(folder, content, cb) {
  async.reduce(content.pages, [], (list, identity, fn) => {
    // TODO resolve oId as path
    const filepath = identity.path || identity.oId;
    documents.readJsonFromPath(folder, filepath, (err, pageContent) => {
      if (err) {
        return fn(err);
      }
      const validErr = validateJson('Page', pageContent);
      if (validErr) {
        return fn(validErr);
      }
      // eslint-disable-next-line no-param-reassign
      list = list.concat(Object.assign(pageContent, identity));

      return fn(null, list);
    });
  }, (err, pages) => cb(err, Object.assign(content, { pages })));
}

function readViews(folder, content, cb) {
  async.reduce(content.views, [], (list, identity, fn) => {
    // TODO resolve oId as path
    const filepath = identity.path || identity.oId;
    documents.readJsonFromPath(folder, filepath, (err, viewContent) => {
      if (err) {
        return fn(err);
      }

      if (supportedViewTypes.indexOf(viewContent.type) !== -1) {
        let validError;
        if (_.has(external, viewContent.type)) {
          const schema = external[viewContent.type].getSchemaJson();
          validError = validateJson(viewContent.type, viewContent, schema);
        }
        if (validError) {
          return fn(validError);
        }

        // eslint-disable-next-line no-param-reassign
        list = list.concat(Object.assign(
          identity,
          {
            type: viewContent.type,
            configuration: viewContent,
          }
        ));
      }
      return fn(null, list);
    });
  }, (err, views) => cb(err, Object.assign(content, { views })));
}

function separateConnectedData(content, cb) {
  const cdList = [];
  _.forEach(content.views, view => {
    if (_.has(external, view.type)) {
      const cdListPart = external[view.type].getConnectedDataFromViewDocument(view);
      _.each(cdListPart, elem => {
        cdList.push(elem);
      });
    }
  });
  return cb(null, Object.assign(content, { connectedData: cdList }));
}

function identifyPages(content, cb) {
  const pages = _.reduce(content.windows, (list, w) => list.concat(discoverPages(w)), []);
  return cb(null, Object.assign(content, { pages }));
}

function identifyViews(content, cb) {
  const views = _.reduce(content.pages, (list, p) => list.concat(discoverViews(p)), []);
  return cb(null, Object.assign(content, { views }));
}

module.exports = function readWorkspace(folder, relativePath, callback) {
  debug.debug(`reading workspace ${folder} ${relativePath}`);
  async.waterfall([
    cb => documents.readJsonFromPath(folder, relativePath, cb), // <- read workspace
    (workspace, cb) => validateWorkspace(workspace, cb),
    (workspace, cb) => cb(null, { __original: workspace }),
    (content, cb) => extractTimebars(content, cb),
    (content, cb) => extractTimelines(content, cb),
    (content, cb) => extractWindows(content, cb),
    (content, cb) => identifyPages(content, cb),
    (content, cb) => readPages(folder, content, cb),
    (content, cb) => identifyViews(content, cb),
    (content, cb) => readViews(folder, content, cb),
    (content, cb) => separateConnectedData(content, cb),
  ], callback);
};
