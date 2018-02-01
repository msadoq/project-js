// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const cOP1InternalState = {
  stored_lockout_flag: 1,
  stored_wait_flag: 1,
  stored_restransmit_flag: 1,
  aD_out_flag: 1,
  v_S_nbmod: 100,
  bC_out_flag: 1,
  bD_out_flag: 1,
  nN_R_nbmod: 100,
  transmission_limit: 100,
  timeout_type: 100,
  transmission_count: 100,
  sliding_window_width: 100,
  t1_initial: 1.100000023841858,
  regulation_tc_delay: 1.100000023841858,
  suspend_state: 1,
  v_S: 100,
  state: 100,
  nN_R: -100,
};

module.exports = override => (override ? _defaultsDeep({}, override, cOP1InternalState) : cOP1InternalState);
