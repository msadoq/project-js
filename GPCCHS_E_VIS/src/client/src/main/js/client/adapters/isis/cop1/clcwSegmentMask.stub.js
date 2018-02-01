// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getFlagVal = require('./flagVal.stub');

const clcwSegmentMask = {
  sequence_flag: true,
  sequence_type: 0,
  map: getFlagVal(),
  word_type: getFlagVal(),
  vc_id: getFlagVal(),
  farm_B_counter: getFlagVal(),
  rF_flag: getFlagVal(),
  synchro_flag: getFlagVal(),
  close_flag: getFlagVal(),
  wait_flag: getFlagVal(),
  retransmit_flag: getFlagVal(),
  report: getFlagVal(),
  version_name: getFlagVal(),
  state: getFlagVal(),
  cop: getFlagVal(),
};

module.exports = override => (override ? _defaultsDeep({}, override, clcwSegmentMask) : clcwSegmentMask);
