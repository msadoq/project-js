// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./cOP1IfAutoState');
const { getCOP1IfAutoState } = require('../stubs');

const decoderType = require('./decoderType');
const modeType = require('./modeType');
const sequenceType = require('./sequenceType');
const terminateType = require('./terminateType');

describe('protobuf/isis/cop1/COP1IfAutoState', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/COP1IfAutoState.proto`, { keepCase: true })
    .lookup('cop1.protobuf.COP1IfAutoState');
  const fixture = getCOP1IfAutoState();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      mode: { type: 'enum', value: fixture.mode, symbol: modeType[fixture.mode] },
      decoder: { type: 'enum', value: fixture.decoder, symbol: decoderType[fixture.decoder] },
      controle_BD: { type: 'boolean', value: fixture.controle_BD },
      n_R: { type: 'integer', value: fixture.n_R },
      initiate_type: { type: 'integer', value: fixture.initiate_type },
      n_R_other_VC: { type: 'integer', value: fixture.n_R_other_VC },
      initiate_type_other: { type: 'integer', value: fixture.initiate_type_other },
      n_R_alert: { type: 'integer', value: fixture.n_R_alert },
      nb_emission_try: { type: 'integer', value: fixture.nb_emission_try },
      operator_request: { type: 'integer', value: fixture.operator_request },
      tm_hole_flag: { type: 'integer', value: fixture.tm_hole_flag },
      nb_perturbation: { type: 'integer', value: fixture.nb_perturbation },
      last_farm_B_counter: { type: 'integer', value: fixture.last_farm_B_counter },
      satellite_indice: { type: 'integer', value: fixture.satellite_indice },
      authentication_flag: { type: 'boolean', value: fixture.authentication_flag },
      last_acknowledged_element: { type: 'integer', value: fixture.last_acknowledged_element },
      emission_flag: { type: 'integer', value: fixture.emission_flag },
      nb_unit: { type: 'integer', value: fixture.nb_unit },
      action_type: { type: 'integer', value: fixture.action_type },
      previous_action: { type: 'integer', value: fixture.previous_action },
      terminate_type: { type: 'enum', value: fixture.terminate_type, symbol: terminateType[fixture.terminate_type] },
      clcw_mask: {
        sequence_flag: { type: 'boolean', value: fixture.clcw_mask.sequence_flag },
        sequence_type: { type: 'enum', value: fixture.clcw_mask.sequence_type, symbol: sequenceType[fixture.clcw_mask.sequence_type] },
        map: {
          val: { type: 'integer', value: fixture.clcw_mask.map.val },
          flag: { type: 'boolean', value: fixture.clcw_mask.map.flag },
        },
        word_type: {
          val: { type: 'integer', value: fixture.clcw_mask.word_type.val },
          flag: { type: 'boolean', value: fixture.clcw_mask.word_type.flag },
        },
        vc_id: {
          val: { type: 'integer', value: fixture.clcw_mask.vc_id.val },
          flag: { type: 'boolean', value: fixture.clcw_mask.vc_id.flag },
        },
        farm_B_counter: {
          val: { type: 'integer', value: fixture.clcw_mask.farm_B_counter.val },
          flag: { type: 'boolean', value: fixture.clcw_mask.farm_B_counter.flag },
        },
        rF_flag: {
          val: { type: 'integer', value: fixture.clcw_mask.rF_flag.val },
          flag: { type: 'boolean', value: fixture.clcw_mask.rF_flag.flag },
        },
        synchro_flag: {
          val: { type: 'integer', value: fixture.clcw_mask.synchro_flag.val },
          flag: { type: 'boolean', value: fixture.clcw_mask.synchro_flag.flag },
        },
        close_flag: {
          val: { type: 'integer', value: fixture.clcw_mask.close_flag.val },
          flag: { type: 'boolean', value: fixture.clcw_mask.close_flag.flag },
        },
        wait_flag: {
          val: { type: 'integer', value: fixture.clcw_mask.wait_flag.val },
          flag: { type: 'boolean', value: fixture.clcw_mask.wait_flag.flag },
        },
        retransmit_flag: {
          val: { type: 'integer', value: fixture.clcw_mask.retransmit_flag.val },
          flag: { type: 'boolean', value: fixture.clcw_mask.retransmit_flag.flag },
        },
        report: {
          val: { type: 'integer', value: fixture.clcw_mask.report.val },
          flag: { type: 'boolean', value: fixture.clcw_mask.report.flag },
        },
        version_name: {
          val: { type: 'integer', value: fixture.clcw_mask.version_name.val },
          flag: { type: 'boolean', value: fixture.clcw_mask.version_name.flag },
        },
        state: {
          val: { type: 'integer', value: fixture.clcw_mask.state.val },
          flag: { type: 'boolean', value: fixture.clcw_mask.state.flag },
        },
        cop: {
          val: { type: 'integer', value: fixture.clcw_mask.cop.val },
          flag: { type: 'boolean', value: fixture.clcw_mask.cop.flag },
        },
      },
      next_segment_index: { type: 'integer', value: fixture.next_segment_index },
    });
    
    json.ifQueue.should.be.an('array').that.have.lengthOf(fixture.ifQueue.length);
    for (let i = 0; i < fixture.ifQueue.length; i += 1) {
      json.ifQueue[i].should.be.an('object').that.have.properties({
        number: { type: 'integer', value: fixture.ifQueue[i].number },
        reemission_delay: { type: 'float', value: fixture.ifQueue[i].reemission_delay },
        date: { type: 'string', value: fixture.ifQueue[i].date },
        segment_data: { type: 'blob', value: fixture.ifQueue[i].segment_data },
        index: { type: 'integer', value: fixture.ifQueue[i].index },
        priority: { type: 'integer', value: fixture.ifQueue[i].priority },
      });
      json.ifQueue[i].units.should.be.an('array').that.have.lengthOf(fixture.ifQueue[i].units.length);
      for (let ii = 0; ii < fixture.ifQueue[i].units.length; ii += 1) {
        json.ifQueue[i].units[ii].should.be.an('object').that.have.properties({
          nb_remaining_bytes: { type: 'integer', value: fixture.ifQueue[i].units[ii].nb_remaining_bytes },
          last_state: { type: 'boolean', value: fixture.ifQueue[i].units[ii].last_state },
          mnemonic: { type: 'blob', value: fixture.ifQueue[i].units[ii].mnemonic },
          nb_emitted_bytes: { type: 'integer', value: fixture.ifQueue[i].units[ii].nb_emitted_bytes },
        });
        
      }
    }
  });
});
