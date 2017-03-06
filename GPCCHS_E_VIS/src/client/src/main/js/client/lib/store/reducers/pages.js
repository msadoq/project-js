import _ from 'lodash/fp';

import * as types from '../types';
import page from './pages/page';

// Main pages reducer
const pages = (statePages = {}, action) => {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_PAGE_ADD:
      return _.set(action.payload.pageId, page(undefined, action), statePages);
    case types.WS_PAGE_REMOVE:
      return _.omit(action.payload.pageId, statePages);
    case types.WS_LOAD_DOCUMENTS: {
      const { documents } = action.payload;
      if (_.isEmpty(documents.pages) && !_.isEmpty(documents.views)) {
        return _.mapValues(p => page(p, action), statePages);
      }
      const setPayloadPage = _.set('payload.page');
      const singlePageReducer = statePage => page(undefined, setPayloadPage(statePage, action));
      return _.compose(
        _.defaults(statePages),          // 3. merge with old statePages
        _.indexBy('uuid'),               // 2. index pages array by uuid
        _.map(singlePageReducer)         // 1. apply single page reducer on all pages
      )(documents.pages);
    }
    default: {
      if (
        action.payload &&
        action.payload.pageId &&
        statePages[action.payload.pageId]
      ) {
        const currentPage = statePages[action.payload.pageId];
        return _.set(action.payload.pageId, page(currentPage, action), statePages);
      }
      return statePages;
    }
  }
};

export default pages;
