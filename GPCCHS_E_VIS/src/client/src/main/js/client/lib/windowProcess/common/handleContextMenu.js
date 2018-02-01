// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5822 : 22/03/2017 : change context menus with native electron context menu
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : add context menu on views
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import electron from 'electron';

export default function handleContextMenu(menuItems, cb = _.noop) {
  const hasCallback = cb !== _.noop;
  const items = _.isArray(menuItems) ? menuItems : [menuItems];
  const options = { async: !hasCallback };
  const wait = f => (hasCallback ? setTimeout(f, 50) : f());
  const menu = electron.remote.Menu.buildFromTemplate(items);

  wait(() => {
    menu.popup(electron.remote.getCurrentWindow(), options);
    if (cb) {
      cb();
    }
  });
}
