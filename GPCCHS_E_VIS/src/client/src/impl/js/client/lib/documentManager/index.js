import mapValues from 'lodash/fp/mapValues';

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

const createDocumentManager = (fmdApi) => {
  const injectFmdApi = mapValues(f => f.bind({ fmdApi }));
  return injectFmdApi(documentManagerApi);
};

export default createDocumentManager;
