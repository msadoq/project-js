// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const cOP1Status = {
  mode: 1,
  decoder: 1,
  state: 1,
  lockout_flag: 1,
  wait_flag: 1,
  synchro_flag: 1,
  rF_flag: 1,
  retransmit_flag: 100,
  farmB_counter: 100,
  event: 100,
  cLCW: 100,
  v_S: 100,
  v_R: 100,
  n_R: 100,
  nN_R: -100,
  num_frame: 100,
  type_frame: 1,
  nb_accepted_frames: 100,
  nb_confirmed_frames: 100,
  nb_rejected_frames: 100,
  variable_display: 1,
  frame_display: 1,
};

module.exports = override => (override ? _defaultsDeep({}, override, cOP1Status) : cOP1Status);
