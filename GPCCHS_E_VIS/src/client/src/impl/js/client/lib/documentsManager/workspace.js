import getLogger from 'common/log';

const omit = require('lodash/omit');
const async = require('async');
const fmd = require('../common/fmd');
const validation = require('./validation');

const extractTimebars = require('./extractTimebars');
const extractTimelines = require('./extractTimelines');
const extractWindows = require('./extractWindows');
const { extractPages } = require('./extractPages');
const { extractViews } = require('./extractViews');

const logger = getLogger('documents:workspace');

module.exports = {
  readWorkspace: (folder, relativePath, callback) => {
    logger.info(`reading workspace ${folder}/${relativePath}`);
    async.waterfall([
      cb => fmd.readJson(folder, relativePath, undefined, undefined, cb),
      (workspace, cb) => cb(validation('workspace', workspace), workspace),
      (workspace, cb) => cb(null, { __original: workspace, __folder: folder }),
      (content, cb) => extractTimebars(content, cb),
      (content, cb) => extractTimelines(content, cb),
      (content, cb) => extractWindows(content, cb),
      (content, cb) => extractPages(content, cb),
      (content, cb) => extractViews(content, cb),
      (content, cb) => cb(null, omit(content, ['__folder', '__original'])),
    ], callback);
  }
};
