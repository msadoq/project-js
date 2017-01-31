import createDocumentManager from '../documentManager';
import fmdApi from './fmd';

/**
 * documentsManager API
   please see documentation of this functions in lib/documentsManager/*
  {
    readViews:
    extractViews:
    saveView,
    saveViewAs,

    readPages,
    savePage,

    readWorkspace,
    saveWorkspace,
  }
*/

const documentManagerApi = createDocumentManager(fmdApi);
module.exports = documentManagerApi;
