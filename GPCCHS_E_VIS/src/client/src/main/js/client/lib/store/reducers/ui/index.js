import { combineReducers } from 'redux';

import editorReducer from './editor';
import dialogReducer from './dialog';

export default combineReducers({
  editor: editorReducer,
  dialog: dialogReducer,
});
