// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../stubs/index');

const protobuf = require('../../../index');

const decoderType = require('./decoderType');
const modeType = require('./modeType');
const sequenceType = require('./sequenceType');
const terminateType = require('./terminateType');

describe('protobuf/lpisis/cop1/COP1Context', () => {
  const fixture = stubData.getCOP1Context();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.cop1.COP1Context', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.cop1.COP1Context', buffer);
    json.should.be.an('object').that.have.properties({
      cop1Status: {
        mode: { type: 'enum', value: fixture.cop1Status.mode, symbol: modeType[fixture.cop1Status.mode] },
        decoder: { type: 'enum', value: fixture.cop1Status.decoder, symbol: decoderType[fixture.cop1Status.decoder] },
        state: { type: 'uoctet', value: fixture.cop1Status.state },
        lockout_flag: { type: 'uoctet', value: fixture.cop1Status.lockout_flag },
        wait_flag: { type: 'uoctet', value: fixture.cop1Status.wait_flag },
        synchro_flag: { type: 'uoctet', value: fixture.cop1Status.synchro_flag },
        RF_flag: { type: 'uoctet', value: fixture.cop1Status.RF_flag },
        retransmit_flag: { type: 'uinteger', value: fixture.cop1Status.retransmit_flag },
        FarmB_counter: { type: 'uinteger', value: fixture.cop1Status.FarmB_counter },
        event: { type: 'uinteger', value: fixture.cop1Status.event },
        CLCW: { type: 'uinteger', value: fixture.cop1Status.CLCW },
        V_S: { type: 'uinteger', value: fixture.cop1Status.V_S },
        V_R: { type: 'uinteger', value: fixture.cop1Status.V_R },
        N_R: { type: 'uinteger', value: fixture.cop1Status.N_R },
        NN_R: { type: 'integer', value: fixture.cop1Status.NN_R },
        num_frame: { type: 'uinteger', value: fixture.cop1Status.num_frame },
        type_frame: { type: 'enum', value: fixture.cop1Status.type_frame, symbol: modeType[fixture.cop1Status.type_frame] },
        nb_accepted_frames: { type: 'uinteger', value: fixture.cop1Status.nb_accepted_frames },
        nb_confirmed_frames: { type: 'uinteger', value: fixture.cop1Status.nb_confirmed_frames },
        nb_rejected_frames: { type: 'uinteger', value: fixture.cop1Status.nb_rejected_frames },
        variable_display: { type: 'uoctet', value: fixture.cop1Status.variable_display },
        frame_display: { type: 'uoctet', value: fixture.cop1Status.frame_display },
      },
      cop1IfAutoState: {
        mode: { type: 'enum', value: fixture.cop1IfAutoState.mode, symbol: modeType[fixture.cop1IfAutoState.mode] },
        decoder: { type: 'enum', value: fixture.cop1IfAutoState.decoder, symbol: decoderType[fixture.cop1IfAutoState.decoder] },
        controle_BD: { type: 'boolean', value: fixture.cop1IfAutoState.controle_BD },
        N_R: { type: 'integer', value: fixture.cop1IfAutoState.N_R },
        initiate_type: { type: 'integer', value: fixture.cop1IfAutoState.initiate_type },
        N_R_other_VC: { type: 'integer', value: fixture.cop1IfAutoState.N_R_other_VC },
        initiate_type_other: { type: 'integer', value: fixture.cop1IfAutoState.initiate_type_other },
        N_R_alert: { type: 'integer', value: fixture.cop1IfAutoState.N_R_alert },
        nb_emission_try: { type: 'integer', value: fixture.cop1IfAutoState.nb_emission_try },
        operator_request: { type: 'integer', value: fixture.cop1IfAutoState.operator_request },
        tm_hole_flag: { type: 'integer', value: fixture.cop1IfAutoState.tm_hole_flag },
        nb_perturbation: { type: 'integer', value: fixture.cop1IfAutoState.nb_perturbation },
        last_farm_B_counter: { type: 'integer', value: fixture.cop1IfAutoState.last_farm_B_counter },
        satellite_indice: { type: 'integer', value: fixture.cop1IfAutoState.satellite_indice },
        authentication_flag: { type: 'boolean', value: fixture.cop1IfAutoState.authentication_flag },
        last_acknowledged_element: { type: 'integer', value: fixture.cop1IfAutoState.last_acknowledged_element },
        emission_flag: { type: 'integer', value: fixture.cop1IfAutoState.emission_flag },
        nb_unit: { type: 'integer', value: fixture.cop1IfAutoState.nb_unit },
        action_type: { type: 'integer', value: fixture.cop1IfAutoState.action_type },
        previous_action: { type: 'integer', value: fixture.cop1IfAutoState.previous_action },
        terminate_type: { type: 'enum', value: fixture.cop1IfAutoState.terminate_type, symbol: terminateType[fixture.cop1IfAutoState.terminate_type] },
        clcw_mask: {
          sequence_flag: { type: 'boolean', value: fixture.cop1IfAutoState.clcw_mask.sequence_flag },
          sequence_type: { type: 'enum', value: fixture.cop1IfAutoState.clcw_mask.sequence_type, symbol: sequenceType[fixture.cop1IfAutoState.clcw_mask.sequence_type] },
          map: {
            val: { type: 'integer', value: fixture.cop1IfAutoState.clcw_mask.map.val },
            flag: { type: 'boolean', value: fixture.cop1IfAutoState.clcw_mask.map.flag },
          },
          word_type: {
            val: { type: 'integer', value: fixture.cop1IfAutoState.clcw_mask.word_type.val },
            flag: { type: 'boolean', value: fixture.cop1IfAutoState.clcw_mask.word_type.flag },
          },
          vc_id: {
            val: { type: 'integer', value: fixture.cop1IfAutoState.clcw_mask.vc_id.val },
            flag: { type: 'boolean', value: fixture.cop1IfAutoState.clcw_mask.vc_id.flag },
          },
          farm_B_counter: {
            val: { type: 'integer', value: fixture.cop1IfAutoState.clcw_mask.farm_B_counter.val },
            flag: { type: 'boolean', value: fixture.cop1IfAutoState.clcw_mask.farm_B_counter.flag },
          },
          RF_flag: {
            val: { type: 'integer', value: fixture.cop1IfAutoState.clcw_mask.RF_flag.val },
            flag: { type: 'boolean', value: fixture.cop1IfAutoState.clcw_mask.RF_flag.flag },
          },
          synchro_flag: {
            val: { type: 'integer', value: fixture.cop1IfAutoState.clcw_mask.synchro_flag.val },
            flag: { type: 'boolean', value: fixture.cop1IfAutoState.clcw_mask.synchro_flag.flag },
          },
          close_flag: {
            val: { type: 'integer', value: fixture.cop1IfAutoState.clcw_mask.close_flag.val },
            flag: { type: 'boolean', value: fixture.cop1IfAutoState.clcw_mask.close_flag.flag },
          },
          wait_flag: {
            val: { type: 'integer', value: fixture.cop1IfAutoState.clcw_mask.wait_flag.val },
            flag: { type: 'boolean', value: fixture.cop1IfAutoState.clcw_mask.wait_flag.flag },
          },
          retransmit_flag: {
            val: { type: 'integer', value: fixture.cop1IfAutoState.clcw_mask.retransmit_flag.val },
            flag: { type: 'boolean', value: fixture.cop1IfAutoState.clcw_mask.retransmit_flag.flag },
          },
          report: {
            val: { type: 'integer', value: fixture.cop1IfAutoState.clcw_mask.report.val },
            flag: { type: 'boolean', value: fixture.cop1IfAutoState.clcw_mask.report.flag },
          },
          version_name: {
            val: { type: 'integer', value: fixture.cop1IfAutoState.clcw_mask.version_name.val },
            flag: { type: 'boolean', value: fixture.cop1IfAutoState.clcw_mask.version_name.flag },
          },
          state: {
            val: { type: 'integer', value: fixture.cop1IfAutoState.clcw_mask.state.val },
            flag: { type: 'boolean', value: fixture.cop1IfAutoState.clcw_mask.state.flag },
          },
          cop: {
            val: { type: 'integer', value: fixture.cop1IfAutoState.clcw_mask.cop.val },
            flag: { type: 'boolean', value: fixture.cop1IfAutoState.clcw_mask.cop.flag },
          },
        },
        next_segment_index: { type: 'integer', value: fixture.cop1IfAutoState.next_segment_index },
      },
      cop1SentQueue: {

      },
      cop1WaitQueue: {
        internal_id: { type: 'integer', value: fixture.cop1WaitQueue.internal_id },
        frame_data: { type: 'blob', value: fixture.cop1WaitQueue.frame_data },
        reemission_delay: { type: 'float', value: fixture.cop1WaitQueue.reemission_delay },
      },
      gpmcc1State: {

      },
      cOP1InternalState: {
        stored_lockout_flag: { type: 'uoctet', value: fixture.cOP1InternalState.stored_lockout_flag },
        stored_wait_flag: { type: 'uoctet', value: fixture.cOP1InternalState.stored_wait_flag },
        stored_restransmit_flag: { type: 'uoctet', value: fixture.cOP1InternalState.stored_restransmit_flag },
        AD_out_flag: { type: 'uoctet', value: fixture.cOP1InternalState.AD_out_flag },
        V_S_nbmod: { type: 'uinteger', value: fixture.cOP1InternalState.V_S_nbmod },
        BC_out_flag: { type: 'uoctet', value: fixture.cOP1InternalState.BC_out_flag },
        BD_out_flag: { type: 'uoctet', value: fixture.cOP1InternalState.BD_out_flag },
        NN_R_nbmod: { type: 'uinteger', value: fixture.cOP1InternalState.NN_R_nbmod },
        transmission_limit: { type: 'uinteger', value: fixture.cOP1InternalState.transmission_limit },
        timeout_type: { type: 'uinteger', value: fixture.cOP1InternalState.timeout_type },
        transmission_count: { type: 'uinteger', value: fixture.cOP1InternalState.transmission_count },
        sliding_window_width: { type: 'uinteger', value: fixture.cOP1InternalState.sliding_window_width },
        T1_initial: { type: 'float', value: fixture.cOP1InternalState.T1_initial },
        regulation_tc_delay: { type: 'float', value: fixture.cOP1InternalState.regulation_tc_delay },
        suspend_state: { type: 'uoctet', value: fixture.cOP1InternalState.suspend_state },
        V_S: { type: 'uinteger', value: fixture.cOP1InternalState.V_S },
        state: { type: 'uinteger', value: fixture.cOP1InternalState.state },
        NN_R: { type: 'integer', value: fixture.cOP1InternalState.NN_R },
      },
      CLCW_decoder: { type: 'enum', value: fixture.CLCW_decoder, symbol: decoderType[fixture.CLCW_decoder] },
      retrans_mode: { type: 'boolean', value: fixture.retrans_mode },
      initvr_mode: { type: 'boolean', value: fixture.initvr_mode },
      entityKeyTime: { type: 'time', value: fixture.entityKeyTime },
    });
  });
});

