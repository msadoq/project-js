// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5822 : 16/03/2017 : resolve a rtd link in the inspector
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : add buttons to collapse and expand inspector static data
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Implement a new "isomorphic" createStore to centralize Redux configuration
// VERSION : 1.1.2 : DM : #5828 : 11/05/2017 : remove use of sinon for rtd stub
// VERSION : 1.1.2 : DM : #5828 : 11/05/2017 : Merge branch 'dev' into dbrugne-universal-store
// VERSION : 1.1.2 : DM : #5828 : 16/05/2017 : Cleanup Redux store configuration and introduce three distinct store enhancers for future store synchronisation implementation.
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : FA : #7355 : 27/07/2017 : RTD is now optional on VIMA installation
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

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
