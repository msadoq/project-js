import _ from 'lodash/fp';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import composeReducers from '../composeReducers';

import hsc from './hsc';
import timebars from './timebars';
import timebarTimelines from './timebarTimelines';
import messages from './messages';
import timelines from './timelines';
import windows from './windows';
import pages from './pages';
import views from './views';
import domains from './domains';
import sessions from './sessions';
import masterSession from './masterSession';
import viewData from './viewData';
import health from './health';
import editor from './editor';

import * as types from '../types';

const rootReducer = (state, action) => {
  switch (action.type) {
    case types.WS_PAGE_CLOSE: { // Remove views from closed page
      const { pageId } = action.payload;
      const viewIds = _.get(['pages', pageId, 'views'], state);
      const removeViews = _.update('views', _.omit(viewIds));
      return removeViews(state);
    }
    default:
      return state;
  }
};

const allReducer = combineReducers({
  form,
  hsc,
  timebars,
  timebarTimelines,
  messages,
  timelines,
  windows,
  pages,
  views,
  domains,
  sessions,
  masterSession,
  viewData,
  health,
  editor,
});

export default composeReducers(allReducer, rootReducer);
