import { shell } from 'electron';
import { get } from '../../../common/configurationManager';

export default function () {
  const url = get('USER_MANUAL_URL');
  if (!url) {
    return;
  }

  shell.openExternal(get('USER_MANUAL_URL'));
}
