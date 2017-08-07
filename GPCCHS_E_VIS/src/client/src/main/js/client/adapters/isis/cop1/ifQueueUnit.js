// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bLOB = require('../ccsds_mal/bLOB');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const iNTEGER = require('../ccsds_mal/iNTEGER');

module.exports = {
  encode: data => ({
    nb_remaining_bytes: (data.nb_remaining_bytes !== null && typeof data.nb_remaining_bytes !== 'undefined')
      ? iNTEGER.encode(data.nb_remaining_bytes)
      : null,
    last_state: (data.last_state !== null && typeof data.last_state !== 'undefined')
      ? bOOLEAN.encode(data.last_state)
      : null,
    mnemonic: (data.mnemonic !== null && typeof data.mnemonic !== 'undefined')
      ? bLOB.encode(data.mnemonic)
      : null,
    nb_emitted_bytes: (data.nb_emitted_bytes !== null && typeof data.nb_emitted_bytes !== 'undefined')
      ? iNTEGER.encode(data.nb_emitted_bytes)
      : null,
  }),
  decode: data => ({
    nb_remaining_bytes: (data.nb_remaining_bytes !== null && typeof data.nb_remaining_bytes !== 'undefined')
      ? iNTEGER.decode(data.nb_remaining_bytes)
      : undefined,
    last_state: (data.last_state !== null && typeof data.last_state !== 'undefined')
      ? bOOLEAN.decode(data.last_state)
      : undefined,
    mnemonic: (data.mnemonic !== null && typeof data.mnemonic !== 'undefined')
      ? bLOB.decode(data.mnemonic)
      : undefined,
    nb_emitted_bytes: (data.nb_emitted_bytes !== null && typeof data.nb_emitted_bytes !== 'undefined')
      ? iNTEGER.decode(data.nb_emitted_bytes)
      : undefined,
  }),
};
