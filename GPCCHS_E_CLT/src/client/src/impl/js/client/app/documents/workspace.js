const debug = require('../utils/mainDebug')('documents:workspace');
const _ = require('lodash');
const async = require('async');
const fs = require('./fs');
const validation = require('./validation');

const extractTimebars = require('./lib/extractTimebars');
const extractTimelines = require('./lib/extractTimelines');
const extractWindows = require('./lib/extractWindows');
const { extractPages } = require('./lib/extractPages');
const { extractViews } = require('./lib/extractViews');
const extractConnectedData = require('./lib/extractConnectedData');

module.exports = function readWorkspace(folder, relativePath, callback) {
  debug.debug(`reading workspace ${folder} ${relativePath}`);
  async.waterfall([
    cb => fs.readJsonFromPath(folder, relativePath, cb),
    (workspace, cb) => cb(validation('workspace', workspace), workspace),
    (workspace, cb) => cb(null, { __original: workspace, __folder: folder }),
    (content, cb) => extractTimebars(content, cb),
    (content, cb) => extractTimelines(content, cb),
    (content, cb) => extractWindows(content, cb),
    (content, cb) => extractPages(content, cb),
    (content, cb) => extractViews(content, cb),
    // (content, cb) => extractConnectedData(content, cb),
    (content, cb) => cb(null, _.omit(content, ['__folder', '__original'])),
  ], callback);
};
