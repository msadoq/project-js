import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

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
import health from './health';
import editor from './editor';
import plotViewData from '../../viewManager/PlotView/store/dataReducer';
import textViewData from '../../viewManager/TextView/store/dataReducer';
import dynamicViewData from '../../viewManager/DynamicView/store/dataReducer';

import { configurationReducers } from '../../viewManager/';

const rootReducer = combineReducers({
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
  health,
  editor,
  plotViewData,
  textViewData,
  dynamicViewData,
  ...configurationReducers,
});

export default rootReducer;
