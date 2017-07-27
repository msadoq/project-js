// import { LINK as RTD_LINK } from 'rtd/constants';
// import { parse as parseLink } from 'rtd/catalogs/utils/links';
import getLogger from '../../../common/logManager';
import { NODE_TYPE_RESOLVED_LINK as RESOLVED_LINK } from '../../../constants';
import { getStore } from '../../store';
import { getRtd } from '../../../rtdManager';
import prepareDataToTree from '../../../rtdManager/prepareDataToTree';
import { add } from '../../../store/actions/messages';
import {
  isInspectorStaticDataNodeLoading,
  updateInspectorStaticDataNode,
} from '../../../store/actions/inspector';

const dynamicRequire = process.env.IS_BUNDLED === 'on' ? global.dynamicRequire : require; // eslint-disable-line

const logger = getLogger('main:controllers:renderer:onResolveLink');

export default function ({ link, path, sessionId, domainId }) {
  const RTD_LINK = dynamicRequire('rtd/constants').LINK;
  const parseLink = dynamicRequire('rtd/catalogs/utils/links').parse;
  const { dispatch } = getStore();
  logger.info(`resolve ${link} Link for session ${sessionId} and domain ${domainId}`);
  const { catalog, namespace, name } = parseLink(link);
  const rtd = getRtd();

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
}
