import {
  reloadView,
  openView,
  openPage,
  openWorkspace,
  openBlankWorkspace,
  savePage,
  saveView,
} from './actions';

import { saveWorkspace } from './saveWorkspace';
import { readDocumentType } from './io';

export default {
  // save
  saveView,
  savePage,
  saveWorkspace,

  // open
  openView,
  openPage,
  openWorkspace,
  openBlankWorkspace,

  // reload
  reloadView,

  // io
  readDocumentType,
};
