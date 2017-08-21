// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./cOP1IfAutoState');
const stub = require('./cOP1IfAutoState.stub')();

const decoderType = require('./decoderType');
const modeType = require('./modeType');
const sequenceType = require('./sequenceType');
const terminateType = require('./terminateType');

describe('protobuf/isis/cop1/COP1IfAutoState', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/COP1IfAutoState.proto`, { keepCase: true })
    .lookup('cop1.protobuf.COP1IfAutoState');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      mode: { type: 'enum', value: stub.mode, symbol: modeType[stub.mode] },
      decoder: { type: 'enum', value: stub.decoder, symbol: decoderType[stub.decoder] },
      controle_BD: { type: 'boolean', value: stub.controle_BD },
      n_R: { type: 'integer', value: stub.n_R },
      initiate_type: { type: 'integer', value: stub.initiate_type },
      n_R_other_VC: { type: 'integer', value: stub.n_R_other_VC },
      initiate_type_other: { type: 'integer', value: stub.initiate_type_other },
      n_R_alert: { type: 'integer', value: stub.n_R_alert },
      nb_emission_try: { type: 'integer', value: stub.nb_emission_try },
      operator_request: { type: 'integer', value: stub.operator_request },
      tm_hole_flag: { type: 'integer', value: stub.tm_hole_flag },
      nb_perturbation: { type: 'integer', value: stub.nb_perturbation },
      last_farm_B_counter: { type: 'integer', value: stub.last_farm_B_counter },
      satellite_indice: { type: 'integer', value: stub.satellite_indice },
      authentication_flag: { type: 'boolean', value: stub.authentication_flag },
      last_acknowledged_element: { type: 'integer', value: stub.last_acknowledged_element },
      emission_flag: { type: 'integer', value: stub.emission_flag },
      nb_unit: { type: 'integer', value: stub.nb_unit },
      action_type: { type: 'integer', value: stub.action_type },
      previous_action: { type: 'integer', value: stub.previous_action },
      terminate_type: { type: 'enum', value: stub.terminate_type, symbol: terminateType[stub.terminate_type] },
      clcw_mask: {
        sequence_flag: { type: 'boolean', value: stub.clcw_mask.sequence_flag },
        sequence_type: { type: 'enum', value: stub.clcw_mask.sequence_type, symbol: sequenceType[stub.clcw_mask.sequence_type] },
        map: {
          val: { type: 'integer', value: stub.clcw_mask.map.val },
          flag: { type: 'boolean', value: stub.clcw_mask.map.flag },
        },
        word_type: {
          val: { type: 'integer', value: stub.clcw_mask.word_type.val },
          flag: { type: 'boolean', value: stub.clcw_mask.word_type.flag },
        },
        vc_id: {
          val: { type: 'integer', value: stub.clcw_mask.vc_id.val },
          flag: { type: 'boolean', value: stub.clcw_mask.vc_id.flag },
        },
        farm_B_counter: {
          val: { type: 'integer', value: stub.clcw_mask.farm_B_counter.val },
          flag: { type: 'boolean', value: stub.clcw_mask.farm_B_counter.flag },
        },
        rF_flag: {
          val: { type: 'integer', value: stub.clcw_mask.rF_flag.val },
          flag: { type: 'boolean', value: stub.clcw_mask.rF_flag.flag },
        },
        synchro_flag: {
          val: { type: 'integer', value: stub.clcw_mask.synchro_flag.val },
          flag: { type: 'boolean', value: stub.clcw_mask.synchro_flag.flag },
        },
        close_flag: {
          val: { type: 'integer', value: stub.clcw_mask.close_flag.val },
          flag: { type: 'boolean', value: stub.clcw_mask.close_flag.flag },
        },
        wait_flag: {
          val: { type: 'integer', value: stub.clcw_mask.wait_flag.val },
          flag: { type: 'boolean', value: stub.clcw_mask.wait_flag.flag },
        },
        retransmit_flag: {
          val: { type: 'integer', value: stub.clcw_mask.retransmit_flag.val },
          flag: { type: 'boolean', value: stub.clcw_mask.retransmit_flag.flag },
        },
        report: {
          val: { type: 'integer', value: stub.clcw_mask.report.val },
          flag: { type: 'boolean', value: stub.clcw_mask.report.flag },
        },
        version_name: {
          val: { type: 'integer', value: stub.clcw_mask.version_name.val },
          flag: { type: 'boolean', value: stub.clcw_mask.version_name.flag },
        },
        state: {
          val: { type: 'integer', value: stub.clcw_mask.state.val },
          flag: { type: 'boolean', value: stub.clcw_mask.state.flag },
        },
        cop: {
          val: { type: 'integer', value: stub.clcw_mask.cop.val },
          flag: { type: 'boolean', value: stub.clcw_mask.cop.flag },
        },
      },
      next_segment_index: { type: 'integer', value: stub.next_segment_index },
    });
    expect(decoded.ifQueue).toHaveLength(stub.ifQueue.length);
    for (let i = 0; i < stub.ifQueue.length; i += 1) {
      expect(decoded.ifQueue[i]).toMatchObject({
        number: { type: 'integer', value: stub.ifQueue[i].number },
        reemission_delay: { type: 'float', value: stub.ifQueue[i].reemission_delay },
        date: { type: 'string', value: stub.ifQueue[i].date },
        segment_data: { type: 'blob', value: stub.ifQueue[i].segment_data },
        index: { type: 'integer', value: stub.ifQueue[i].index },
        priority: { type: 'integer', value: stub.ifQueue[i].priority },
      });
      expect(decoded.ifQueue[i].units).toHaveLength(stub.ifQueue[i].units.length);
      for (let ii = 0; ii < stub.ifQueue[i].units.length; ii += 1) {
        expect(decoded.ifQueue[i].units[ii]).toMatchObject({
          nb_remaining_bytes: { type: 'integer', value: stub.ifQueue[i].units[ii].nb_remaining_bytes },
          last_state: { type: 'boolean', value: stub.ifQueue[i].units[ii].last_state },
          mnemonic: { type: 'blob', value: stub.ifQueue[i].units[ii].mnemonic },
          nb_emitted_bytes: { type: 'integer', value: stub.ifQueue[i].units[ii].nb_emitted_bytes },
        });
        
      }
    }
  });
});
