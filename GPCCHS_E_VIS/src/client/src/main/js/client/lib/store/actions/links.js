// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6785 : 29/06/2017 : Fix opening view link in a new page and read only path for link definition
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 20/07/2017 : Reimplement openLink middleware . .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

export default {
  askOpenLink: simple(types.WS_ASK_OPEN_LINK, 'viewId', 'linkId'),
};
