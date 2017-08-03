import _ from 'lodash/fp';
import { dirname } from 'path';
import async from 'async';
import { v4 } from 'uuid';

import { readDocument } from './io';
import validation from './validation';

import { simpleReadView } from './readView';

// utils
const updateAllViews = transform => _.update('views', _.map(transform));

export const simpleReadPage = async.reflect((pageInfo, cb) => {
  readDocument(pageInfo, (err, page, properties, pagePath) => {
    if (err) {
      return cb(err);
    }
    const validationError = validation('page', page);
    if (validationError) {
      return cb(validationError);
    }

    const preparePageViews = updateAllViews(
      _.pipe(
        _.update('geometry', _.pick(['x', 'y', 'w', 'h', 'maxH', 'maxW', 'collapsed', 'maximized'])),
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
      absolutePath: pagePath,
    });
  });
});


export const readPageAndViews = (pageInfo, done) => {
  const readViews = (viewsInfo, cb) => async.map(viewsInfo, simpleReadView, cb);
  simpleReadPage(pageInfo, (ignoredErr, page) => {
    if (page.error) {
      return done(null, { pages: [page] });
    }
    const viewsInfo = _.map(v => ({
      ...v,
      pageUuid: page.value.uuid,
      pageFolder: dirname(page.value.absolutePath),
    }), page.value.views);
    return readViews(viewsInfo, (ignoredErrViews, views) => {
      const cleanViewsInPage = _.set('value.views', []);
      return done(null, {
        pages: [cleanViewsInPage(page)],
        views,
      });
    });
  });
};
