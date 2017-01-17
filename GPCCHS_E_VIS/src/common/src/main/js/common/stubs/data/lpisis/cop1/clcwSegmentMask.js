// Generated file
const applyOverride = require('../../applyOverride');
const getFlagVal = require('./flagVal');

module.exports = override => applyOverride({
  sequence_flag: true,
  sequence_type: 0,
  map: getFlagVal(),
  word_type: getFlagVal(),
  vc_id: getFlagVal(),
  farm_B_counter: getFlagVal(),
  RF_flag: getFlagVal(),
  synchro_flag: getFlagVal(),
  close_flag: getFlagVal(),
  wait_flag: getFlagVal(),
  retransmit_flag: getFlagVal(),
  report: getFlagVal(),
  version_name: getFlagVal(),
  state: getFlagVal(),
  cop: getFlagVal(),
}, override);

