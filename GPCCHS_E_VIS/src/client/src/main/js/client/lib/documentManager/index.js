// views
import { saveView, saveViewAs } from './saveView';

// pages
import { savePage } from './savePage';

// workspaces
import { saveWorkspace } from './saveWorkspace';

const createDocumentManager = deps => ({
  saveView,
  saveViewAs,
  savePage: savePage(deps),
  saveWorkspace: saveWorkspace(deps),
});

// documentManager api is available in lib/common/documentManager
export default createDocumentManager;
