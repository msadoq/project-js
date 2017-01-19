import getLogger from 'common/log';

import omit from 'lodash/omit';
import async from 'async';
import fmd from '../common/fmd';
import validation from './validation';

import extractTimebars from './extractTimebars';
import extractTimelines from './extractTimelines';
import extractWindows from './extractWindows';
import { extractPages } from './extractPages';
import { extractViews } from './extractViews';

const logger = getLogger('documents:workspace');

export default {
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
