import { combineReducers } from 'redux';
import hss from './hssReducer';
import hsc from './hscReducer';
import timebars from './timebarReducer';
import timelines from './timelineReducer';
import windows from './windowReducer';
import pages from './pageReducer';
import views from './viewReducer';
import connectedData from './connectedDataReducer';
import domains from './domainsReducer';

const reducer = combineReducers({
  hss,
  hsc,
  timebars,
  timelines,
  windows,
  pages,
  views,
  connectedData,
  domains,
});

export default reducer;
