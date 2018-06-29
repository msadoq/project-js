// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Move documentManager in serverProcess .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================


import async from 'async';
import { v4 } from 'uuid';

import {
  isViewTypeSupported,
  getSchema,
  getViewModule,
} from 'viewManager';
import { read } from 'common/fs';
import { readDocument } from './io';
import { getRootDir } from './fmd';
import resolvePath from './pathResolver';
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

    switch (viewContent.type) {
      case 'MimicView': { // In the Mimic View case the svg content needs to be read
        // from an svg file. The viewContent.contentPath property is the path to that
        // file relative to fmd.
        const fmdRelativePath = viewContent.contentPath;
        const root = getRootDir();
        const absolute = `${root}${fmdRelativePath}`;
        resolvePath({ absolutePath: absolute }, (resolveErr, { resolvedPath }) => {
          if (resolveErr) {
            return cb(err, {});
          }
          return read(resolvedPath, (readErr, svgContent) => {
            if (readErr) {
              return cb(readErr);
            }
            const complementedViewContent = {
              ...viewContent,
              content: svgContent,
            };
            const view = getViewModule('MimicView')
              .prepareViewForStore({ ...complementedViewContent, uuid });
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
        break;
      }
      default: { // default is any type of view besides mimic
        const view = getViewModule(viewContent.type).prepareViewForStore({ ...viewContent, uuid });
        return cb(null, {
          isModified: false,
          ...viewInfo,
          ...view,
          path: viewInfo.path,
          oId: viewInfo.oId,
          absolutePath: viewPath,
        });
      }
    }
    return null;
  });
});

export default {
  simpleReadView,
};
