// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Move documentManager in serverProcess .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import {
  reloadView,
  openView,
  openPage,
  openWorkspace,
  savePage,
  saveView,
  saveViewAsModel,
  saveWorkspace,
} from './actions';
import { readDocumentType } from './io';
import { createBlankWorkspace } from './createBlankWorkspace';

export default {
  // view
  openView,
  saveView,
  saveViewAsModel,
  reloadView,

  // page
  openPage,
  savePage,

  // workspace
  createBlankWorkspace,
  openWorkspace,
  saveWorkspace,

  // all documents
  readDocumentType,
};
