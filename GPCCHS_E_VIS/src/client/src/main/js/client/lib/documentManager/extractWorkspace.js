import { join, dirname, basename } from 'path';
import getLogger from 'common/log';

import omit from 'lodash/omit';
import async from 'async';
import validation from './validation';

import extractTimebars from './extractTimebars';
import extractTimelines from './extractTimelines';
import extractWindows from './extractWindows';
import { extractPages } from './extractPages';
import { extractViews } from './extractViews';

import { readDocument } from './io';

const logger = getLogger('documents:workspace');

export default {
  readWorkspace: fmdApi => (workspaceFolder, relativePath, callback) => {
    console.warn(workspaceFolder, relativePath);
    const fullPath = join(workspaceFolder, relativePath);
    const folder = dirname(fullPath);
    const file = basename(fullPath);
    logger.info(`reading workspace ${fullPath}`);
    async.waterfall([
      cb => readDocument(fmdApi)(folder, file, undefined, undefined, cb),
      (workspace, cb) => cb(validation('workspace', workspace), workspace),
      (workspace, cb) => cb(null, { __original: workspace, __folder: folder }),
      (content, cb) => extractTimebars(content, cb),
      (content, cb) => extractTimelines(content, cb),
      (content, cb) => extractWindows(content, cb),
      (content, cb) => extractPages(fmdApi)(content, cb),
      (content, cb) => extractViews(fmdApi)(content, cb),
      (content, cb) => cb(null, omit(content, ['__folder', '__original'])),
    ], (err, res) => (err ? callback(err) : callback(err, res)));
  },
};
