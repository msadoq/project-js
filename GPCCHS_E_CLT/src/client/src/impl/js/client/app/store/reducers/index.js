import { combineReducers } from 'redux';
import hss from '../mutations/hssReducer';
import hsc from '../mutations/hscReducer';
import timebars from '../mutations/timebarReducer';
import timelines from '../mutations/timelineReducer';
import windows from '../mutations/windowReducer';
import pages from '../mutations/pageReducer';
import views from '../mutations/viewReducer';
import domains from '../mutations/domainsReducer';
import dataRequests from './dataRequests';
import dataCache from './dataCache';

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
  dataCache,
});

export default reducer;
