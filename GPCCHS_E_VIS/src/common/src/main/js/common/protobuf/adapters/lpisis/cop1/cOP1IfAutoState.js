// Produced by Acceleo JavaScript Generator 1.1.0
/* eslint-disable complexity, "DV6 TBC_CNES Generated code complexity is not avoidable" */

const _map = require('lodash/map');
const clcwSegmentMask = require('./clcwSegmentMask');
const decoderType = require('./decoderType');
const ifQueueElement = require('./ifQueueElement');
const modeType = require('./modeType');
const terminateType = require('./terminateType');

module.exports = {
  encode: data => ({
    mode: (data.mode !== null && typeof data.mode !== 'undefined')
      ? data.mode
      : null,
    decoder: (data.decoder !== null && typeof data.decoder !== 'undefined')
      ? data.decoder
      : null,
    controle_BD: (data.controle_BD !== null && typeof data.controle_BD !== 'undefined')
      ? { value: data.controle_BD }
      : null,
    N_R: (data.N_R !== null && typeof data.N_R !== 'undefined')
      ? { value: data.N_R }
      : null,
    initiate_type: (data.initiate_type !== null && typeof data.initiate_type !== 'undefined')
      ? { value: data.initiate_type }
      : null,
    N_R_other_VC: (data.N_R_other_VC !== null && typeof data.N_R_other_VC !== 'undefined')
      ? { value: data.N_R_other_VC }
      : null,
    initiate_type_other: (data.initiate_type_other !== null && typeof data.initiate_type_other !== 'undefined')
      ? { value: data.initiate_type_other }
      : null,
    ifQueue: _map(data.ifQueue, d => (ifQueueElement.encode(d))),
    N_R_alert: (data.N_R_alert !== null && typeof data.N_R_alert !== 'undefined')
      ? { value: data.N_R_alert }
      : null,
    nb_emission_try: (data.nb_emission_try !== null && typeof data.nb_emission_try !== 'undefined')
      ? { value: data.nb_emission_try }
      : null,
    operator_request: (data.operator_request !== null && typeof data.operator_request !== 'undefined')
      ? { value: data.operator_request }
      : null,
    tm_hole_flag: (data.tm_hole_flag !== null && typeof data.tm_hole_flag !== 'undefined')
      ? { value: data.tm_hole_flag }
      : null,
    nb_perturbation: (data.nb_perturbation !== null && typeof data.nb_perturbation !== 'undefined')
      ? { value: data.nb_perturbation }
      : null,
    last_farm_B_counter: (data.last_farm_B_counter !== null && typeof data.last_farm_B_counter !== 'undefined')
      ? { value: data.last_farm_B_counter }
      : null,
    satellite_indice: (data.satellite_indice !== null && typeof data.satellite_indice !== 'undefined')
      ? { value: data.satellite_indice }
      : null,
    authentication_flag: (data.authentication_flag !== null && typeof data.authentication_flag !== 'undefined')
      ? { value: data.authentication_flag }
      : null,
    last_acknowledged_element: (data.last_acknowledged_element !== null && typeof data.last_acknowledged_element !== 'undefined')
      ? { value: data.last_acknowledged_element }
      : null,
    emission_flag: (data.emission_flag !== null && typeof data.emission_flag !== 'undefined')
      ? { value: data.emission_flag }
      : null,
    nb_unit: (data.nb_unit !== null && typeof data.nb_unit !== 'undefined')
      ? { value: data.nb_unit }
      : null,
    action_type: (data.action_type !== null && typeof data.action_type !== 'undefined')
      ? { value: data.action_type }
      : null,
    previous_action: (data.previous_action !== null && typeof data.previous_action !== 'undefined')
      ? { value: data.previous_action }
      : null,
    terminate_type: (data.terminate_type !== null && typeof data.terminate_type !== 'undefined')
      ? data.terminate_type
      : null,
    clcw_mask: (data.clcw_mask !== null && typeof data.clcw_mask !== 'undefined')
      ? clcwSegmentMask.encode(data.clcw_mask)
      : null,
    next_segment_index: (data.next_segment_index !== null && typeof data.next_segment_index !== 'undefined')
      ? { value: data.next_segment_index }
      : null,
  }),
  decode: data => ({
    mode: (data.mode !== null && typeof data.mode !== 'undefined')
      ? { type: 'enum', value: data.mode, symbol: modeType[data.mode] }
      : undefined,
    decoder: (data.decoder !== null && typeof data.decoder !== 'undefined')
      ? { type: 'enum', value: data.decoder, symbol: decoderType[data.decoder] }
      : undefined,
    controle_BD: (data.controle_BD !== null && typeof data.controle_BD !== 'undefined')
      ? { type: 'boolean', value: data.controle_BD.value }
      : undefined,
    N_R: (data.N_R !== null && typeof data.N_R !== 'undefined')
      ? { type: 'integer', value: data.N_R.value }
      : undefined,
    initiate_type: (data.initiate_type !== null && typeof data.initiate_type !== 'undefined')
      ? { type: 'integer', value: data.initiate_type.value }
      : undefined,
    N_R_other_VC: (data.N_R_other_VC !== null && typeof data.N_R_other_VC !== 'undefined')
      ? { type: 'integer', value: data.N_R_other_VC.value }
      : undefined,
    initiate_type_other: (data.initiate_type_other !== null && typeof data.initiate_type_other !== 'undefined')
      ? { type: 'integer', value: data.initiate_type_other.value }
      : undefined,
    ifQueue: _map(data.ifQueue, d => (ifQueueElement.decode(d))),
    N_R_alert: (data.N_R_alert !== null && typeof data.N_R_alert !== 'undefined')
      ? { type: 'integer', value: data.N_R_alert.value }
      : undefined,
    nb_emission_try: (data.nb_emission_try !== null && typeof data.nb_emission_try !== 'undefined')
      ? { type: 'integer', value: data.nb_emission_try.value }
      : undefined,
    operator_request: (data.operator_request !== null && typeof data.operator_request !== 'undefined')
      ? { type: 'integer', value: data.operator_request.value }
      : undefined,
    tm_hole_flag: (data.tm_hole_flag !== null && typeof data.tm_hole_flag !== 'undefined')
      ? { type: 'integer', value: data.tm_hole_flag.value }
      : undefined,
    nb_perturbation: (data.nb_perturbation !== null && typeof data.nb_perturbation !== 'undefined')
      ? { type: 'integer', value: data.nb_perturbation.value }
      : undefined,
    last_farm_B_counter: (data.last_farm_B_counter !== null && typeof data.last_farm_B_counter !== 'undefined')
      ? { type: 'integer', value: data.last_farm_B_counter.value }
      : undefined,
    satellite_indice: (data.satellite_indice !== null && typeof data.satellite_indice !== 'undefined')
      ? { type: 'integer', value: data.satellite_indice.value }
      : undefined,
    authentication_flag: (data.authentication_flag !== null && typeof data.authentication_flag !== 'undefined')
      ? { type: 'boolean', value: data.authentication_flag.value }
      : undefined,
    last_acknowledged_element: (data.last_acknowledged_element !== null && typeof data.last_acknowledged_element !== 'undefined')
      ? { type: 'integer', value: data.last_acknowledged_element.value }
      : undefined,
    emission_flag: (data.emission_flag !== null && typeof data.emission_flag !== 'undefined')
      ? { type: 'integer', value: data.emission_flag.value }
      : undefined,
    nb_unit: (data.nb_unit !== null && typeof data.nb_unit !== 'undefined')
      ? { type: 'integer', value: data.nb_unit.value }
      : undefined,
    action_type: (data.action_type !== null && typeof data.action_type !== 'undefined')
      ? { type: 'integer', value: data.action_type.value }
      : undefined,
    previous_action: (data.previous_action !== null && typeof data.previous_action !== 'undefined')
      ? { type: 'integer', value: data.previous_action.value }
      : undefined,
    terminate_type: (data.terminate_type !== null && typeof data.terminate_type !== 'undefined')
      ? { type: 'enum', value: data.terminate_type, symbol: terminateType[data.terminate_type] }
      : undefined,
    clcw_mask: (data.clcw_mask !== null && typeof data.clcw_mask !== 'undefined')
      ? clcwSegmentMask.decode(data.clcw_mask)
      : undefined,
    next_segment_index: (data.next_segment_index !== null && typeof data.next_segment_index !== 'undefined')
      ? { type: 'integer', value: data.next_segment_index.value }
      : undefined,
  }),
};

