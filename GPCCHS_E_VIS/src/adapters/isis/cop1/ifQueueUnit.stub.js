// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const ifQueueUnit = {
  nb_remaining_bytes: -100,
  last_state: true,
  mnemonic: Buffer.alloc(4, 1),
  nb_emitted_bytes: -100,
};

module.exports = override => (override ? _defaultsDeep({}, override, ifQueueUnit) : ifQueueUnit);
