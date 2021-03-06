// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Fix little bug in wikiHelper middleware
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import * as types from 'store/types';
import { add as addMessage } from 'store/actions/messages';

const addGlobalWarning = msg => addMessage('global', 'warning', msg);
const addGlobalError = msg => addMessage('global', 'error', msg);

const isUrl = _.anyPass([
  _.startsWith('http://'),
  _.startsWith('https://'),
]);

export default (open, getUrl = _.noop) => ({ dispatch }) => next => (action) => {
  if (action.type === types.HSC_OPEN_WIKI_HELPER) {
    const url = getUrl();
    if (!url) {
      dispatch(addGlobalWarning('Wiki helper : no USER_MANUAL_URL provided'));
      return next(action);
    }
    const fullUrl = isUrl(url) ? url : `http://${url}`;
    open(fullUrl, { app: 'firefox' })
    .catch((e) => {
      dispatch(addGlobalError(`Wiki helper : ${e.message}`));
    });
  }
  return next(action);
};
