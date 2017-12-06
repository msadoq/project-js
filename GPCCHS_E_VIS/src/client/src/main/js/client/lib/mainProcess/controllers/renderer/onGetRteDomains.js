import { getStore } from 'mainProcess/store';
import { add } from 'store/actions/messages';
import { getRtd } from 'rtdManager';
import {
  setRteDomains,
} from 'store/actions/rte';


export default function ({ sessionId }) {
  const { dispatch } = getStore();

  const rtd = getRtd();
  rtd.getDatabase().getDomainListBySession(sessionId, (err, domains) => {
    if (err) {
      dispatch(add('global', 'warning', err));
      return;
    }
    dispatch(setRteDomains(sessionId, domains));
  });
}
