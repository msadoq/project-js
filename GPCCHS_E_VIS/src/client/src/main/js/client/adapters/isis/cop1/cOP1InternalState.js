// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const fLOAT = require('../ccsds_mal/fLOAT');
const iNTEGER = require('../ccsds_mal/iNTEGER');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uOCTET = require('../ccsds_mal/uOCTET');

module.exports = {
  encode: data => ({
    stored_lockout_flag: (data.stored_lockout_flag !== null && typeof data.stored_lockout_flag !== 'undefined')
      ? uOCTET.encode(data.stored_lockout_flag)
      : null,
    stored_wait_flag: (data.stored_wait_flag !== null && typeof data.stored_wait_flag !== 'undefined')
      ? uOCTET.encode(data.stored_wait_flag)
      : null,
    stored_restransmit_flag: (data.stored_restransmit_flag !== null && typeof data.stored_restransmit_flag !== 'undefined')
      ? uOCTET.encode(data.stored_restransmit_flag)
      : null,
    aD_out_flag: (data.aD_out_flag !== null && typeof data.aD_out_flag !== 'undefined')
      ? uOCTET.encode(data.aD_out_flag)
      : null,
    v_S_nbmod: (data.v_S_nbmod !== null && typeof data.v_S_nbmod !== 'undefined')
      ? uINTEGER.encode(data.v_S_nbmod)
      : null,
    bC_out_flag: (data.bC_out_flag !== null && typeof data.bC_out_flag !== 'undefined')
      ? uOCTET.encode(data.bC_out_flag)
      : null,
    bD_out_flag: (data.bD_out_flag !== null && typeof data.bD_out_flag !== 'undefined')
      ? uOCTET.encode(data.bD_out_flag)
      : null,
    nN_R_nbmod: (data.nN_R_nbmod !== null && typeof data.nN_R_nbmod !== 'undefined')
      ? uINTEGER.encode(data.nN_R_nbmod)
      : null,
    transmission_limit: (data.transmission_limit !== null && typeof data.transmission_limit !== 'undefined')
      ? uINTEGER.encode(data.transmission_limit)
      : null,
    timeout_type: (data.timeout_type !== null && typeof data.timeout_type !== 'undefined')
      ? uINTEGER.encode(data.timeout_type)
      : null,
    transmission_count: (data.transmission_count !== null && typeof data.transmission_count !== 'undefined')
      ? uINTEGER.encode(data.transmission_count)
      : null,
    sliding_window_width: (data.sliding_window_width !== null && typeof data.sliding_window_width !== 'undefined')
      ? uINTEGER.encode(data.sliding_window_width)
      : null,
    t1_initial: (data.t1_initial !== null && typeof data.t1_initial !== 'undefined')
      ? fLOAT.encode(data.t1_initial)
      : null,
    regulation_tc_delay: (data.regulation_tc_delay !== null && typeof data.regulation_tc_delay !== 'undefined')
      ? fLOAT.encode(data.regulation_tc_delay)
      : null,
    suspend_state: (data.suspend_state !== null && typeof data.suspend_state !== 'undefined')
      ? uOCTET.encode(data.suspend_state)
      : null,
    v_S: (data.v_S !== null && typeof data.v_S !== 'undefined')
      ? uINTEGER.encode(data.v_S)
      : null,
    state: (data.state !== null && typeof data.state !== 'undefined')
      ? uINTEGER.encode(data.state)
      : null,
    nN_R: (data.nN_R !== null && typeof data.nN_R !== 'undefined')
      ? iNTEGER.encode(data.nN_R)
      : null,
  }),
  decode: data => ({
    stored_lockout_flag: (data.stored_lockout_flag !== null && typeof data.stored_lockout_flag !== 'undefined')
      ? uOCTET.decode(data.stored_lockout_flag)
      : undefined,
    stored_wait_flag: (data.stored_wait_flag !== null && typeof data.stored_wait_flag !== 'undefined')
      ? uOCTET.decode(data.stored_wait_flag)
      : undefined,
    stored_restransmit_flag: (data.stored_restransmit_flag !== null && typeof data.stored_restransmit_flag !== 'undefined')
      ? uOCTET.decode(data.stored_restransmit_flag)
      : undefined,
    aD_out_flag: (data.aD_out_flag !== null && typeof data.aD_out_flag !== 'undefined')
      ? uOCTET.decode(data.aD_out_flag)
      : undefined,
    v_S_nbmod: (data.v_S_nbmod !== null && typeof data.v_S_nbmod !== 'undefined')
      ? uINTEGER.decode(data.v_S_nbmod)
      : undefined,
    bC_out_flag: (data.bC_out_flag !== null && typeof data.bC_out_flag !== 'undefined')
      ? uOCTET.decode(data.bC_out_flag)
      : undefined,
    bD_out_flag: (data.bD_out_flag !== null && typeof data.bD_out_flag !== 'undefined')
      ? uOCTET.decode(data.bD_out_flag)
      : undefined,
    nN_R_nbmod: (data.nN_R_nbmod !== null && typeof data.nN_R_nbmod !== 'undefined')
      ? uINTEGER.decode(data.nN_R_nbmod)
      : undefined,
    transmission_limit: (data.transmission_limit !== null && typeof data.transmission_limit !== 'undefined')
      ? uINTEGER.decode(data.transmission_limit)
      : undefined,
    timeout_type: (data.timeout_type !== null && typeof data.timeout_type !== 'undefined')
      ? uINTEGER.decode(data.timeout_type)
      : undefined,
    transmission_count: (data.transmission_count !== null && typeof data.transmission_count !== 'undefined')
      ? uINTEGER.decode(data.transmission_count)
      : undefined,
    sliding_window_width: (data.sliding_window_width !== null && typeof data.sliding_window_width !== 'undefined')
      ? uINTEGER.decode(data.sliding_window_width)
      : undefined,
    t1_initial: (data.t1_initial !== null && typeof data.t1_initial !== 'undefined')
      ? fLOAT.decode(data.t1_initial)
      : undefined,
    regulation_tc_delay: (data.regulation_tc_delay !== null && typeof data.regulation_tc_delay !== 'undefined')
      ? fLOAT.decode(data.regulation_tc_delay)
      : undefined,
    suspend_state: (data.suspend_state !== null && typeof data.suspend_state !== 'undefined')
      ? uOCTET.decode(data.suspend_state)
      : undefined,
    v_S: (data.v_S !== null && typeof data.v_S !== 'undefined')
      ? uINTEGER.decode(data.v_S)
      : undefined,
    state: (data.state !== null && typeof data.state !== 'undefined')
      ? uINTEGER.decode(data.state)
      : undefined,
    nN_R: (data.nN_R !== null && typeof data.nN_R !== 'undefined')
      ? iNTEGER.decode(data.nN_R)
      : undefined,
  }),
};
