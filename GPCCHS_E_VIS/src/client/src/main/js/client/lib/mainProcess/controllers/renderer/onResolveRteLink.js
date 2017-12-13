// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : catalog explorer : open, close and browse items
// VERSION : 1.1.2 : FA : #7355 : 27/07/2017 : RTD is now optional on VIMA installation
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : DM : #6700 : 09/08/2017 : Fix onResolveRteLink mainProcess controller crash
// END-HISTORY
// ====================================================================

// import { parse as parseLink } from 'rtd/catalogs/utils/links';
import getLogger from 'common/logManager';
import { getStore } from 'mainProcess/store';
import { getRtd } from 'rtdManager';
import prepareDataToTree from 'rtdManager/prepareDataToTree';
import createItemKey from 'rtdManager/createItemKey';
import { add } from 'store/actions/messages';
import {
  openRteItem,
} from 'store/actions/rte';

const dynamicRequire = process.env.IS_BUNDLED === 'on' ? global.dynamicRequire : require; // eslint-disable-line

const logger = getLogger('main:controllers:renderer:onResolveLink');

export default function ({ link, sessionId, domainId }) {
  const parseLink = dynamicRequire('rtd/catalogs/utils/links').parse;
  const { dispatch } = getStore();
  logger.info(`resolve ${link} Link for session ${sessionId} and domain ${domainId}`);
  const { catalog, namespace, name } = parseLink(link);
  const rtd = getRtd();

  rtd.getDatabase().getCatalogAndVersionListByDomain(sessionId, domainId, (vErr, version) => {
    if (vErr || !version) {
      dispatch(add(
        'global',
        'warning',
        `${catalog} catalog was not found in domain ${domainId} for session ${sessionId}`
      ));
      return;
    }
    rtd.getCatalogByName(catalog, namespace, name, sessionId, domainId, (err, data) => {
      if (err || !data) {
        dispatch(add(
          'global',
          'warning',
          `${name} was not found in catalog ${catalog} in namespace ${namespace} for session ${sessionId} and domain ${domainId}`
        ));
        return;
      }
      const item = prepareDataToTree(data);
      const key = createItemKey(sessionId, domainId, catalog, namespace, name);
      dispatch(openRteItem(key, sessionId, domainId, catalog, version, namespace, name, item));
    });
  });
}
