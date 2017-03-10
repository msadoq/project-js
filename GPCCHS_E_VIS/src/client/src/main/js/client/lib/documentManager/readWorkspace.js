import _ from 'lodash/fp';
import { dirname } from 'path';
import async from 'async';
import { v4 } from 'uuid';

import { copyProp } from 'common/utils/fp';

import fmdApi from '../common/fmd';
import fs from '../common/fs';
import validation from './validation';

import { readDocument } from './io';
import { readPageAndViews } from './readPage';


/* Prepare workspace */
const injectUuids = _.map(_.update('uuid', v4));
const injectUuidsIn = key => _.update(key, injectUuids);

const flattenTimelines = _.pipe(
  copyProp('timebars', 'timelines'),
  _.update('timelines', _.flatMap('timelines')),
  _.update('timebars', _.map(_.update('timelines', _.map('uuid'))))
);

const updateAllPages = (transform, documents) => (
  _.update('windows', _.map(_.update('pages', _.map(transform))), documents)
);

const findTimebarById = (id, timebars) => timebars.find(t => t.id === id);

const hydrateTimebarsUuidInPages = documents => (
  updateAllPages((page) => {
    const timebar = findTimebarById(page.timebarId, documents.timebars);
    return _.set('timebarUuid', timebar.uuid, page);
  }, documents)
);

const prepareWorkspace = _.pipe(
  injectUuidsIn('windows'),
  injectUuidsIn('timebars'),
  _.update('windows', _.map(_.update('pages', injectUuids))),
  _.update('timebars', _.map(_.update('timelines', injectUuids))),
  _.update('timebars', _.map(_.unset('type'))),
  flattenTimelines,
  hydrateTimebarsUuidInPages
);
/* ----------------- */

const simpleReadWorkspace = (workspaceInfo, cb) => {
  const { absolutePath } = workspaceInfo;
  readDocument(fmdApi)(undefined, undefined, undefined, absolutePath, (err, workspaceContent) => {
    if (err) {
      return cb(err);
    }
    const validationError = validation('workspace', workspaceContent);
    if (validationError) {
      return cb(validationError);
    }

    const workspace = _.update('windows', _.map(_.set('isModified', false)), workspaceContent);
    const documents = {
      ...workspace,
      ...workspaceInfo,
      absolutePath: fs.getPath(), // ugly side effects
    };
    return cb(null, prepareWorkspace(documents));
  });
};

const initialDocuments = { pages: [], views: [] };
const readPagesAndViews = (pagesInfo, done) => (
  async.reduce(pagesInfo, initialDocuments, (documents, pageInfo, cb) => {
    readPageAndViews(pageInfo, (err, pageAndViews) => {
      if (err) {
        return cb(err);
      }
      return cb(null, _.pipe(
        _.update('pages', _.concat(_, pageAndViews.pages)),
        _.update('views', _.concat(_, pageAndViews.views))
      )(documents));
    });
  }, done)
);

const readWorkspacePagesAndViews = (workspaceInfo, cb) => {
  simpleReadWorkspace(workspaceInfo, (errWorkspace, workspace) => {
    if (errWorkspace) {
      return cb(errWorkspace);
    }
    const allPages = _.flatMap(w => (
      _.map(page => ({
        ...page,
        windowId: w.uuid,
        workspaceFolder: dirname(workspace.absolutePath),
      }), w.pages)
    ), workspace.windows);
    return readPagesAndViews(allPages, (errPages, documents) => {
      if (errPages) {
        return cb(errPages);
      }
      const preparePages = _.update('windows', _.map(_.set('pages', [])));
      return cb(null, {
        ...preparePages(workspace),
        ...documents,
      });
    });
  });
};

export default {
  readWorkspacePagesAndViews,
};
