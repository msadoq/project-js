import { get } from 'common/parameters';
import open from 'open';

export default function () {
  open(get('USER_MANUAL_URL'));
}
