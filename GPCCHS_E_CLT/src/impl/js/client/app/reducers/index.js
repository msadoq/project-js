import { combineReducers } from 'redux';
import windows from './windows';
import pages from './pages';
import views from './views';

const rootReducer = combineReducers({
  windows,
  pages,
  views,
});

export default rootReducer;
