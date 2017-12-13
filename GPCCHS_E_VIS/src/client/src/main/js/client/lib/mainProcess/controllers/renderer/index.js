// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 07/03/2017 : first draft on inspector: retrieve data from rtd on right-click
// VERSION : 1.1.2 : DM : #5822 : 16/03/2017 : resolve a rtd link in the inspector
// VERSION : 1.1.2 : DM : #5828 : 30/03/2017 : Add a F1 button in VIMA to open the docu wiki helper
// VERSION : 1.1.2 : DM : #5822 : 03/04/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move common/callback and common/ipc modules in client sub-component
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : activate links in views .
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 15/06/2017 : Ask to save before closing view or page
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Change windowProcess health management to dispatch a Redux action directly.
// VERSION : 1.1.2 : DM : #6785 : 29/06/2017 : Fix opening view link in a new page and read only path for link definition
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : First draft on catalog explorer
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : catalog explorer : open, close and browse items
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Remove unused onSavePage ipc renderer to mainProcess controllers
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Replace ipc openPage by askOpenPage redux action
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Clean old code in menuManager/IPC controller
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Fix common/fmd, disable Links feature for now
// VERSION : 1.1.2 : DM : #6700 : 20/07/2017 : Remove obsolete onServerDebug interface, ipcs and model
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean IPC about openInspector .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean IPC about FMD_GET/FMD_CREATE and RELOAD_SESSIONS/GET_SESSION_TIME
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean IPC about documents .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Remove serverDebug ipc . .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Clean IPC about opening wiki helper + create a store folder in mainProcess
// END-HISTORY
// ====================================================================

import constants from 'constants';

import handle from 'common/ipc/handle';
import reply from 'common/ipc/reply';

import onReduxCurrentState from './onReduxCurrentState';
import onReduxDispatch from './onReduxDispatch';
import onResolveLink from './onResolveLink';
import onResolveRteLink from './onResolveRteLink';
import onGetRteCatalogs from './onGetRteCatalogs';
import onGetRteItemNames from './onGetRteItemNames';
import onOpenRteItem from './onOpenRteItem';
import onFocusRteItem from './onFocusRteItem';
import onGetRteDomains from './onGetRteDomains';

const controller = {
  [constants.IPC_METHOD_REDUX_CURRENT_STATE]: (...args) => onReduxCurrentState(reply, ...args),
  [constants.IPC_METHOD_REDUX_DISPATCH]: onReduxDispatch,
  [constants.IPC_METHOD_RESOLVE_LINK]: onResolveLink,
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
