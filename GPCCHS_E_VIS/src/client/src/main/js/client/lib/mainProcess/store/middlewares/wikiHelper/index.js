import _ from 'lodash/fp';
import * as types from '../../../../store/types';
import { add as addMessage } from '../../../../store/actions/messages';

const addGlobalWarning = msg => addMessage('global', 'warning', msg);
const addGlobalError = msg => addMessage('global', 'error', msg);

const isUrl = _.anyPass([
  _.startsWith('http://'),
  _.startsWith('https://'),
]);

export default (open, getUrl = _.noop) => ({ dispatch }) => next => (action) => {
  const nextAction = next(action);
  if (action.type === types.HSC_OPEN_WIKI_HELPER) {
    const url = getUrl();
    if (!url) {
      dispatch(addGlobalWarning('Wiki helper : no USER_MANUAL_URL provided'));
      return nextAction;
    }
    const fullUrl = isUrl(url) ? url : `http://${url}`;
    open(fullUrl, { app: 'firefox' })
    .catch((e) => {
      dispatch(addGlobalError(`Wiki helper : ${e.message}`));
    });
  }
  return nextAction;
};
