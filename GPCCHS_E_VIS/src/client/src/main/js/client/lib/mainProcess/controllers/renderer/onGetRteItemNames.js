import asyncMap from 'async/map';
import _reduce from 'lodash/reduce';
import { getStore } from '../../store';
import { getRtd } from '../../../rtdManager';
import prepareDataToTree from '../../../rtdManager/prepareDataToTree';
import { add } from '../../../store/actions/messages';
import {
  setRteItemNames,
} from '../../../store/actions/rte';


export default function ({ catalog, version }) {
  const { dispatch } = getStore();

  const rtd = getRtd();
  rtd.getDatabase().getNamespaceList(catalog, version, (err, namespaceList) => {
    if (err) {
      dispatch(add('global', 'warning', err));
      return;
    }

    asyncMap(namespaceList, (namespace, done) => {
      rtd.getDatabase().getItemList(catalog, version, namespace, (iErr, itemList) => {
        if (iErr) {
          done(iErr);
          return;
        }
        done(null, { namespace, itemList });
      });
    }, (aErr, res) => {
      if (aErr) {
        dispatch(add('global', 'warning', err));
        return;
      }
      const itemMap = _reduce(res, (previous, value) => {
        if (!value) {
          return previous;
        }
        const item = Object.assign({}, previous, {
          [value.namespace]: value.itemList,
        });
        return item;
      }, {});
      const items = prepareDataToTree(itemMap);
      dispatch(setRteItemNames(catalog, version, items));
    });
  });
}
