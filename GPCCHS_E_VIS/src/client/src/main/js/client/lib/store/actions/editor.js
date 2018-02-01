// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : Show / Hide Text Editor Window
// VERSION : 1.1.2 : DM : #3622 : 27/02/2017 : chunk pause action on open editor and on dislay timesetter
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/hsc . . .
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files. Possibility to add it in editor using context menu
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : Merge dev in abesson-mimic .
// VERSION : 1.1.2 : FA : #6670 : 21/06/2017 : Automatically pause when open editor (player middleware)
// VERSION : 1.1.2 : DM : #6129 : 27/06/2017 : merge dev on abesson-mimic branch .
// END-HISTORY
// ====================================================================

import * as types from '../types';
import simple from '../helpers/simpleActionCreator';


export const openCodeEditor = simple(types.WS_WINDOW_OPEN_CODE_EDITOR, 'viewId');
export const closeCodeEditor = simple(types.WS_WINDOW_CLOSE_CODE_EDITOR);
