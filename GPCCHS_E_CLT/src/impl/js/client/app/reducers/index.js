import { combineReducers } from 'redux';
import websocket from './websocket';
import windows from './windows';
import pages from './pages';
import views from './views';
import plots from './plots';
import subscriptions from './subscriptions';

const rootReducer = combineReducers({
  websocket,
  windows,
  pages,
  views,
  plots,
  subscriptions,
});

export default rootReducer;
