// Produced by Acceleo JavaScript Generator 1.1.0
const decoderType = require('./decoderType');
const modeType = require('./modeType');
const {
  uoctetToBytes,
  bytesToUoctet,

} = require('../types');

module.exports = {
  encode: data => ({
    mode: (data.mode !== null && typeof data.mode !== 'undefined')
      ? data.mode
      : null,
    decoder: (data.decoder !== null && typeof data.decoder !== 'undefined')
      ? data.decoder
      : null,
    state: (data.state !== null && typeof data.state !== 'undefined')
      ? { value: uoctetToBytes(data.state) }
      : null,
    lockout_flag: (data.lockout_flag !== null && typeof data.lockout_flag !== 'undefined')
      ? { value: uoctetToBytes(data.lockout_flag) }
      : null,
    wait_flag: (data.wait_flag !== null && typeof data.wait_flag !== 'undefined')
      ? { value: uoctetToBytes(data.wait_flag) }
      : null,
    synchro_flag: (data.synchro_flag !== null && typeof data.synchro_flag !== 'undefined')
      ? { value: uoctetToBytes(data.synchro_flag) }
      : null,
    RF_flag: (data.RF_flag !== null && typeof data.RF_flag !== 'undefined')
      ? { value: uoctetToBytes(data.RF_flag) }
      : null,
    retransmit_flag: (data.retransmit_flag !== null && typeof data.retransmit_flag !== 'undefined')
      ? { value: data.retransmit_flag }
      : null,
    FarmB_counter: (data.FarmB_counter !== null && typeof data.FarmB_counter !== 'undefined')
      ? { value: data.FarmB_counter }
      : null,
    event: (data.event !== null && typeof data.event !== 'undefined')
      ? { value: data.event }
      : null,
    CLCW: (data.CLCW !== null && typeof data.CLCW !== 'undefined')
      ? { value: data.CLCW }
      : null,
    V_S: (data.V_S !== null && typeof data.V_S !== 'undefined')
      ? { value: data.V_S }
      : null,
    V_R: (data.V_R !== null && typeof data.V_R !== 'undefined')
      ? { value: data.V_R }
      : null,
    N_R: (data.N_R !== null && typeof data.N_R !== 'undefined')
      ? { value: data.N_R }
      : null,
    NN_R: (data.NN_R !== null && typeof data.NN_R !== 'undefined')
      ? { value: data.NN_R }
      : null,
    num_frame: (data.num_frame !== null && typeof data.num_frame !== 'undefined')
      ? { value: data.num_frame }
      : null,
    type_frame: (data.type_frame !== null && typeof data.type_frame !== 'undefined')
      ? data.type_frame
      : null,
    nb_accepted_frames: (data.nb_accepted_frames !== null && typeof data.nb_accepted_frames !== 'undefined')
      ? { value: data.nb_accepted_frames }
      : null,
    nb_confirmed_frames: (data.nb_confirmed_frames !== null && typeof data.nb_confirmed_frames !== 'undefined')
      ? { value: data.nb_confirmed_frames }
      : null,
    nb_rejected_frames: (data.nb_rejected_frames !== null && typeof data.nb_rejected_frames !== 'undefined')
      ? { value: data.nb_rejected_frames }
      : null,
    variable_display: (data.variable_display !== null && typeof data.variable_display !== 'undefined')
      ? { value: uoctetToBytes(data.variable_display) }
      : null,
    frame_display: (data.frame_display !== null && typeof data.frame_display !== 'undefined')
      ? { value: uoctetToBytes(data.frame_display) }
      : null,
  }),
  decode: data => ({
    mode: (data.mode !== null && typeof data.mode !== 'undefined')
      ? { type: 'enum', value: data.mode, symbol: modeType[data.mode] }
      : undefined,
    decoder: (data.decoder !== null && typeof data.decoder !== 'undefined')
      ? { type: 'enum', value: data.decoder, symbol: decoderType[data.decoder] }
      : undefined,
    state: (data.state !== null && typeof data.state !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.state.value) }
      : undefined,
    lockout_flag: (data.lockout_flag !== null && typeof data.lockout_flag !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.lockout_flag.value) }
      : undefined,
    wait_flag: (data.wait_flag !== null && typeof data.wait_flag !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.wait_flag.value) }
      : undefined,
    synchro_flag: (data.synchro_flag !== null && typeof data.synchro_flag !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.synchro_flag.value) }
      : undefined,
    RF_flag: (data.RF_flag !== null && typeof data.RF_flag !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.RF_flag.value) }
      : undefined,
    retransmit_flag: (data.retransmit_flag !== null && typeof data.retransmit_flag !== 'undefined')
      ? { type: 'uinteger', value: data.retransmit_flag.value }
      : undefined,
    FarmB_counter: (data.FarmB_counter !== null && typeof data.FarmB_counter !== 'undefined')
      ? { type: 'uinteger', value: data.FarmB_counter.value }
      : undefined,
    event: (data.event !== null && typeof data.event !== 'undefined')
      ? { type: 'uinteger', value: data.event.value }
      : undefined,
    CLCW: (data.CLCW !== null && typeof data.CLCW !== 'undefined')
      ? { type: 'uinteger', value: data.CLCW.value }
      : undefined,
    V_S: (data.V_S !== null && typeof data.V_S !== 'undefined')
      ? { type: 'uinteger', value: data.V_S.value }
      : undefined,
    V_R: (data.V_R !== null && typeof data.V_R !== 'undefined')
      ? { type: 'uinteger', value: data.V_R.value }
      : undefined,
    N_R: (data.N_R !== null && typeof data.N_R !== 'undefined')
      ? { type: 'uinteger', value: data.N_R.value }
      : undefined,
    NN_R: (data.NN_R !== null && typeof data.NN_R !== 'undefined')
      ? { type: 'integer', value: data.NN_R.value }
      : undefined,
    num_frame: (data.num_frame !== null && typeof data.num_frame !== 'undefined')
      ? { type: 'uinteger', value: data.num_frame.value }
      : undefined,
    type_frame: (data.type_frame !== null && typeof data.type_frame !== 'undefined')
      ? { type: 'enum', value: data.type_frame, symbol: modeType[data.type_frame] }
      : undefined,
    nb_accepted_frames: (data.nb_accepted_frames !== null && typeof data.nb_accepted_frames !== 'undefined')
      ? { type: 'uinteger', value: data.nb_accepted_frames.value }
      : undefined,
    nb_confirmed_frames: (data.nb_confirmed_frames !== null && typeof data.nb_confirmed_frames !== 'undefined')
      ? { type: 'uinteger', value: data.nb_confirmed_frames.value }
      : undefined,
    nb_rejected_frames: (data.nb_rejected_frames !== null && typeof data.nb_rejected_frames !== 'undefined')
      ? { type: 'uinteger', value: data.nb_rejected_frames.value }
      : undefined,
    variable_display: (data.variable_display !== null && typeof data.variable_display !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.variable_display.value) }
      : undefined,
    frame_display: (data.frame_display !== null && typeof data.frame_display !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.frame_display.value) }
      : undefined,
  }),
};

