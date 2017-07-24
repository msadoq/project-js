import * as types from '../../types';
// import { injectData } from '../../actions/incomingData';

const prepareLast = () => ({ dispatch }) => next => (action) => { // eslint-disable-line
  if (action.type === types.INCOMING_LAST_DATA) {
    console.log('[PrepareLastMiddleware] ON_INCOMING_LAST_DATA action');
    // const tbdId = action.payload.tbdId;
    // const peers = action.payload.peers;

    // const timestamp = decoded from peers;
    // const payload = decoded from peers;

    // dispatch(injectData(tbdId, {[timestamp] : payload}))
  }
  return next(action);
};

export default prepareLast;
