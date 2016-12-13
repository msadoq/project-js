/* eslint no-underscore-dangle: 0 */
const _each = require('lodash/each');
const { join } = require('path');
const { savePage } = require('./savePage');
const { saveView } = require('./saveView');
const { saveWorkspaceAs } = require('./saveWorkspace');

function saveAllDocumentsAs(state, folder, file) {
  saveWorkspaceAs(state, join(folder, file), true, (err) => {
    if (err) {
      return err;
    }
  });
  _each(state.pages, (page, id) => {
    if (page.isModified) {
      savePage(state, id, true, (errPage) => {
        if (errPage) {
          return errPage;
        }
      });
    }
  });
  _each(state.views, (view, id) => {
    if (view.isModified) {
      saveView(state, id, (errView) => {
        if (errView) {
          return errView;
        }
      });
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
