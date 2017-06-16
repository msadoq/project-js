import _ from 'lodash/fp';
import { dirname } from 'path';
import async from 'async';
import { v4 } from 'uuid';

import { copyProp } from '../common/fp';

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
  readDocument(workspaceInfo, (err, workspace, properties, workspacePath) => {
    if (err) {
      return cb(err);
    }
    const validationError = validation('workspace', workspace);
    if (validationError) {
      return cb(validationError);
    }

    const documents = {
      ...workspace,
      ...workspaceInfo,
      absolutePath: workspacePath,
    };
    return cb(null, prepareWorkspace(documents));
  });
};

const initialDocuments = { pages: [], views: [] };
const readPagesAndViews = (pagesInfo, done) => (
  async.reduce(pagesInfo, initialDocuments, (documents, pageInfo, cb) => {
    readPageAndViews(pageInfo, (ignoredErr, pageAndViews) => (
      cb(null, _.pipe(
        _.update('pages', _.concat(_, pageAndViews.pages)),
        _.update('views', _.concat(_, pageAndViews.views))
      )(documents))
    ));
  }, done)
);

export const readWorkspacePagesAndViews = (workspaceInfo, cb) => {
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
    return readPagesAndViews(allPages, (ignoredErr, documents) => {
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
