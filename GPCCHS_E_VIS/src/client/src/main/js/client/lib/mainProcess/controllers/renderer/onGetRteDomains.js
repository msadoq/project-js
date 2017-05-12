import getLogger from 'common/log';
import { getStore } from '../../../store/mainStore';
import { add } from '../../../store/actions/messages';
import { getRtd } from '../../../rtdManager';
import {
  setRteDomains,
} from '../../../store/actions/rte';

const logger = getLogger('main:controllers:renderer:onGetRteDomains');

export default function ({ sessionId }) {
  const { dispatch } = getStore();

  const rtd = getRtd();
  rtd.getDatabase().getDomainListBySession(sessionId, (err, domains) => {
    if (err) {
      dispatch(add('global', 'warning', err));
      return;
    }
    console.log('setRteDomains', sessionId, domains)
    dispatch(setRteDomains(sessionId, domains));
  });
}
