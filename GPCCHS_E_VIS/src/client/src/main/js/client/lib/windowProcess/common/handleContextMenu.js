import electron from 'electron';

export default function (menuItems) {
  const menu = electron.remote.Menu.buildFromTemplate([menuItems]);
  menu.popup(electron.remote.getCurrentWindow());
}
