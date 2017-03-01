import async from 'async';

import { readPageAndViews } from './readPage';

const readPages = pagesInfo => async.reduce(pagesInfo, {}, (documents, pageInfo, cb) => {
  readPageAndViews(pageInfo, (err, pageAndViews) => {
    if (err) {
      return cb(err);
    }
    return cb(null, {
      pages: documents.pages.concat(pageAndViews.pages),
      views: documents.views.concat(pageAndViews.views),
    });
  });
});

export default readPages;
