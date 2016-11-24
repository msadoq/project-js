const debug = require('../common/debug/mainDebug')('documents:workspace');
const omit = require('lodash/omit');
const async = require('async');
const fs = require('../common/fs');
const validation = require('./validation');

const extractTimebars = require('./extractTimebars');
const extractTimelines = require('./extractTimelines');
const extractWindows = require('./extractWindows');
const { extractPages } = require('./extractPages');
const { extractViews } = require('./extractViews');

module.exports = function readWorkspace(folder, relativePath, callback) {
  debug.info(`reading workspace ${folder}/${relativePath}`);
  async.waterfall([
    cb => fs.readJsonFromPath(folder, relativePath, undefined, undefined, cb),
    (workspace, cb) => cb(validation('workspace', workspace), workspace),
    (workspace, cb) => cb(null, { __original: workspace, __folder: folder }),
    (content, cb) => extractTimebars(content, cb),
    (content, cb) => extractTimelines(content, cb),
    (content, cb) => extractWindows(content, cb),
    (content, cb) => extractPages(content, cb),
    (content, cb) => extractViews(content, cb),
    (content, cb) => cb(null, omit(content, ['__folder', '__original'])),
  ], callback);
};
