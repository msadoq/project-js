// Produced by Acceleo JavaScript Generator 1.1.0
const applyOverride = require('../../applyOverride');
const getClcwSegmentMask = require('./clcwSegmentMask');
const getIfQueueElement = require('./ifQueueElement');

module.exports = override => applyOverride({
  mode: 1,
  decoder: 1,
  controle_BD: true,
  N_R: -100,
  initiate_type: -100,
  N_R_other_VC: -100,
  initiate_type_other: -100,
  ifQueue: [getIfQueueElement(), getIfQueueElement()],
  N_R_alert: -100,
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
}, override);

