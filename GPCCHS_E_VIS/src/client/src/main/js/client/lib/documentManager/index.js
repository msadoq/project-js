import { applyDependencyToApi } from '../common/utils';

// views
import { saveView, saveViewAs } from './saveView';

// pages
import { savePage } from './savePage';

// workspaces
import { saveWorkspace } from './saveWorkspace';

const documentManagerApi = {
  saveView,
  saveViewAs,
  savePage,
  saveWorkspace,
};

const createDocumentManager = applyDependencyToApi(documentManagerApi);

// documentManager api is available in lib/common/documentManager
export default createDocumentManager;
