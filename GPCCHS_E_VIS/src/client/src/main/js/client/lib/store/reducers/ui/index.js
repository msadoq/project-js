// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Main tab is stored in store for Dynamic Plot & Text. state.ui
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Plot & Text editor panels and sub-panels are stored in store.
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Collapsed view : SAVE here when isModified: true, bolds in editor, eslint-disable with reason, colors for bgcolor are full colors.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Plot & Text editor panels and sub-panels are stored in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Collapsed view : SAVE here when isModified: true, bolds in editor, eslint-disable with reason, colors for bgcolor are full colors.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Main tab is stored in store for Dynamic Plot & Text. state.ui
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Split ui reducer + prepare ui/dialog reducer
// END-HISTORY
// ====================================================================

import { combineReducers } from 'redux';

import editorReducer from './editor';
import dialogReducer from './dialog';

export default combineReducers({
  editor: editorReducer,
  dialog: dialogReducer,
});
