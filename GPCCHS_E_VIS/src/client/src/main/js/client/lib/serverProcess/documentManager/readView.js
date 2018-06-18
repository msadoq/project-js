// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Move documentManager in serverProcess .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

// import _ from 'lodash/fp';
import async from 'async';
import { v4 } from 'uuid';

import {
  isViewTypeSupported,
  getSchema,
  getViewModule,
} from 'viewManager';
import { readDocument } from './io';
import validation from './validation';

const simpleReadView = async.reflect((viewInfo, cb) => {
  readDocument(viewInfo, (err, viewContent, properties, viewPath) => {
    if (err) {
      return cb(err);
    }
    if (!isViewTypeSupported(viewContent.type)) {
      return cb(new Error(`Unsupported view type '${viewContent.type}'`), viewInfo);
    }

    const schema = getSchema(viewContent.type);

    const validationError = validation(viewContent.type, viewContent, schema);
    if (validationError) {
      return cb(validationError);
    }

    const uuid = viewInfo.uuid || v4();
    const view = getViewModule(viewContent.type).prepareViewForStore({ ...viewContent, uuid });

    return cb(null, {
      isModified: false,
      ...viewInfo,
      ...view,
      path: viewInfo.path,
      oId: viewInfo.oId,
      absolutePath: viewPath,
    });
  });
});

export default {
  simpleReadView,
};
