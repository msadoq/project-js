import { combineReducers } from 'redux';
import hss from './hssReducer';
import windows from './windowReducer';
import pages from './pageReducer';
import views from './viewReducer';
import connectedData from './connectedDataReducer';

const reducer = combineReducers({
  hss,
  windows,
  pages,
  views,
  connectedData,
});

export default reducer;
