// Generated file
const _map = require('lodash/map');

const {
  uoctetToBytes,
  bytesToUoctet,
} = require('../types');

module.exports = {
  encode: data => ({
    TCID: (data.TCID !== null && typeof data.TCID !== 'undefined')
      ? { value: data.TCID }
      : null,
    receivedDate: (data.receivedDate !== null && typeof data.receivedDate !== 'undefined')
      ? { value: data.receivedDate }
      : null,
    mnemo: (data.mnemo !== null && typeof data.mnemo !== 'undefined')
      ? { value: uoctetToBytes(data.mnemo) }
      : null,
    segment_id: _map(data.segment_id, d => ({ value: d })),
    rawtc_data: (data.rawtc_data !== null && typeof data.rawtc_data !== 'undefined')
      ? { value: data.rawtc_data }
      : null,
  }),
  decode: data => ({
    TCID: (data.TCID !== null && typeof data.TCID !== 'undefined')
      ? { type: 'identifier', value: data.TCID.value.toBuffer() }
      : undefined,
    receivedDate: (data.receivedDate !== null && typeof data.receivedDate !== 'undefined')
      ? { type: 'time', value: data.receivedDate.value.toNumber() }
      : undefined,
    mnemo: (data.mnemo !== null && typeof data.mnemo !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.mnemo.value) }
      : undefined,
    segment_id: _map(data.segment_id, d => ({ type: 'uinteger', value: d.value })),
    rawtc_data: (data.rawtc_data !== null && typeof data.rawtc_data !== 'undefined')
      ? { type: 'blob', value: data.rawtc_data.value.toBuffer() }
      : undefined,
  }),
};

