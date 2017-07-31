import _isEmpty from 'lodash/isEmpty';
import _isBuffer from 'lodash/isBuffer';
import * as types from '../../types';
import { injectNewData } from '../../actions/incomingData';
import { decode, getType } from '../../../utils/adapters';

const { dumpBuffer } = require('../../../serverProcess/utils/dumpBuffer');

const prepareLast = () => ({ dispatch }) => next => (action) => {
  if (action.type === types.INCOMING_LAST_DATA) {
    console.log('[PrepareLastMiddleware] ON_INCOMING_LAST_DATA action');
    const tbdId = action.payload.tbdId;
    const dataId = action.payload.dataId;
    const peers = action.payload.peers;

    const payloadProtobufType = getType(dataId.comObject);
    const payloadsJson = {};
    let index = 0;
    while (index + 1 < peers.length) {
      // pop the first two buffers from list

      // robustness code, LPISIS could send empty ZeroMQ frame
      if ( _isBuffer(peers[index]) && _isBuffer(peers[index + 1])) {
        const timestamp = decode('dc.dataControllerUtils.Timestamp', peers[index]).ms;
        const payload = decode(payloadProtobufType, peers[index + 1]);
        // dump: if activated, save a file per timestamp with binary payload
        dumpBuffer(dataId, timestamp, peers[index + 1]);

        // queue new data in spool
        payloadsJson[timestamp] = payload;
      }
      index += 2;
    }
    if (!_isEmpty(payloadsJson)) dispatch(injectNewData(tbdId, payloadsJson));
  }
  return next(action);
};

export default prepareLast;