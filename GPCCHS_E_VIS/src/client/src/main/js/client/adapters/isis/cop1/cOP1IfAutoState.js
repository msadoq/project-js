// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const clcwSegmentMask = require('./clcwSegmentMask');
const decoderType = require('./decoderType');
const iNTEGER = require('../ccsds_mal/iNTEGER');
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
      ? bOOLEAN.encode(data.controle_BD)
      : null,
    n_R: (data.n_R !== null && typeof data.n_R !== 'undefined')
      ? iNTEGER.encode(data.n_R)
      : null,
    initiate_type: (data.initiate_type !== null && typeof data.initiate_type !== 'undefined')
      ? iNTEGER.encode(data.initiate_type)
      : null,
    n_R_other_VC: (data.n_R_other_VC !== null && typeof data.n_R_other_VC !== 'undefined')
      ? iNTEGER.encode(data.n_R_other_VC)
      : null,
    initiate_type_other: (data.initiate_type_other !== null && typeof data.initiate_type_other !== 'undefined')
      ? iNTEGER.encode(data.initiate_type_other)
      : null,
    ifQueue: _map(data.ifQueue, d => (ifQueueElement.encode(d))),
    n_R_alert: (data.n_R_alert !== null && typeof data.n_R_alert !== 'undefined')
      ? iNTEGER.encode(data.n_R_alert)
      : null,
    nb_emission_try: (data.nb_emission_try !== null && typeof data.nb_emission_try !== 'undefined')
      ? iNTEGER.encode(data.nb_emission_try)
      : null,
    operator_request: (data.operator_request !== null && typeof data.operator_request !== 'undefined')
      ? iNTEGER.encode(data.operator_request)
      : null,
    tm_hole_flag: (data.tm_hole_flag !== null && typeof data.tm_hole_flag !== 'undefined')
      ? iNTEGER.encode(data.tm_hole_flag)
      : null,
    nb_perturbation: (data.nb_perturbation !== null && typeof data.nb_perturbation !== 'undefined')
      ? iNTEGER.encode(data.nb_perturbation)
      : null,
    last_farm_B_counter: (data.last_farm_B_counter !== null && typeof data.last_farm_B_counter !== 'undefined')
      ? iNTEGER.encode(data.last_farm_B_counter)
      : null,
    satellite_indice: (data.satellite_indice !== null && typeof data.satellite_indice !== 'undefined')
      ? iNTEGER.encode(data.satellite_indice)
      : null,
    authentication_flag: (data.authentication_flag !== null && typeof data.authentication_flag !== 'undefined')
      ? bOOLEAN.encode(data.authentication_flag)
      : null,
    last_acknowledged_element: (data.last_acknowledged_element !== null && typeof data.last_acknowledged_element !== 'undefined')
      ? iNTEGER.encode(data.last_acknowledged_element)
      : null,
    emission_flag: (data.emission_flag !== null && typeof data.emission_flag !== 'undefined')
      ? iNTEGER.encode(data.emission_flag)
      : null,
    nb_unit: (data.nb_unit !== null && typeof data.nb_unit !== 'undefined')
      ? iNTEGER.encode(data.nb_unit)
      : null,
    action_type: (data.action_type !== null && typeof data.action_type !== 'undefined')
      ? iNTEGER.encode(data.action_type)
      : null,
    previous_action: (data.previous_action !== null && typeof data.previous_action !== 'undefined')
      ? iNTEGER.encode(data.previous_action)
      : null,
    terminate_type: (data.terminate_type !== null && typeof data.terminate_type !== 'undefined')
      ? data.terminate_type
      : null,
    clcw_mask: (data.clcw_mask !== null && typeof data.clcw_mask !== 'undefined')
      ? clcwSegmentMask.encode(data.clcw_mask)
      : null,
    next_segment_index: (data.next_segment_index !== null && typeof data.next_segment_index !== 'undefined')
      ? iNTEGER.encode(data.next_segment_index)
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
      ? bOOLEAN.decode(data.controle_BD)
      : undefined,
    n_R: (data.n_R !== null && typeof data.n_R !== 'undefined')
      ? iNTEGER.decode(data.n_R)
      : undefined,
    initiate_type: (data.initiate_type !== null && typeof data.initiate_type !== 'undefined')
      ? iNTEGER.decode(data.initiate_type)
      : undefined,
    n_R_other_VC: (data.n_R_other_VC !== null && typeof data.n_R_other_VC !== 'undefined')
      ? iNTEGER.decode(data.n_R_other_VC)
      : undefined,
    initiate_type_other: (data.initiate_type_other !== null && typeof data.initiate_type_other !== 'undefined')
      ? iNTEGER.decode(data.initiate_type_other)
      : undefined,
    ifQueue: _map(data.ifQueue, d => (ifQueueElement.decode(d))),
    n_R_alert: (data.n_R_alert !== null && typeof data.n_R_alert !== 'undefined')
      ? iNTEGER.decode(data.n_R_alert)
      : undefined,
    nb_emission_try: (data.nb_emission_try !== null && typeof data.nb_emission_try !== 'undefined')
      ? iNTEGER.decode(data.nb_emission_try)
      : undefined,
    operator_request: (data.operator_request !== null && typeof data.operator_request !== 'undefined')
      ? iNTEGER.decode(data.operator_request)
      : undefined,
    tm_hole_flag: (data.tm_hole_flag !== null && typeof data.tm_hole_flag !== 'undefined')
      ? iNTEGER.decode(data.tm_hole_flag)
      : undefined,
    nb_perturbation: (data.nb_perturbation !== null && typeof data.nb_perturbation !== 'undefined')
      ? iNTEGER.decode(data.nb_perturbation)
      : undefined,
    last_farm_B_counter: (data.last_farm_B_counter !== null && typeof data.last_farm_B_counter !== 'undefined')
      ? iNTEGER.decode(data.last_farm_B_counter)
      : undefined,
    satellite_indice: (data.satellite_indice !== null && typeof data.satellite_indice !== 'undefined')
      ? iNTEGER.decode(data.satellite_indice)
      : undefined,
    authentication_flag: (data.authentication_flag !== null && typeof data.authentication_flag !== 'undefined')
      ? bOOLEAN.decode(data.authentication_flag)
      : undefined,
    last_acknowledged_element: (data.last_acknowledged_element !== null && typeof data.last_acknowledged_element !== 'undefined')
      ? iNTEGER.decode(data.last_acknowledged_element)
      : undefined,
    emission_flag: (data.emission_flag !== null && typeof data.emission_flag !== 'undefined')
      ? iNTEGER.decode(data.emission_flag)
      : undefined,
    nb_unit: (data.nb_unit !== null && typeof data.nb_unit !== 'undefined')
      ? iNTEGER.decode(data.nb_unit)
      : undefined,
    action_type: (data.action_type !== null && typeof data.action_type !== 'undefined')
      ? iNTEGER.decode(data.action_type)
      : undefined,
    previous_action: (data.previous_action !== null && typeof data.previous_action !== 'undefined')
      ? iNTEGER.decode(data.previous_action)
      : undefined,
    terminate_type: (data.terminate_type !== null && typeof data.terminate_type !== 'undefined')
      ? { type: 'enum', value: data.terminate_type, symbol: terminateType[data.terminate_type] }
      : undefined,
    clcw_mask: (data.clcw_mask !== null && typeof data.clcw_mask !== 'undefined')
      ? clcwSegmentMask.decode(data.clcw_mask)
      : undefined,
    next_segment_index: (data.next_segment_index !== null && typeof data.next_segment_index !== 'undefined')
      ? iNTEGER.decode(data.next_segment_index)
      : undefined,
  }),
};
