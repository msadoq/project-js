// Produced by Acceleo JavaScript Generator 1.1.0


module.exports = {
  encode: data => ({
    internal_id: (data.internal_id !== null && typeof data.internal_id !== 'undefined')
      ? { value: data.internal_id }
      : null,
    frame_data: (data.frame_data !== null && typeof data.frame_data !== 'undefined')
      ? { value: data.frame_data }
      : null,
    reemission_delay: (data.reemission_delay !== null && typeof data.reemission_delay !== 'undefined')
      ? { value: data.reemission_delay }
      : null,
  }),
  decode: data => ({
    internal_id: (data.internal_id !== null && typeof data.internal_id !== 'undefined')
      ? { type: 'integer', value: data.internal_id.value }
      : undefined,
    frame_data: (data.frame_data !== null && typeof data.frame_data !== 'undefined')
      ? { type: 'blob', value: data.frame_data.value.toBuffer() }
      : undefined,
    reemission_delay: (data.reemission_delay !== null && typeof data.reemission_delay !== 'undefined')
      ? { type: 'float', value: data.reemission_delay.value }
      : undefined,
  }),
};

