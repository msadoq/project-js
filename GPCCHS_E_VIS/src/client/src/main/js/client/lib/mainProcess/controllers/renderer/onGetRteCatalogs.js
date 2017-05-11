import rtd from 'rtd/catalogs';
import getLogger from 'common/log';
import parameters from 'common/parameters';
import { getStore } from '../../../store/mainStore';
import prepareDataToTree from '../../../rtdManager/prepareDataToTree';
import { add } from '../../../store/actions/messages';
import {
  setRteCatalogs,
} from '../../../store/actions/rte';

const logger = getLogger('main:controllers:renderer:onGetRteCatalogs');

export default function ({ sessionId, domainId }) {
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
    rtd.getDatabase().getCatalogAndVersionListByDomain(sessionId, domainId, (err, catalogList) => {
      if (err) {
        dispatch(add('global', 'warning', err));
        return;
      }
      const catalogs = prepareDataToTree(catalogList);
      dispatch(setRteCatalogs(sessionId, domainId, catalogs));
    });
  });
}
