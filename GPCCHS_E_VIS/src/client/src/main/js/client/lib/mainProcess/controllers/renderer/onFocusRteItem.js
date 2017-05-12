import getLogger from 'common/log';
import parameters from 'common/parameters';
import { getStore } from '../../../store/mainStore';
import { getRtd } from '../../../rtdManager';
import prepareDataToTree from '../../../rtdManager/prepareDataToTree';
import { add } from '../../../store/actions/messages';
import {
  openRteItem,
} from '../../../store/actions/rte';
import {
  getRteFocusedItem,
} from '../../../store/reducers/rte';

const logger = getLogger('main:controllers:renderer:onOpenRteItem');

export default function ({ sessionId, domainId, catalog, version, namespace, name, key }) {
  const { getState, dispatch } = getStore();

  const state = getState();
  const focusedItem = getRteFocusedItem(state);

  const rtd = getRtd();

  if (sessionId !== focusedItem.session) {
    // focus session, request domains, focus domain, request catalogs, focus catalog, request items, focus item
  }
  if (domainId !== focusedItem.domain) {
    // focus domain, request catalogs, focus catalog, request items, focus item
  }
  if (catalog !== focusedItem.catalog || version !== focusedItem.version) {
    // focus catalog, request items, focus item
  }
  if (namespace !== focusedItem.namespace || name !== focusedItem.name) {
    // focus item
  }
}
