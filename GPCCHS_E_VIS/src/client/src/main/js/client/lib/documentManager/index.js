import {
  reloadView,
  openView,
  openPage,
  openWorkspace,
  openBlankWorkspace,
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

  // reload
  reloadView,
};
