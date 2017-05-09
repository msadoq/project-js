// import _ from 'lodash/fp';
import async from 'async';
import { v4 } from 'uuid';

import { readDocument } from './io';
import validation from './validation';
import {
  isViewTypeSupported,
  getSchema,
  getViewModule,
} from '../viewManager';

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
    const view =
      getViewModule(viewContent.type)
        .prepareViewForStore({ ...viewContent, uuid });

    return cb(null, {
      ...viewInfo,
      ...view,
      isModified: false,
      path: viewInfo.path,
      oId: viewInfo.oId,
      absolutePath: viewPath,
    });
  });
});

export default {
  simpleReadView,
};
