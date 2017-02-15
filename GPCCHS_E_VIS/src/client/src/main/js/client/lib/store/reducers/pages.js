import __ from 'lodash/fp';

import * as types from '../types';
import page from './pages/page';

// Main pages reducer
const pages = (statePages = {}, action) => {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_PAGE_ADD:
      return __.set(action.payload.pageId, page(undefined, action), statePages);
    case types.WS_PAGE_REMOVE:
      return __.omit(action.payload.pageId, statePages);
    default: {
      const payload = action.payload || {};
      if (!payload.pageId || !statePages[payload.pageId]) {
        return statePages;
      }
      const currentPage = statePages[payload.pageId];
      return __.set(payload.pageId, page(currentPage, action), statePages);
    }
  }
};

export default pages;
