import _ from 'lodash/fp';
import open from 'opn';

import { getStore } from '../../store';
import { add as addMessage } from '../../../store/actions/messages';
import { get } from '../../../common/configurationManager';

const addGlobalWarning = msg => addMessage('global', 'warning', msg);
const addGlobalError = msg => addMessage('global', 'error', msg);

const isUrl = _.anypass([
  _.startsWith('http://'),
  _.startsWith('https://'),
]);

export default function () {
  const url = get('USER_MANUAL_URL');
  if (!url) {
    getStore().dispatch(addGlobalWarning('Wiki helper : no USER_MANUAL_URL provided'));
    return;
  }
  const fullUrl = isUrl(url) ? url : `http://${url}`;
  open(fullUrl).catch((e) => {
    getStore().dispatch(addGlobalError(`Wiki helper : ${e.message}`));
  });
}
