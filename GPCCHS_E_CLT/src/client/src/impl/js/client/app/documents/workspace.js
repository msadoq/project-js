const debug = require('../utils/debug')('documents:workspace');
const _ = require('lodash');
const async = require('async');
const documents = require('../documents');
const { v4 } = require('node-uuid');
const validator = require('../schemaManager/index');

// TODO aleal unit test
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

function getTimebarAndWindows(workspace, cb) {
  const validErr = validator.validateWsJson(workspace);
  if (validErr) {
    return cb(validErr, workspace);
  }
  return cb(null, {
    timebar: _.get(workspace, 'timeBarWindow.timeBars[0]', {}),
    windows: _.get(workspace, 'windows', {}),
  });
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
      const validErr = validator.validatePgJson(pageContent);
      if (validErr) {
        return fn(validErr);
      }
      // eslint-disable-next-line no-param-reassign
      list = list.concat(Object.assign(pageContent, identity));
      // list = list.concat(Object.assign(_.get(pageContent, '', {}), identity));

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

      if (supportedViewTypes.indexOf(viewContent.type) !== -1) {
        switch (viewContent.type) {
          case 'PlotView': {
            const validErr = validator.validatePvJson(viewContent);
            if (validErr) {
              return fn(validErr);
            }
            break;
          }
          case 'TextView': {
            const validErr = validator.validateTvJson(viewContent);
            if (validErr) {
              return fn(validErr);
            }
            break;
          }
          default:
            debug.debug('No validation for view type: ${viewContent.type}');
        }
        // eslint-disable-next-line no-param-reassign
        list = list.concat(Object.assign(
          identity,
          {
            type: viewContent.type,
            configuration: viewContent, //_.get(viewContent, '', {}),
          }
        ));
      }

      return fn(null, list);
    });
  }, (err, views) => cb(err, Object.assign(content, { views })));
}

function createConnectedData(data, uuid) {
  // Get parameters of global connected Data
  const cData = _.pick(data, ['formula', 'domain', 'timeline']);
  if (data.filter) {
    cData.filter = data.filter;
  }
  cData.uuid = uuid;
  return cData;
}

function moveConnectedData(connectedData) {
  // Add element in connectedData list
  const uuid = v4();
  const dataToStore = createConnectedData(connectedData, uuid);
  // Delete parameters stored in the view
  const data = _.omit(connectedData, ['formula', 'domain', 'timeline', 'filter']);
  connectedData = Object.assign({}, data, { uuid }); // eslint-disable-line no-param-reassign
  return { dataToStore, connectedData };
}

function separateConnectedData(content, cb) {
  const cdList = [];
  _.forEach(content.views, view => {
    switch (view.type) {
      case 'PlotView':
        _.forEach(view.configuration.plotViewEntryPoints, (value, index, source) => {
          const dataX = moveConnectedData(value.connectedDataX);
          cdList.push(dataX.dataToStore);
          // eslint-disable-next-line no-param-reassign
          source[index].connectedDataX = dataX.connectedData;
          const dataY = moveConnectedData(value.connectedDataY);
          cdList.push(dataY.dataToStore);
          // eslint-disable-next-line no-param-reassign
          source[index].connectedDataY = dataY.connectedData;
        });
        break;
      case 'TextView':
        _.forEach(view.configuration.textViewEntryPoints, (value, index, source) => {
          const data = moveConnectedData(value.connectedData);
          cdList.push(data.dataToStore);
          source[index].connectedData = data.connectedData; // eslint-disable-line no-param-reassign
        });
        break;
      default:
        debug.debug('No treatment for connectedData of view type: ${viewContent.type}');
    }
  });
  const r = Object.assign(content, { connectedData: cdList });
  return cb(null, r);
}

function getWindowList(content, cb) {
  content.windows = listWindows(content.windows); // eslint-disable-line no-param-reassign
  return cb(null, content);
}

function identifyPages(content, cb) {
  const pages = _.reduce(content.windows, (list, w) => list.concat(discoverPages(w)), []);
  return cb(null, Object.assign(content, { pages }));
}

function identifyViews(content, cb) {
  const views = _.reduce(content.pages, (list, p) => list.concat(discoverViews(p)), []);
  return cb(null, Object.assign(content, { views }));
}

function readWorkspace(path, callback) {
  debug.debug(`reading workspace ${path}`);
  async.waterfall([
    cb => documents.readJsonFromPath(path, cb), // <- read workspace
    (workspace, cb) => getTimebarAndWindows(workspace, cb),
    (content, cb) => getWindowList(content, cb),
    (content, cb) => identifyPages(content, cb),
    (content, cb) => readPages(content, cb),
    (content, cb) => identifyViews(content, cb),
    (content, cb) => readViews(content, cb),
    (content, cb) => separateConnectedData(content, cb),
  ], callback);
}

module.exports = {
  readWorkspace,
  identifyViews,
  identifyPages,
  getWindowList,
  getTimebarAndWindows,
  readPages,
  readViews,
  separateConnectedData,
  listWindows,
  discoverPages,
  discoverViews,
};
