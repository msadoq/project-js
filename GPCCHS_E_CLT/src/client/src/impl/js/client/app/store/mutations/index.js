import { combineReducers } from 'redux';
import hss from './hssReducer';
import windows from './windowReducer';
import pages from './pageReducer';
import views from './viewReducer';
import entryPoints from './entryPointReducer';

const reducer = combineReducers({
  hss,
  windows,
  pages,
  views,
  entryPoints,
});

export default reducer;
