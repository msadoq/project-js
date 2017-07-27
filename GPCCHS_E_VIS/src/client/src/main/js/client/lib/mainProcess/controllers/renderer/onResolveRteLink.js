// import { parse as parseLink } from 'rtd/catalogs/utils/links';
import getLogger from '../../../common/logManager';
import { getStore } from '../../store';
import { getRtd } from '../../../rtdManager';
import prepareDataToTree from '../../../rtdManager/prepareDataToTree';
import createItemKey from '../../../rtdManager/createItemKey';
import { add } from '../../../store/actions/messages';
import {
  openRteItem,
} from '../../../store/actions/rte';

const dynamicRequire = process.env.IS_BUNDLED === 'on' ? global.dynamicRequire : require; // eslint-disable-line

const logger = getLogger('main:controllers:renderer:onResolveLink');

export default function ({ link, sessionId, domainId }) {
  const parseLink = dynamicRequire('rtd/catalogs/utils/links').parse;
  const { dispatch } = getStore();
  logger.info(`resolve ${link} Link for session ${sessionId} and domain ${domainId}`);
  const { catalog, namespace, name } = parseLink(link);
  const rtd = getRtd();

  rtd.getDatabase().getVersionByDomain(catalog, sessionId, domainId, (vErr, version) => {
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
