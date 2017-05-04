import rtd from 'rtd/catalogs';
import { LINK as RTD_LINK } from 'rtd/constants';
import getLogger from 'common/log';
import parameters from 'common/parameters';
import { NODE_TYPE_RESOLVED_LINK as RESOLVED_LINK } from 'common/constants';
import { parse as parseLink } from 'rtd/catalogs/utils/links';
import { getStore } from '../../../store/isomorphic';
import prepareDataToTree from '../../../rtdManager/prepareDataToTree';
import { add } from '../../../store/actions/messages';
import {
  isInspectorStaticDataNodeLoading,
  updateInspectorStaticDataNode,
} from '../../../store/actions/inspector';

const logger = getLogger('main:controllers:renderer:onResolveLink');

export default function ({ link, path, sessionId, domainId }) {
  const { dispatch } = getStore();
  logger.info(`resolve ${link} Link for session ${sessionId} and domain ${domainId}`);
  const socket = parameters.get('RTD_UNIX_SOCKET'); // TODO way to deal with that ?
  rtd.connect(socket, (cErr, isConnected) => {
    if (cErr || !isConnected) {
      dispatch(add('global', 'danger', 'Cannot connect to RTD'));
      return;
    }

    const { catalog, namespace, name } = parseLink(link);

    rtd.getCatalogByName(catalog, namespace, name, sessionId, domainId, (err, data) => {
      if (err || !data) {
        dispatch(isInspectorStaticDataNodeLoading(path, false));
        dispatch(add(
          'global',
          'warning',
          `${name} was not found in catalog ${catalog} in namespace ${namespace} for session ${sessionId} and domain ${domainId}`
        ));
        return;
      }
      const staticData = prepareDataToTree(data, { rootName: RTD_LINK, path, type: RESOLVED_LINK });
      dispatch(updateInspectorStaticDataNode(path, staticData));
    });
  });
}
