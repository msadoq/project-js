// Generated file

const {
  uoctetToBytes,
  bytesToUoctet,
} = require('../types');

module.exports = {
  encode: data => ({
    retransmit_flag: (data.retransmit_flag !== null && typeof data.retransmit_flag !== 'undefined')
      ? { value: uoctetToBytes(data.retransmit_flag) }
      : null,
    internal_id: (data.internal_id !== null && typeof data.internal_id !== 'undefined')
      ? { value: data.internal_id }
      : null,
    num_farm: (data.num_farm !== null && typeof data.num_farm !== 'undefined')
      ? { value: data.num_farm }
      : null,
    date: (data.date !== null && typeof data.date !== 'undefined')
      ? { value: data.date }
      : null,
    frame_data: (data.frame_data !== null && typeof data.frame_data !== 'undefined')
      ? { value: data.frame_data }
      : null,
    reemission_delay: (data.reemission_delay !== null && typeof data.reemission_delay !== 'undefined')
      ? { value: data.reemission_delay }
      : null,
  }),
  decode: data => ({
    retransmit_flag: (data.retransmit_flag !== null && typeof data.retransmit_flag !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.retransmit_flag.value) }
      : undefined,
    internal_id: (data.internal_id !== null && typeof data.internal_id !== 'undefined')
      ? { type: 'uinteger', value: data.internal_id.value }
      : undefined,
    num_farm: (data.num_farm !== null && typeof data.num_farm !== 'undefined')
      ? { type: 'uinteger', value: data.num_farm.value }
      : undefined,
    date: (data.date !== null && typeof data.date !== 'undefined')
      ? { type: 'string', value: data.date.value }
      : undefined,
    frame_data: (data.frame_data !== null && typeof data.frame_data !== 'undefined')
      ? { type: 'blob', value: data.frame_data.value.toBuffer() }
      : undefined,
    reemission_delay: (data.reemission_delay !== null && typeof data.reemission_delay !== 'undefined')
      ? { type: 'float', value: data.reemission_delay.value }
      : undefined,
  }),
};

