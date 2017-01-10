import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import hss from './hss';
import hsc from './hsc';
import timebars from './timebars';
import messages from './messages';
import timelines from './timelines';
import windows from './windows';
import pages from './pages';
import views from './views/index';
import domains from './domains';
import sessions from './sessions';
import viewData from './viewData';

const reducer = combineReducers({
  form,
  hss,
  hsc,
  timebars,
  messages,
  timelines,
  windows,
  pages,
  views,
  domains,
  sessions,
  viewData,
});

export default reducer;
