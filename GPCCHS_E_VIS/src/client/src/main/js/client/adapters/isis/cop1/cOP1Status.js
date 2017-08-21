// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const decoderType = require('./decoderType');
const iNTEGER = require('../ccsds_mal/iNTEGER');
const modeType = require('./modeType');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uOCTET = require('../ccsds_mal/uOCTET');

module.exports = {
  encode: data => ({
    mode: (data.mode !== null && typeof data.mode !== 'undefined')
      ? data.mode
      : null,
    decoder: (data.decoder !== null && typeof data.decoder !== 'undefined')
      ? data.decoder
      : null,
    state: (data.state !== null && typeof data.state !== 'undefined')
      ? uOCTET.encode(data.state)
      : null,
    lockout_flag: (data.lockout_flag !== null && typeof data.lockout_flag !== 'undefined')
      ? uOCTET.encode(data.lockout_flag)
      : null,
    wait_flag: (data.wait_flag !== null && typeof data.wait_flag !== 'undefined')
      ? uOCTET.encode(data.wait_flag)
      : null,
    synchro_flag: (data.synchro_flag !== null && typeof data.synchro_flag !== 'undefined')
      ? uOCTET.encode(data.synchro_flag)
      : null,
    rF_flag: (data.rF_flag !== null && typeof data.rF_flag !== 'undefined')
      ? uOCTET.encode(data.rF_flag)
      : null,
    retransmit_flag: (data.retransmit_flag !== null && typeof data.retransmit_flag !== 'undefined')
      ? uINTEGER.encode(data.retransmit_flag)
      : null,
    farmB_counter: (data.farmB_counter !== null && typeof data.farmB_counter !== 'undefined')
      ? uINTEGER.encode(data.farmB_counter)
      : null,
    event: (data.event !== null && typeof data.event !== 'undefined')
      ? uINTEGER.encode(data.event)
      : null,
    cLCW: (data.cLCW !== null && typeof data.cLCW !== 'undefined')
      ? uINTEGER.encode(data.cLCW)
      : null,
    v_S: (data.v_S !== null && typeof data.v_S !== 'undefined')
      ? uINTEGER.encode(data.v_S)
      : null,
    v_R: (data.v_R !== null && typeof data.v_R !== 'undefined')
      ? uINTEGER.encode(data.v_R)
      : null,
    n_R: (data.n_R !== null && typeof data.n_R !== 'undefined')
      ? uINTEGER.encode(data.n_R)
      : null,
    nN_R: (data.nN_R !== null && typeof data.nN_R !== 'undefined')
      ? iNTEGER.encode(data.nN_R)
      : null,
    num_frame: (data.num_frame !== null && typeof data.num_frame !== 'undefined')
      ? uINTEGER.encode(data.num_frame)
      : null,
    type_frame: (data.type_frame !== null && typeof data.type_frame !== 'undefined')
      ? data.type_frame
      : null,
    nb_accepted_frames: (data.nb_accepted_frames !== null && typeof data.nb_accepted_frames !== 'undefined')
      ? uINTEGER.encode(data.nb_accepted_frames)
      : null,
    nb_confirmed_frames: (data.nb_confirmed_frames !== null && typeof data.nb_confirmed_frames !== 'undefined')
      ? uINTEGER.encode(data.nb_confirmed_frames)
      : null,
    nb_rejected_frames: (data.nb_rejected_frames !== null && typeof data.nb_rejected_frames !== 'undefined')
      ? uINTEGER.encode(data.nb_rejected_frames)
      : null,
    variable_display: (data.variable_display !== null && typeof data.variable_display !== 'undefined')
      ? uOCTET.encode(data.variable_display)
      : null,
    frame_display: (data.frame_display !== null && typeof data.frame_display !== 'undefined')
      ? uOCTET.encode(data.frame_display)
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
      ? uOCTET.decode(data.state)
      : undefined,
    lockout_flag: (data.lockout_flag !== null && typeof data.lockout_flag !== 'undefined')
      ? uOCTET.decode(data.lockout_flag)
      : undefined,
    wait_flag: (data.wait_flag !== null && typeof data.wait_flag !== 'undefined')
      ? uOCTET.decode(data.wait_flag)
      : undefined,
    synchro_flag: (data.synchro_flag !== null && typeof data.synchro_flag !== 'undefined')
      ? uOCTET.decode(data.synchro_flag)
      : undefined,
    rF_flag: (data.rF_flag !== null && typeof data.rF_flag !== 'undefined')
      ? uOCTET.decode(data.rF_flag)
      : undefined,
    retransmit_flag: (data.retransmit_flag !== null && typeof data.retransmit_flag !== 'undefined')
      ? uINTEGER.decode(data.retransmit_flag)
      : undefined,
    farmB_counter: (data.farmB_counter !== null && typeof data.farmB_counter !== 'undefined')
      ? uINTEGER.decode(data.farmB_counter)
      : undefined,
    event: (data.event !== null && typeof data.event !== 'undefined')
      ? uINTEGER.decode(data.event)
      : undefined,
    cLCW: (data.cLCW !== null && typeof data.cLCW !== 'undefined')
      ? uINTEGER.decode(data.cLCW)
      : undefined,
    v_S: (data.v_S !== null && typeof data.v_S !== 'undefined')
      ? uINTEGER.decode(data.v_S)
      : undefined,
    v_R: (data.v_R !== null && typeof data.v_R !== 'undefined')
      ? uINTEGER.decode(data.v_R)
      : undefined,
    n_R: (data.n_R !== null && typeof data.n_R !== 'undefined')
      ? uINTEGER.decode(data.n_R)
      : undefined,
    nN_R: (data.nN_R !== null && typeof data.nN_R !== 'undefined')
      ? iNTEGER.decode(data.nN_R)
      : undefined,
    num_frame: (data.num_frame !== null && typeof data.num_frame !== 'undefined')
      ? uINTEGER.decode(data.num_frame)
      : undefined,
    type_frame: (data.type_frame !== null && typeof data.type_frame !== 'undefined')
      ? { type: 'enum', value: data.type_frame, symbol: modeType[data.type_frame] }
      : undefined,
    nb_accepted_frames: (data.nb_accepted_frames !== null && typeof data.nb_accepted_frames !== 'undefined')
      ? uINTEGER.decode(data.nb_accepted_frames)
      : undefined,
    nb_confirmed_frames: (data.nb_confirmed_frames !== null && typeof data.nb_confirmed_frames !== 'undefined')
      ? uINTEGER.decode(data.nb_confirmed_frames)
      : undefined,
    nb_rejected_frames: (data.nb_rejected_frames !== null && typeof data.nb_rejected_frames !== 'undefined')
      ? uINTEGER.decode(data.nb_rejected_frames)
      : undefined,
    variable_display: (data.variable_display !== null && typeof data.variable_display !== 'undefined')
      ? uOCTET.decode(data.variable_display)
      : undefined,
    frame_display: (data.frame_display !== null && typeof data.frame_display !== 'undefined')
      ? uOCTET.decode(data.frame_display)
      : undefined,
  }),
};
