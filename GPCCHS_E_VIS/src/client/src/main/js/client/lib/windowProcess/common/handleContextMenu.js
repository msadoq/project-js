// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5822 : 22/03/2017 : change context menus with native electron context menu
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : add context menu on views
// END-HISTORY
// ====================================================================

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
