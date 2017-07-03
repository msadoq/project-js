import _ from 'lodash/fp';
import * as types from '../types';
import { addBlankPage } from '../../store/actions/pages';
import { getFocusedWindowId } from '../../store/reducers/hsc';
import { getWindowFocusedPageId } from '../../store/reducers/windows';
import { add as addMessage } from '../../store/actions/messages';

const createOpenLinkMiddleware = documentManager => store => next => (action) => {
  if (action.type !== types.WS_OPEN_LINK) {
    return next(action);
  }

  const { dispatch } = store;
  const isView = type => /^.*View$/.test(type);
  const isPage = _.equals('Page');
  documentManager.readDocumentType(action.payload, (err, type) => {
    if (err) {
      dispatch(addMessage('global', 'danger', err));
      return;
    }
    if (isView(type)) {
      dispatch(addBlankPage());
      const state = store.getState();
      const pageId = getWindowFocusedPageId(state, { windowId: getFocusedWindowId(state) });
      dispatch(documentManager.openView(action.payload, pageId));
    } else if (isPage(type)) {
      dispatch(documentManager.openPage(action.payload));
    } else {
      dispatch(addMessage('global', 'danger', `Error, unknown type '${type}'`));
    }
  });
  return action;
};


export default createOpenLinkMiddleware;
