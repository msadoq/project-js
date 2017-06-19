// Produced by Acceleo JavaScript Generator 1.1.0


module.exports = {
  encode: data => ({
    nb_remaining_bytes: (data.nb_remaining_bytes !== null && typeof data.nb_remaining_bytes !== 'undefined')
      ? { value: data.nb_remaining_bytes }
      : null,
    last_state: (data.last_state !== null && typeof data.last_state !== 'undefined')
      ? { value: data.last_state }
      : null,
    mnemonic: (data.mnemonic !== null && typeof data.mnemonic !== 'undefined')
      ? { value: data.mnemonic }
      : null,
    nb_emitted_bytes: (data.nb_emitted_bytes !== null && typeof data.nb_emitted_bytes !== 'undefined')
      ? { value: data.nb_emitted_bytes }
      : null,
  }),
  decode: data => ({
    nb_remaining_bytes: (data.nb_remaining_bytes !== null && typeof data.nb_remaining_bytes !== 'undefined')
      ? { type: 'integer', value: data.nb_remaining_bytes.value }
      : undefined,
    last_state: (data.last_state !== null && typeof data.last_state !== 'undefined')
      ? { type: 'boolean', value: data.last_state.value }
      : undefined,
    mnemonic: (data.mnemonic !== null && typeof data.mnemonic !== 'undefined')
      ? { type: 'blob', value: data.mnemonic.value }
      : undefined,
    nb_emitted_bytes: (data.nb_emitted_bytes !== null && typeof data.nb_emitted_bytes !== 'undefined')
      ? { type: 'integer', value: data.nb_emitted_bytes.value }
      : undefined,
  }),
};

