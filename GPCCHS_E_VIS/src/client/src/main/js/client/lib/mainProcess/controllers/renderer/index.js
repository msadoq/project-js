import handle from 'common/ipc/handle';
import globalConstants from 'common/constants';

import onGetSessionTime from './onGetSessionTime';
import onReloadSessions from './onReloadSessions';
import onReloadView from './onReloadView';
import onSaveView from './onSaveView';
import onCreateModel from './onCreateModel';
import onServerDebug from './onServerDebug';
import onOpenView from './onOpenView';
import onOpenPage from './onOpenPage';
import onOpenWorkspace from './onOpenWorkspace';
import onHealthStatus from './onHealthStatus';
import onOpenInspector from './onOpenInspector';
import onResolveLink from './onResolveLink';

const controller = {
  [globalConstants.IPC_METHOD_SESSION_TIME]: onGetSessionTime,
  [globalConstants.IPC_METHOD_RELOAD_SESSIONS]: onReloadSessions,
  [globalConstants.IPC_METHOD_RELOAD_VIEW]: onReloadView,
  [globalConstants.IPC_METHOD_SAVE_VIEW]: onSaveView,
  [globalConstants.IPC_METHOD_CREATE_MODEL]: onCreateModel,
  [globalConstants.IPC_METHOD_SERVER_DEBUG]: onServerDebug,
  [globalConstants.IPC_METHOD_OPEN_VIEW]: onOpenView,
  [globalConstants.IPC_METHOD_OPEN_PAGE]: onOpenPage,
  [globalConstants.IPC_METHOD_OPEN_WORKSPACE]: onOpenWorkspace,
  [globalConstants.IPC_METHOD_HEALTH_STATUS]: onHealthStatus,
  [globalConstants.IPC_METHOD_OPEN_INSPECTOR]: onOpenInspector,
  [globalConstants.IPC_METHOD_RESOLVE_LINK]: onResolveLink,
};

export default (electronEvent, data) => handle(
  controller,
  data,
  response => electronEvent.sender.send('global', response)
);
