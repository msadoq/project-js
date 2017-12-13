import * as types from 'store/types';

export default sendProductLog => () => next => (action) => {
  const nextAction = next(action);
  if (action.type === types.HSC_SEND_PRODUCT_LOG) {
    const { uid, args } = action.payload;
    sendProductLog(uid, args);
  }
  return nextAction;
};
