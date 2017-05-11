import rtd from 'rtd/catalogs';
import getLogger from 'common/log';
import parameters from 'common/parameters';
import { getStore } from '../../../store/mainStore';
import { add } from '../../../store/actions/messages';
import {
  setRteDomains,
} from '../../../store/actions/rte';

const logger = getLogger('main:controllers:renderer:onGetRteDomains');

export default function ({ sessionId }) {
  const { dispatch } = getStore();

  const socket = parameters.get('RTD_UNIX_SOCKET'); // TODO way to deal with that ?
  if (!socket) {
    dispatch(add('global', 'danger', 'No unix socket defined for the RTD'));
    return;
  }
  rtd.connect(socket, (cErr, isConnected) => {
    if (cErr || !isConnected) {
      dispatch(add('global', 'danger', 'Cannot connect to RTD'));
      return;
    }
    rtd.getDatabase().getDomainListBySession(sessionId, (err, domains) => {
      if (err) {
        dispatch(add('global', 'warning', err));
        return;
      }
      console.log('setRteDomains', sessionId, domains)
      dispatch(setRteDomains(sessionId, domains));
    });
  });
}
