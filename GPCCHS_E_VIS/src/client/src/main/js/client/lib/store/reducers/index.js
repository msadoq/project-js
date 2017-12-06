import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { configurationReducers, dataReducers, uiReducers } from 'viewManager';
import sessions from './sessions';
import timebars from './timebars';
import views from './views';
import messages from './messages';
import modals from './modals';
import timelines from './timelines';
import windows from './windows';
import pages from './pages';
import domains from './domains';
import timebarTimelines from './timebarTimelines';
import masterSession from './masterSession';
import health from './health';
import codeEditor from './codeEditor';
import inspector from './inspector';
import knownRanges from './knownRanges';
import ui from './ui';
import rte from './rte';

import hsc from './hsc';

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
  knownRanges,
  ...configurationReducers,
  ...dataReducers,
  ...uiReducers,
});

export default rootReducer;
