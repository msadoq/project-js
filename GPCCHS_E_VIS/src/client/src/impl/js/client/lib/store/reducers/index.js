import { combineReducers } from 'redux';
import hss from './hss';
import hsc from './hsc';
import timebars from './timebars';
import timelines from './timelines';
import windows from './windows';
import pages from './pages';
import views from './views';
import domains from './domains';
import dataRequests from './dataRequests';
import viewData from './viewData';

const reducer = combineReducers({
  hss,
  hsc,
  timebars,
  timelines,
  windows,
  pages,
  views,
  domains,
  dataRequests,
  viewData,
});

export default reducer;
