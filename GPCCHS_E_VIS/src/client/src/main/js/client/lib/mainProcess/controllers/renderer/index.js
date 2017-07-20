import constants from '../../../constants';

import handle from '../../../common/ipc/handle';
import reply from '../../../common/ipc/reply';

import onReduxCurrentState from './onReduxCurrentState';
import onReduxDispatch from './onReduxDispatch';
import onGetSessionTime from './onGetSessionTime';
import onReloadSessions from './onReloadSessions';
import onOpenView from './onOpenView';
import onOpenInspector from './onOpenInspector';
import onResolveLink from './onResolveLink';
import onOpenWikiHelper from './onOpenWikiHelper';
import onGetRteDomains from './onGetRteDomains';
import onGetRteCatalogs from './onGetRteCatalogs';
import onGetRteItemNames from './onGetRteItemNames';
import onOpenRteItem from './onOpenRteItem';
import onFocusRteItem from './onFocusRteItem';
import onResolveRteLink from './onResolveRteLink';

const controller = {
  [constants.IPC_METHOD_REDUX_CURRENT_STATE]: (...args) => onReduxCurrentState(reply, ...args),
  [constants.IPC_METHOD_REDUX_DISPATCH]: onReduxDispatch,
  [constants.IPC_METHOD_SESSION_TIME]: onGetSessionTime,
  [constants.IPC_METHOD_RELOAD_SESSIONS]: onReloadSessions,
  [constants.IPC_METHOD_OPEN_VIEW]: onOpenView,
  [constants.IPC_METHOD_OPEN_INSPECTOR]: onOpenInspector,
  [constants.IPC_METHOD_RESOLVE_LINK]: onResolveLink,
  [constants.IPC_METHOD_WIKI_HELPER]: onOpenWikiHelper,
  [constants.IPC_METHOD_GET_RTE_DOMAINS]: onGetRteDomains,
  [constants.IPC_METHOD_GET_RTE_CATALOGS]: onGetRteCatalogs,
  [constants.IPC_METHOD_GET_RTE_ITEM_NAMES]: onGetRteItemNames,
  [constants.IPC_METHOD_OPEN_RTE_ITEM]: onOpenRteItem,
  [constants.IPC_METHOD_FOCUS_RTE_ITEM]: onFocusRteItem,
  [constants.IPC_METHOD_RESOLVE_RTE_LINK]: onResolveRteLink,
};

export default (electronEvent, data) => handle(
  controller,
  data,
  response => electronEvent.sender.send('global', response)
);
