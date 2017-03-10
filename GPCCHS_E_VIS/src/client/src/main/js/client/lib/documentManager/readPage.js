import _ from 'lodash/fp';
import { dirname } from 'path';
import async from 'async';
import { v4 } from 'uuid';

import fmdApi from '../common/fmd';
import { readDocument } from './io';
import fs from '../common/fs';
import validation from './validation';

import { simpleReadView } from './readView';

// utils
const updateAllViews = transform => _.update('views', _.map(transform));

export const simpleReadPage = (pageInfo, cb) => {
  const { workspaceFolder, path, oId, absolutePath } = pageInfo;
  readDocument(fmdApi)(workspaceFolder, path, oId, absolutePath, (err, page, properties) => {
    if (err) {
      return cb(err);
    }
    const validationError = validation('page', page);
    if (validationError) {
      return cb(validationError);
    }

    const preparePageViews = updateAllViews(
      _.pipe(
        _.update('geometry', _.pick(['x', 'y', 'w', 'h', 'maxH', 'maxW'])),
        _.update('uuid', v4)
      )
    );

    const uuid = pageInfo.uuid || v4();
    return cb(null, {
      ...preparePageViews(page),
      ...pageInfo,
      properties, // Table with document props from FMD
      uuid,
      isModified: false,
      absolutePath: fs.getPath(), // ugly
    });
  });
};


export const readPageAndViews = (pageInfo, done) => {
  const readViews = (viewsInfo, cb) => async.map(viewsInfo, simpleReadView, cb);
  simpleReadPage(pageInfo, (errPage, page) => {
    if (errPage) {
      return done(errPage);
    }
    const viewsInfo = _.map(v => ({
      ...v,
      pageUuid: page.uuid,
      pageFolder: dirname(page.absolutePath),
    }), page.views);
    return readViews(viewsInfo, (errViews, views) => {
      if (errViews) {
        return done(errViews);
      }
      const cleanViewsInPage = _.set('views', []);
      return done(null, {
        pages: [cleanViewsInPage(page)],
        views,
      });
    });
  });
};
