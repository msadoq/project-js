import { v4 } from 'uuid';

import { readDocument } from './io';
import fs from '../common/fs';
import validation from './validation';
import {
  isViewTypeSupported,
  getSchema,
  getViewModule,
} from '../viewManager';

const simpleReadView = ({ pageFolder, ...viewInfo }, cb) => {
  const { path, oId, absolutePath } = viewInfo;
  readDocument(pageFolder, path, oId, absolutePath, (err, viewContent) => {
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

    const configuration =
      getViewModule(viewContent.type)
        .prepareConfigurationForStore(viewContent);

    const uuid = viewInfo.uuid || v4();
    return cb(null, {
      ...viewInfo,
      isModified: false,
      type: viewContent.type,
      path: viewInfo.path,
      oId: viewInfo.oId,
      absolutePath: fs.getPath(), // TODO : this is ugly
      configuration,
      uuid,
    });
  });
};

export default {
  simpleReadView,
};
