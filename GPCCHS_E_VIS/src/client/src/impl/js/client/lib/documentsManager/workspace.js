import getLogger from 'common/log';

const omit = require('lodash/omit');
const async = require('async');
const fs = require('../common/fs');
const validation = require('./validation');

const extractTimebars = require('./extractTimebars');
const extractTimelines = require('./extractTimelines');
const extractWindows = require('./extractWindows');
const { extractPages } = require('./extractPages');
const { extractViews } = require('./extractViews');
const { server } = require('../mainProcess/ipc');

const { requestPathFromOId } = server;

const logger = getLogger('documents:workspace');

module.exports = function readWorkspace(folder, relativePath, callback) {
  logger.info(`reading workspace ${folder}/${relativePath}`);
  async.waterfall([
    cb => fs.readJsonFromPath(folder, relativePath, undefined, undefined, requestPathFromOId, cb),
    (workspace, cb) => cb(validation('workspace', workspace), workspace),
    (workspace, cb) => cb(null, { __original: workspace, __folder: folder }),
    (content, cb) => extractTimebars(content, cb),
    (content, cb) => extractTimelines(content, cb),
    (content, cb) => extractWindows(content, cb),
    (content, cb) => extractPages(content, requestPathFromOId, cb),
    (content, cb) => extractViews(content, requestPathFromOId, cb),
    (content, cb) => cb(null, omit(content, ['__folder', '__original'])),
  ], callback);
};
