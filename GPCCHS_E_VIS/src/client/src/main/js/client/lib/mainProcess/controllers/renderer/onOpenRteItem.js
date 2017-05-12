import getLogger from 'common/log';
import { getStore } from '../../../store/mainStore';
import { getRtd } from '../../../rtdManager';
import prepareDataToTree from '../../../rtdManager/prepareDataToTree';
import { add } from '../../../store/actions/messages';
import {
  openRteItem,
} from '../../../store/actions/rte';

const logger = getLogger('main:controllers:renderer:onOpenRteItem');

export default function ({ sessionId, domainId, catalog, version, namespace, name, key }) {
  const { dispatch } = getStore();

  const rtd = getRtd();
  rtd.getCatalogByName(catalog, namespace, name, sessionId, domainId, (err, rawItem) => {
    if (err) {
      dispatch(add('global', 'warning', err));
      return;
    }
    const item = prepareDataToTree(rawItem);
    dispatch(openRteItem(key, sessionId, domainId, catalog, version, namespace, name, item));
  });
}
