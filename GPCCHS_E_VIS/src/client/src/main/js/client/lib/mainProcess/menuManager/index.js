// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 22/02/2017 : Rename menu in menuManager and move menu.js into menuManager/index.js
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : MenuManager use now viewManager to generate view menu
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Fix crash when add new window
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Remove add/_add/addAndMount thunks . .
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Control help, explorer and timebar from electron menu
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Fix electron menu items labels
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPanels selectors in reducers folder
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move all windows simple selectors in store/reducers/windows
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Add editor shortcut and menu entry in toolbar
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Add editor shortcut and menu entry in toolbar
// VERSION : 1.1.2 : DM : #5828 : 30/03/2017 : Add a F1 button in VIMA to open the docu wiki helper
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : minimize and keep old size for explorer and editor
// VERSION : 1.1.2 : DM : #5828 : 24/04/2017 : Edit window title available through upper menu Window -> Rename.
// VERSION : 1.1.2 : DM : #5828 : 26/04/2017 : Page title edition is accessible through the upper menu.
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Implement a new "isomorphic" createStore to centralize Redux configuration
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add possibility to modify domainName and sessionName from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add possibility to modify domainName and sessionName from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #5828 : 16/05/2017 : Cleanup Redux store configuration and introduce three distinct store enhancers for future store synchronisation implementation.
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 15/06/2017 : Ask to save before closing view or page
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 15/06/2017 : Ask to save before closing a workspace
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add basic documents redux middleware, support page opening only
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Rewrite all saving page code
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Rename WS_ASK_PAGE in WS_ASK_OPEN_PAGE action
// VERSION : 1.1.2 : FA : #7199 : 06/07/2017 : Fix timebar toggle bug (caused crash)
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Fix mechansim for open/save/close workspace
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Ask open workspace at start in mainProcess/index
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Add workspace middleware => TODO : onWsClose
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : On open view middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Remove pageOpen and pageSave in menuManager, add pageAddBlank
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean menuManager . . .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Clean IPC about opening wiki helper + create a store folder in mainProcess
// VERSION : 1.1.2 : FA : #7774 : 19/09/2017 : A blank workspace can be opened without pages
// END-HISTORY
// ====================================================================

import { v4 } from 'uuid';
import { getAvailableViews } from 'viewManager';
import { getWindowFocusedPageId, getDisplayHelp } from 'store/reducers/windows';
import { getPanels } from 'store/reducers/pages';
import { addWindow, displayHelp } from 'store/actions/windows';
import { openWikiHelper } from 'store/actions/ui';
import { open as openModal } from 'store/actions/modals';
import { getFocusedPageId } from 'store/selectors/pages';
import { askSaveWorkspace, askOpenWorkspace, askCloseWorkspace } from 'store/actions/hsc';
import { askOpenView } from 'store/actions/views';
import { minimizeEditor, minimizeExplorer, minimizeTimebar, askOpenPage, askSavePage } from 'store/actions/pages';
import viewAddBlank from './viewAddBlank';

import pageAddBlank from './pageAddBlank';
import { getStore } from '../store';

const { Menu } = require('electron');

const workspace = {
  label: 'Workspace',
  submenu: [{
    label: 'New...',
    accelerator: 'CmdOrCtrl+N',
    click(item, focusedWindow) {
      getStore().dispatch(askOpenWorkspace(focusedWindow.windowId, null, true, false));
    },
  }, {
    label: 'Open...',
    accelerator: 'CmdOrCtrl+O',
    click(item, focusedWindow) {
      getStore().dispatch(askOpenWorkspace(focusedWindow.windowId, null, false, false));
    },
  }, {
    label: 'Edit...',
    click(item, focusedWindow) {
      if (focusedWindow && focusedWindow.windowId) {
        getStore().dispatch(
          openModal(
            focusedWindow.windowId,
            { type: 'editWorkspace' }
          )
        );
      }
    },
  }, {
    label: 'Save',
    accelerator: 'CmdOrCtrl+S',
    click: (item, focusedWindow) => {
      getStore().dispatch(askSaveWorkspace(focusedWindow.windowId));
    },
  }, {
    label: 'Save as...',
    accelerator: 'CmdOrCtrl+Shift+S',
    click: (item, focusedWindow) => {
      getStore().dispatch(askSaveWorkspace(focusedWindow.windowId, true));
    },
  }, {
    label: 'Quit',
    click: (item, focusedWindow) => {
      getStore().dispatch(askCloseWorkspace(focusedWindow.windowId));
    },
  }],
};

const window = {
  label: 'Window',
  submenu: [
    {
      label: 'New',
      click() { getStore().dispatch(addWindow(v4(), 'New window')); },
    },
    {
      label: 'Edit...',
      click(item, focusedWindow) {
        if (focusedWindow && focusedWindow.windowId) {
          getStore().dispatch(
            openModal(
              focusedWindow.windowId,
              {
                type: 'editWindow',
                windowId: focusedWindow.windowId,
              }
            )
          );
        }
      },
    },
    { type: 'separator' },
    { label: 'Minimize', role: 'minimize' },
    { label: 'Close', role: 'close' }],
};

