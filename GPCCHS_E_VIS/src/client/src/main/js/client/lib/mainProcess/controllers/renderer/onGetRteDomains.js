// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : update catalog explorer controllers with new rtd
//  connection
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : catalog explorer : open, close and browse items
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : First draft on catalog explorer
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

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
