/* eslint no-underscore-dangle: 0 */
const _each = require('lodash/each');
const { join } = require('path');
const { savePage } = require('./savePage');
const { saveView } = require('./saveView');
const { saveWorkspaceAs } = require('./saveWorkspace');

function saveAllDocumentsAs(state, folder, file) {
  let err = saveWorkspaceAs(state, join(folder, file), true);
  if (err) {
    return err;
  }
  _each(state.pages, (page, id) => {
    if (page.isModified) {
      err = savePage(state, id, true);
      if (err) {
        return err;
      }
    }
  });
  _each(state.views, (view, id) => {
    if (view.isModified) {
      err = saveView(state, id);
      if (err) {
        return err;
      }
    }
  });
}

function saveAllDocuments(state) {
  if (!state.hsc || !state.hsc.folder || !state.hsc.file) {
    return new Error('Unable to save documents: no path');
  }
  return saveAllDocumentsAs(state, state.hsc.folder, state.hsc.file);
}

module.exports = { saveAllDocuments, saveAllDocumentsAs };
