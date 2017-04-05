// Produced by Acceleo JavaScript Generator 1.1.0
/* eslint-disable complexity, "DV6 TBC_CNES Generated code complexity is not avoidable" */

const {
  uoctetToBytes,
  bytesToUoctet,

} = require('../types');

module.exports = {
  encode: data => ({
    stored_lockout_flag: (data.stored_lockout_flag !== null && typeof data.stored_lockout_flag !== 'undefined')
      ? { value: uoctetToBytes(data.stored_lockout_flag) }
      : null,
    stored_wait_flag: (data.stored_wait_flag !== null && typeof data.stored_wait_flag !== 'undefined')
      ? { value: uoctetToBytes(data.stored_wait_flag) }
      : null,
    stored_restransmit_flag: (data.stored_restransmit_flag !== null && typeof data.stored_restransmit_flag !== 'undefined')
      ? { value: uoctetToBytes(data.stored_restransmit_flag) }
      : null,
    AD_out_flag: (data.AD_out_flag !== null && typeof data.AD_out_flag !== 'undefined')
      ? { value: uoctetToBytes(data.AD_out_flag) }
      : null,
    V_S_nbmod: (data.V_S_nbmod !== null && typeof data.V_S_nbmod !== 'undefined')
      ? { value: data.V_S_nbmod }
      : null,
    BC_out_flag: (data.BC_out_flag !== null && typeof data.BC_out_flag !== 'undefined')
      ? { value: uoctetToBytes(data.BC_out_flag) }
      : null,
    BD_out_flag: (data.BD_out_flag !== null && typeof data.BD_out_flag !== 'undefined')
      ? { value: uoctetToBytes(data.BD_out_flag) }
      : null,
    NN_R_nbmod: (data.NN_R_nbmod !== null && typeof data.NN_R_nbmod !== 'undefined')
      ? { value: data.NN_R_nbmod }
      : null,
    transmission_limit: (data.transmission_limit !== null && typeof data.transmission_limit !== 'undefined')
      ? { value: data.transmission_limit }
      : null,
    timeout_type: (data.timeout_type !== null && typeof data.timeout_type !== 'undefined')
      ? { value: data.timeout_type }
      : null,
    transmission_count: (data.transmission_count !== null && typeof data.transmission_count !== 'undefined')
      ? { value: data.transmission_count }
      : null,
    sliding_window_width: (data.sliding_window_width !== null && typeof data.sliding_window_width !== 'undefined')
      ? { value: data.sliding_window_width }
      : null,
    T1_initial: (data.T1_initial !== null && typeof data.T1_initial !== 'undefined')
      ? { value: data.T1_initial }
      : null,
    regulation_tc_delay: (data.regulation_tc_delay !== null && typeof data.regulation_tc_delay !== 'undefined')
      ? { value: data.regulation_tc_delay }
      : null,
    suspend_state: (data.suspend_state !== null && typeof data.suspend_state !== 'undefined')
      ? { value: uoctetToBytes(data.suspend_state) }
      : null,
    V_S: (data.V_S !== null && typeof data.V_S !== 'undefined')
      ? { value: data.V_S }
      : null,
    state: (data.state !== null && typeof data.state !== 'undefined')
      ? { value: data.state }
      : null,
    NN_R: (data.NN_R !== null && typeof data.NN_R !== 'undefined')
      ? { value: data.NN_R }
      : null,
  }),
  decode: data => ({
    stored_lockout_flag: (data.stored_lockout_flag !== null && typeof data.stored_lockout_flag !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.stored_lockout_flag.value) }
      : undefined,
    stored_wait_flag: (data.stored_wait_flag !== null && typeof data.stored_wait_flag !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.stored_wait_flag.value) }
      : undefined,
    stored_restransmit_flag: (data.stored_restransmit_flag !== null && typeof data.stored_restransmit_flag !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.stored_restransmit_flag.value) }
      : undefined,
    AD_out_flag: (data.AD_out_flag !== null && typeof data.AD_out_flag !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.AD_out_flag.value) }
      : undefined,
    V_S_nbmod: (data.V_S_nbmod !== null && typeof data.V_S_nbmod !== 'undefined')
      ? { type: 'uinteger', value: data.V_S_nbmod.value }
      : undefined,
    BC_out_flag: (data.BC_out_flag !== null && typeof data.BC_out_flag !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.BC_out_flag.value) }
      : undefined,
    BD_out_flag: (data.BD_out_flag !== null && typeof data.BD_out_flag !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.BD_out_flag.value) }
      : undefined,
    NN_R_nbmod: (data.NN_R_nbmod !== null && typeof data.NN_R_nbmod !== 'undefined')
      ? { type: 'uinteger', value: data.NN_R_nbmod.value }
      : undefined,
    transmission_limit: (data.transmission_limit !== null && typeof data.transmission_limit !== 'undefined')
      ? { type: 'uinteger', value: data.transmission_limit.value }
      : undefined,
    timeout_type: (data.timeout_type !== null && typeof data.timeout_type !== 'undefined')
      ? { type: 'uinteger', value: data.timeout_type.value }
      : undefined,
    transmission_count: (data.transmission_count !== null && typeof data.transmission_count !== 'undefined')
      ? { type: 'uinteger', value: data.transmission_count.value }
      : undefined,
    sliding_window_width: (data.sliding_window_width !== null && typeof data.sliding_window_width !== 'undefined')
      ? { type: 'uinteger', value: data.sliding_window_width.value }
      : undefined,
    T1_initial: (data.T1_initial !== null && typeof data.T1_initial !== 'undefined')
      ? { type: 'float', value: data.T1_initial.value }
      : undefined,
    regulation_tc_delay: (data.regulation_tc_delay !== null && typeof data.regulation_tc_delay !== 'undefined')
      ? { type: 'float', value: data.regulation_tc_delay.value }
      : undefined,
    suspend_state: (data.suspend_state !== null && typeof data.suspend_state !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.suspend_state.value) }
      : undefined,
    V_S: (data.V_S !== null && typeof data.V_S !== 'undefined')
      ? { type: 'uinteger', value: data.V_S.value }
      : undefined,
    state: (data.state !== null && typeof data.state !== 'undefined')
      ? { type: 'uinteger', value: data.state.value }
      : undefined,
    NN_R: (data.NN_R !== null && typeof data.NN_R !== 'undefined')
      ? { type: 'integer', value: data.NN_R.value }
      : undefined,
  }),
};

