import { v4 } from 'uuid';
import openWikiHelper from '../controllers/renderer/onOpenWikiHelper';
import { getStore } from '../../store/mainStore';
import { getWindowFocusedPageId, getDisplayHelp } from '../../store/reducers/windows';
import { getPanels } from '../../store/reducers/pages';
import { addWindow, displayHelp } from '../../store/actions/windows';
import { open as openModal } from '../../store/actions/modals';
import { minimizeEditor, minimizeExplorer, collapseTimebar } from '../../store/actions/pages';
import { viewOpen, viewAddBlank } from './viewOpen';
import { pageOpen, pageAddBlank } from './pageOpen';
import { pageSave, pageSaveAs } from './pageSave';
import { workspaceSave, workspaceSaveAs } from './workspaceSave';
import { workspaceOpenNew, workspaceOpen } from './workspaceOpen';
import { getAvailableViews } from '../../viewManager';

const { Menu } = require('electron');

const workspace = {
  label: 'Workspace',
  submenu: [{
    label: 'New...',
    accelerator: 'CmdOrCtrl+N',
    click(item, focusedWindow) {
      workspaceOpenNew(focusedWindow);
    },
  }, {
    label: 'Open...',
    accelerator: 'CmdOrCtrl+O',
    click(item, focusedWindow) {
      workspaceOpen(focusedWindow);
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
      workspaceSave(focusedWindow);
    },
  }, {
    label: 'Save as...',
    accelerator: 'CmdOrCtrl+Shift+S',
    click: (item, focusedWindow) => {
      workspaceSaveAs(focusedWindow);
    },
  }, {
    label: 'Quit',
    role: 'quit',
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
    click(item, focusedWindow) {
      pageOpen(focusedWindow);
    },
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
    click(item, focusedWindow) {
      pageSave(focusedWindow);
    },
  }, {
    label: 'Save As...',
    click(item, focusedWindow) {
      pageSaveAs(focusedWindow);
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
      click(item, focusedWindow) {
        viewOpen(focusedWindow);
      },
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
          dispatch(collapseTimebar(pageId, !panels.timebarCollapsed));
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
      click: openWikiHelper,
    },
  ],
};

export default () => Menu.setApplicationMenu(
  Menu.buildFromTemplate([workspace, window, page, view, panel, edit])
);
