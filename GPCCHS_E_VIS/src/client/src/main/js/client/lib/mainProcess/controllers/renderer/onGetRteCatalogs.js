import { getStore } from '../../store';
import { getRtd } from '../../../rtdManager';
import prepareDataToTree from '../../../rtdManager/prepareDataToTree';
import { add } from '../../../store/actions/messages';
import {
  setRteCatalogs,
} from '../../../store/actions/rte';


export default function ({ sessionId, domainId }) {
  const { dispatch } = getStore();

  const rtd = getRtd();
  rtd.getDatabase().getCatalogAndVersionListByDomain(sessionId, domainId, (err, catalogList) => {
    if (err) {
      dispatch(add('global', 'warning', err));
      return;
    }
    const catalogs = prepareDataToTree(catalogList);
    dispatch(setRteCatalogs(sessionId, domainId, catalogs));
  });
}
