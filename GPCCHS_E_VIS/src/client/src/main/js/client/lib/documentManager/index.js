import {
  reloadView,
  openView,
  openPage,
  openWorkspace,
  savePage,
  saveView,
  saveWorkspace,
} from './actions';
import { readDocumentType } from './io';
import { createBlankWorkspace } from './createBlankWorkspace';

export default {
  // save
  saveView,
  savePage,
  saveWorkspace,

  // open
  openView,
  openPage,
  openWorkspace,
  createBlankWorkspace,

  // reload
  reloadView,

  // io
  readDocumentType,
};
