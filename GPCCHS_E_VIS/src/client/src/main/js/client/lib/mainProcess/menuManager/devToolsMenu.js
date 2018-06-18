import { Menu } from 'electron';

/**
 * instanciates a new devTools menu, enabling to access dev tools and reload the window.
 * @returns a new Menu
 */
export default function getDevToolsMenu() {
  const devTools = {
    label: 'Dev tools',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+Shift+R',
        click(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.reload();
          }
        },
      },
      {
        label: 'Toggle Developer Tools',
        accelerator:
          'CmdOrCtrl+Shift+I',
        click(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.webContents.toggleDevTools();
          }
        }
        ,
      }],
  };

  return Menu.buildFromTemplate([devTools]);
}
