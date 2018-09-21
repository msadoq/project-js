// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Add sendProductLog middleware in serverProcess +
//  replace old IPC productLog
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import * as types from 'store/types';

export default sendProductLog => () => next => (action) => {
  if (action.type === types.HSC_SEND_PRODUCT_LOG) {
    const { uid, args } = action.payload;
    sendProductLog(uid, args);
  }
  return next(action);
};
