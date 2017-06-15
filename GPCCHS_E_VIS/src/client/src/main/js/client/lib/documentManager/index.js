import {
  reloadView,
  openView,
  openPage,
  openWorkspace,
  openBlankWorkspace,
  openPageOrView,
} from './actions';
import { saveView, saveViewAs } from './saveView';
import { savePage } from './savePage';
import { saveWorkspace } from './saveWorkspace';

export default {
  // save
  saveView,
  saveViewAs,
  savePage,
  saveWorkspace,

  // open
  openView,
  openPage,
  openWorkspace,
  openBlankWorkspace,
  openPageOrView,

  // reload
  reloadView,
};
