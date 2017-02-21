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
      if (
        action.payload &&
        action.payload.pageId &&
        statePages[action.payload.pageId]
      ) {
        const currentPage = statePages[action.payload.pageId];
        return __.set(action.payload.pageId, page(currentPage, action), statePages);
      }
      return statePages;
    }
  }
};

export default pages;
