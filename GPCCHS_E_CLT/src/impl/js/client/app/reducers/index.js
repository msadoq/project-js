import { combineReducers } from 'redux';
import websocket from './websocket';
import windows from './windows';
import pages from './pages';
import views from './views';
import subscriptions from './subscriptions';

const rootReducer = combineReducers({
  websocket,
  windows,
  pages,
  views,
  subscriptions,
});

export default rootReducer;
