const { each } = require('lodash');
const { join } = require('path');
const { savePageAs } = require('./savePage');
const { saveViewAs } = require('./saveView');
const { saveWorkspaceAs } = require('./saveWorkspace');

function saveAllDocumentsAs(state, folder, file) {
  let err = saveWorkspaceAs(state, join(folder, file));
  if (err) {
    return err;
  }
  each(state.pages, (page, id) => {
    err = savePageAs(state, id, join(folder, page.path));
    if (err) {
      return err;
    }
  });
  each(state.views, (view, id) => {
    err = saveViewAs(state, id, join(folder, view.path));
    if (err) {
      return err;
    }
  });
}

function saveAllDocuments(state) {
  if (!state.workspace || !state.workspace.folder || !state.workspace.file) {
    return new Error('Unable to save documents: no path');
  }
  return saveAllDocumentsAs(state, state.workspace.folder, state.workspace.file);
}

module.exports = { saveAllDocuments, saveAllDocumentsAs };
