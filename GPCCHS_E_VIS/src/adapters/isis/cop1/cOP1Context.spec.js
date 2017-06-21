// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./cOP1Context');
const { getCOP1Context } = require('../stubs');

const decoderType = require('./decoderType');
const modeType = require('./modeType');
const sequenceType = require('./sequenceType');
const terminateType = require('./terminateType');

describe('protobuf/isis/cop1/COP1Context', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/COP1Context.proto`, { keepCase: true })
    .lookup('cop1.protobuf.COP1Context');
  const fixture = getCOP1Context();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      cop1Status: {
        mode: { type: 'enum', value: fixture.cop1Status.mode, symbol: modeType[fixture.cop1Status.mode] },
        decoder: { type: 'enum', value: fixture.cop1Status.decoder, symbol: decoderType[fixture.cop1Status.decoder] },
        state: { type: 'uoctet', value: fixture.cop1Status.state },
        lockout_flag: { type: 'uoctet', value: fixture.cop1Status.lockout_flag },
        wait_flag: { type: 'uoctet', value: fixture.cop1Status.wait_flag },
        synchro_flag: { type: 'uoctet', value: fixture.cop1Status.synchro_flag },
        rF_flag: { type: 'uoctet', value: fixture.cop1Status.rF_flag },
        retransmit_flag: { type: 'uinteger', value: fixture.cop1Status.retransmit_flag },
        farmB_counter: { type: 'uinteger', value: fixture.cop1Status.farmB_counter },
        event: { type: 'uinteger', value: fixture.cop1Status.event },
        cLCW: { type: 'uinteger', value: fixture.cop1Status.cLCW },
        v_S: { type: 'uinteger', value: fixture.cop1Status.v_S },
        v_R: { type: 'uinteger', value: fixture.cop1Status.v_R },
        n_R: { type: 'uinteger', value: fixture.cop1Status.n_R },
        nN_R: { type: 'integer', value: fixture.cop1Status.nN_R },
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
        n_R: { type: 'integer', value: fixture.cop1IfAutoState.n_R },
        initiate_type: { type: 'integer', value: fixture.cop1IfAutoState.initiate_type },
        n_R_other_VC: { type: 'integer', value: fixture.cop1IfAutoState.n_R_other_VC },
        initiate_type_other: { type: 'integer', value: fixture.cop1IfAutoState.initiate_type_other },
        n_R_alert: { type: 'integer', value: fixture.cop1IfAutoState.n_R_alert },
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
          rF_flag: {
            val: { type: 'integer', value: fixture.cop1IfAutoState.clcw_mask.rF_flag.val },
            flag: { type: 'boolean', value: fixture.cop1IfAutoState.clcw_mask.rF_flag.flag },
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
        aD_out_flag: { type: 'uoctet', value: fixture.cOP1InternalState.aD_out_flag },
        v_S_nbmod: { type: 'uinteger', value: fixture.cOP1InternalState.v_S_nbmod },
        bC_out_flag: { type: 'uoctet', value: fixture.cOP1InternalState.bC_out_flag },
        bD_out_flag: { type: 'uoctet', value: fixture.cOP1InternalState.bD_out_flag },
        nN_R_nbmod: { type: 'uinteger', value: fixture.cOP1InternalState.nN_R_nbmod },
        transmission_limit: { type: 'uinteger', value: fixture.cOP1InternalState.transmission_limit },
        timeout_type: { type: 'uinteger', value: fixture.cOP1InternalState.timeout_type },
        transmission_count: { type: 'uinteger', value: fixture.cOP1InternalState.transmission_count },
        sliding_window_width: { type: 'uinteger', value: fixture.cOP1InternalState.sliding_window_width },
        t1_initial: { type: 'float', value: fixture.cOP1InternalState.t1_initial },
        regulation_tc_delay: { type: 'float', value: fixture.cOP1InternalState.regulation_tc_delay },
        suspend_state: { type: 'uoctet', value: fixture.cOP1InternalState.suspend_state },
        v_S: { type: 'uinteger', value: fixture.cOP1InternalState.v_S },
        state: { type: 'uinteger', value: fixture.cOP1InternalState.state },
        nN_R: { type: 'integer', value: fixture.cOP1InternalState.nN_R },
      },
      cLCW_decoder: { type: 'enum', value: fixture.cLCW_decoder, symbol: decoderType[fixture.cLCW_decoder] },
      retrans_mode: { type: 'boolean', value: fixture.retrans_mode },
      initvr_mode: { type: 'boolean', value: fixture.initvr_mode },
      entityKeyTime: { type: 'time', value: fixture.entityKeyTime },
    });
    
    
  });
});
