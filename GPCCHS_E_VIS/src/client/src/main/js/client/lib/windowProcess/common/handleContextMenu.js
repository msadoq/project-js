import electron from 'electron';
import _isArray from 'lodash/isArray';

export default function handleContextMenu(menuItems) {
  if (_isArray(menuItems)) {
    const menu = electron.remote.Menu.buildFromTemplate(menuItems);
    menu.popup(electron.remote.getCurrentWindow());
    return;
  }
  const menu = electron.remote.Menu.buildFromTemplate([menuItems]);
  menu.popup(electron.remote.getCurrentWindow());
}
