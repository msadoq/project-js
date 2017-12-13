// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Add sendProductLog middleware in serverProcess + replace old IPC productLog
// END-HISTORY
// ====================================================================

import * as types from 'store/types';

export default sendProductLog => () => next => (action) => {
  const nextAction = next(action);
  if (action.type === types.HSC_SEND_PRODUCT_LOG) {
    const { uid, args } = action.payload;
    sendProductLog(uid, args);
  }
  return nextAction;
};
