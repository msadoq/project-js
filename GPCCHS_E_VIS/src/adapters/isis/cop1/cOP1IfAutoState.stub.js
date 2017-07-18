// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getClcwSegmentMask = require('./clcwSegmentMask.stub');
const getIfQueueElement = require('./ifQueueElement.stub');

const cOP1IfAutoState = {
  mode: 1,
  decoder: 1,
  controle_BD: true,
  n_R: -100,
  initiate_type: -100,
  n_R_other_VC: -100,
  initiate_type_other: -100,
  ifQueue: [getIfQueueElement(), getIfQueueElement()],
  n_R_alert: -100,
  nb_emission_try: -100,
  operator_request: -100,
  tm_hole_flag: -100,
  nb_perturbation: -100,
  last_farm_B_counter: -100,
  satellite_indice: -100,
  authentication_flag: true,
  last_acknowledged_element: -100,
  emission_flag: -100,
  nb_unit: -100,
  action_type: -100,
  previous_action: -100,
  terminate_type: 5,
  clcw_mask: getClcwSegmentMask(),
  next_segment_index: -100,
};

module.exports = override => (override ? _defaultsDeep({}, override, cOP1IfAutoState) : cOP1IfAutoState);
