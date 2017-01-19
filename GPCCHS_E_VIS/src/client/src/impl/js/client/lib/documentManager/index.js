import { applyDependencyToApi } from 'common/utils';

// views
import { extractViews, readViews } from './extractViews';
import { saveView, saveViewAs } from './saveView';

// pages
import { readPages } from './extractPages';
import { savePage } from './savePage';

// workspaces
import { readWorkspace } from './workspace';
import { saveWorkspace } from './saveWorkspace';

const documentManagerApi = {
  readViews,
  extractViews,
  saveView,
  saveViewAs,

  readPages,
  savePage,

  readWorkspace,
  saveWorkspace,
};

const createDocumentManager = applyDependencyToApi(documentManagerApi);

// documentManager api is available in lib/common/documentManager
export default createDocumentManager;
