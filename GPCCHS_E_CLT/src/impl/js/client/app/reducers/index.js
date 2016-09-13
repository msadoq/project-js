import { combineReducers } from 'redux';
import mainWebsocket from './mainWebsocket';
import windows from './windows';
import pages from './pages';
import views from './views';
import plots from './plots';
import subscriptions from './subscriptions';

const rootReducer = combineReducers({
  mainWebsocket,
  windows,
  pages,
  views,
  plots,
  subscriptions,
});

export default rootReducer;
