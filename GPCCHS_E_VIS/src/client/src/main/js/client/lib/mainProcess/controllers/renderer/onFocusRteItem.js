import asyncParallel from 'async/parallel';
import { getStore } from 'mainProcess/store';
import _reduce from 'lodash/reduce';
import _set from 'lodash/set';
import _indexOf from 'lodash/indexOf';
import {
  setRteCatalogs,
  setRteDomains,
  setRteItemNames,
  setRteFocusedItem,
} from 'store/actions/rte';
import { getRtd } from 'rtdManager';
import prepareDataToTree from 'rtdManager/prepareDataToTree';
import { add } from 'store/actions/messages';
import {
  getRteFocusedInfo,
} from 'store/reducers/rte';
import asyncMap from 'async/map';

export default function ({ sessionId, domainId, catalog, version, namespace, name, key }) {
  const { getState, dispatch } = getStore();

  const state = getState();
  const focusedInfo = getRteFocusedInfo(state);

  const rtd = getRtd();
  const requests = [];

  if (sessionId !== focusedInfo.session) {
    // focus domain, request catalogs
    requests.push((callback) => {
      rtd.getDatabase().getDomainListBySession(sessionId, (err, domains) => {
        if (err) {
          callback(err);
          return;
        }
        dispatch(setRteDomains(sessionId, domains));
        callback(null);
      });
    });
  }
  if (domainId !== focusedInfo.domain) {
    // focus session, request domains
    requests.push((callback) => {
      rtd.getDatabase().getCatalogAndVersionListByDomain(
        sessionId, domainId, (err, catalogList) => {
          if (err) {
            callback(err);
            return;
          }
          const catalogs = prepareDataToTree(catalogList);
          const catalogIdx = _indexOf(Object.keys(catalogList), catalog);
          _set(catalogs, ['children', catalogIdx, 'toggled'], true);
          _set(catalogs, ['children', catalogIdx, 'active'], true);
          dispatch(setRteCatalogs(sessionId, domainId, catalogs));
          callback(null);
        }
      );
    });
  }
  if (catalog !== focusedInfo.catalog || version !== focusedInfo.version ||
      namespace !== focusedInfo.namespace || name !== focusedInfo.name) {
    // focus catalog, request items
    requests.push((callback) => {
      rtd.getDatabase().getNamespaceList(catalog, version, (err, namespaceList) => {
        if (err) {
          callback(err);
          return;
        }
        asyncMap(namespaceList, (ns, done) => {
          rtd.getDatabase().getItemList(catalog, version, ns, (iErr, itemList) => {
            if (iErr) {
              done(iErr);
              return;
            }
            done(null, { ns, itemList });
          });
        }, (aErr, res) => {
          if (aErr) {
            callback(aErr);
            return;
          }
          const itemMap = _reduce(res, (previous, value) => {
            if (!value) {
              return previous;
            }
            const item = Object.assign({}, previous, {
              [value.ns]: value.itemList,
            });
            return item;
          }, {});
          const items = prepareDataToTree(itemMap);
          const namespaceIdx = _indexOf(Object.keys(itemMap), namespace);
          const nameIdx = _indexOf(itemMap[namespace], name);
          _set(items, ['children', namespaceIdx, 'toggled'], true);
          _set(items, ['children', namespaceIdx, 'children', nameIdx, 'active'], true);
          dispatch(setRteItemNames(catalog, version, items));
          callback(null);
        });
      });
    });
  }

  asyncParallel(requests, (err) => {
    if (err) {
      dispatch(add('global', 'warning', err));
      return;
    }
    dispatch(setRteFocusedItem(key, sessionId, domainId, catalog, version, namespace, name));
  });
}
