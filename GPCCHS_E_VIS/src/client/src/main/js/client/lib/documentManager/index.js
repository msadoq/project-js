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