const page = {
  label: 'Page',
  submenu: [{
    label: 'New...',
    click(item, focusedWindow) {
      pageAddBlank(focusedWindow);
    },
  }, {
    label: 'Open...',
    click: (item, focusedWindow) => getStore().dispatch(askOpenPage(focusedWindow.windowId)),
  }, {
    label: 'Edit...',
    click(item, focusedWindow) {
      if (focusedWindow && focusedWindow.windowId) {
        const {
          getState,
          dispatch,
        } = getStore();
        const state = getState();
        dispatch(
          openModal(
            focusedWindow.windowId,
            {
              type: 'editPage',
              pageUuid: getWindowFocusedPageId(state, { windowId: focusedWindow.windowId }),
            }
          )
        );
      }
    },
  }, {
    label: 'Save',
    click(item, { windowId }) {
      const { getState, dispatch } = getStore();
      const pageId = getFocusedPageId(getState(), { windowId });
      dispatch(askSavePage(pageId));
    },
  }, {
    label: 'Save As...',
    click(item, { windowId }) {
      const { getState, dispatch } = getStore();
      const pageId = getFocusedPageId(getState(), { windowId });
      dispatch(askSavePage(pageId, true));
    },
  }],
};

const specificViewsMenu = getAvailableViews().map(viewType => ({
  label: `Add ${viewType}...`,
  accelerator: '',
  click: (item, focusedWindow) => viewAddBlank(viewType, focusedWindow),
}));

const view = {
  label: 'View',
  submenu: [
    ...specificViewsMenu,
    {
      label: 'Open...',
      accelerator: '',
      click: () => getStore().dispatch(askOpenView()),
    },
  ],
};

const panel = {
  label: 'Panel',
  submenu: [
    {
      label: 'Toggle Editor',
      accelerator: 'CmdOrCtrl+Shift+E',
      click(item, focusedWindow) {
        if (focusedWindow && focusedWindow.windowId) {
          const { getState, dispatch } = getStore();
          const { windowId } = focusedWindow;
          const pageId = getWindowFocusedPageId(getState(), { windowId });
          const panels = getPanels(getState(), { pageId });
          dispatch(minimizeEditor(pageId, !panels.editorIsMinimized));
        }
      },
    },
    {
      label: 'Toggle Explorer',
      accelerator: 'CmdOrCtrl+E',
      click(item, focusedWindow) {
        if (focusedWindow && focusedWindow.windowId) {
          const { getState, dispatch } = getStore();
          const { windowId } = focusedWindow;
          const pageId = getWindowFocusedPageId(getState(), { windowId });
          const panels = getPanels(getState(), { pageId });
          dispatch(minimizeExplorer(pageId, !panels.explorerIsMinimized));
        }
      },
    },
    {
      label: 'Toggle Timebar',
      accelerator: 'CmdOrCtrl+T',
      click(item, focusedWindow) {
        if (focusedWindow && focusedWindow.windowId) {
          const { getState, dispatch } = getStore();
          const { windowId } = focusedWindow;
          const pageId = getWindowFocusedPageId(getState(), { windowId });
          const panels = getPanels(getState(), { pageId });
          dispatch(minimizeTimebar(pageId, !panels.timebarIsMinimized));
        }
      },
    },
  ],
};

const edit = {
  label: 'Edit',
  submenu: [
    { role: 'undo' },
    { role: 'redo' },
    { type: 'separator' },
    { role: 'cut' },
    { role: 'copy' },
    { role: 'paste' },
    { role: 'pasteandmatchstyle' },
    { role: 'delete' },
    { role: 'selectall' },
    { type: 'separator' },
    {
      label: 'Reload',
      accelerator: 'CmdOrCtrl+Shift+R',
      click(item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.reload();
        }
      },
    },
    { type: 'separator' },
    {
      label: 'Toggle Developer Tools',
      accelerator: 'CmdOrCtrl+Shift+I',
      click(item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.webContents.toggleDevTools();
        }
      },
    },
    { label: 'Actual Size', role: 'resetzoom' },
    { label: 'Zoom In', role: 'zoomin' },
    { label: 'Zoom Out', role: 'zoomout' },
    { type: 'separator' },
    { label: 'Toggle Full Screen', role: 'togglefullscreen' },
    { type: 'separator' },
    {
      label: 'Help',
      accelerator: 'CmdOrCtrl+H',
      click(item, focusedWindow) {
        if (focusedWindow && focusedWindow.windowId) {
          const { getState, dispatch } = getStore();
          const { windowId } = focusedWindow;
          const isHelpDisplayed = getDisplayHelp(getState(), { windowId });
          dispatch(displayHelp(windowId, !isHelpDisplayed));
        }
      },
    },
    {
      label: 'Wiki',
      accelerator: 'F1',
      click: () => getStore().dispatch(openWikiHelper()),
    },
  ],
};

export default () => Menu.setApplicationMenu(
  Menu.buildFromTemplate([workspace, window, page, view, panel, edit])
);
