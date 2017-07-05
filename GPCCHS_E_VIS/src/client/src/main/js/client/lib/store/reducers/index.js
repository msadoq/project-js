import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import hsc from './hsc';
import timebars from './timebars';
import timebarTimelines from './timebarTimelines';
import messages from './messages';
import modals from './modals';
import timelines from './timelines';
import windows from './windows';
import pages from './pages';
import views from './views';
import domains from './domains';
import sessions from './sessions';
import masterSession from './masterSession';
import health from './health';
import codeEditor from './codeEditor';
import inspector from './inspector';
import ui from './ui';
import rte from './rte';

import { configurationReducers, dataReducers } from '../../viewManager';

const rootReducer = combineReducers({
  form,
  hsc,
  timebars,
  timebarTimelines,
  messages,
  modals,
  timelines,
  windows,
  pages,
  views,
  domains,
  sessions,
  masterSession,
  health,
  codeEditor,
  inspector,
  ui,
  rte,
  ...configurationReducers,
  ...dataReducers,
});

export default rootReducer;
