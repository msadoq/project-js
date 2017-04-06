import { get } from 'common/parameters';
import { shell } from 'electron';

export default function () {
  const url = get('USER_MANUAL_URL');
  if (!url) {
    return;
  }

  shell.openExternal(get('USER_MANUAL_URL'));
}
