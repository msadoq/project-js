// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 10/02/2017 : Move views reducer at top-level in reducers folder
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : Show / Hide Text Editor Window
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Merge branch 'dev' into abesson-html-editor
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Creation of timebarTimelines reducer .
// VERSION : 1.1.2 : DM : #3622 : 07/03/2017 : first draft on inspector: retrieve data from rtd on right-click
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Simplify rootReducer, transforming closePage in a thunk
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Fix unremoved views when close a page
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Write first configurationReducer (TextView) .
// VERSION : 1.1.2 : DM : #5822 : 20/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Creation of data store for plotView
// VERSION : 1.1.2 : DM : #5822 : 21/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #3622 : 22/03/2017 : Update viewData organization for last structure + cleaning
// VERSION : 1.1.2 : DM : #5822 : 23/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Implement automation for data reducers in viewManager
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : New GenericModal component displayed or not displayed at root (Window.js) AddTimeline and EditTimeline forms displayed through it.
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Plot & Text editor panels and sub-panels are stored in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Plot & Text editor panels and sub-panels are stored in store.
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files. Possibility to add it in editor using context menu
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : First draft on catalog explorer
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : catalog explorer : open, close and browse items
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : CReation of knownRanges reducer and actions
// END-HISTORY
// ====================================================================

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
