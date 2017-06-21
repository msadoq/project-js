// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./clcwSegmentMask');
const { getClcwSegmentMask } = require('../stubs');

const sequenceType = require('./sequenceType');

describe('protobuf/isis/cop1/ClcwSegmentMask', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/ClcwSegmentMask.proto`, { keepCase: true })
    .lookup('cop1.protobuf.ClcwSegmentMask');
  const fixture = getClcwSegmentMask();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      sequence_flag: { type: 'boolean', value: fixture.sequence_flag },
      sequence_type: { type: 'enum', value: fixture.sequence_type, symbol: sequenceType[fixture.sequence_type] },
      map: {
        val: { type: 'integer', value: fixture.map.val },
        flag: { type: 'boolean', value: fixture.map.flag },
      },
      word_type: {
        val: { type: 'integer', value: fixture.word_type.val },
        flag: { type: 'boolean', value: fixture.word_type.flag },
      },
      vc_id: {
        val: { type: 'integer', value: fixture.vc_id.val },
        flag: { type: 'boolean', value: fixture.vc_id.flag },
      },
      farm_B_counter: {
        val: { type: 'integer', value: fixture.farm_B_counter.val },
        flag: { type: 'boolean', value: fixture.farm_B_counter.flag },
      },
      rF_flag: {
        val: { type: 'integer', value: fixture.rF_flag.val },
        flag: { type: 'boolean', value: fixture.rF_flag.flag },
      },
      synchro_flag: {
        val: { type: 'integer', value: fixture.synchro_flag.val },
        flag: { type: 'boolean', value: fixture.synchro_flag.flag },
      },
      close_flag: {
        val: { type: 'integer', value: fixture.close_flag.val },
        flag: { type: 'boolean', value: fixture.close_flag.flag },
      },
      wait_flag: {
        val: { type: 'integer', value: fixture.wait_flag.val },
        flag: { type: 'boolean', value: fixture.wait_flag.flag },
      },
      retransmit_flag: {
        val: { type: 'integer', value: fixture.retransmit_flag.val },
        flag: { type: 'boolean', value: fixture.retransmit_flag.flag },
      },
      report: {
        val: { type: 'integer', value: fixture.report.val },
        flag: { type: 'boolean', value: fixture.report.flag },
      },
      version_name: {
        val: { type: 'integer', value: fixture.version_name.val },
        flag: { type: 'boolean', value: fixture.version_name.flag },
      },
      state: {
        val: { type: 'integer', value: fixture.state.val },
        flag: { type: 'boolean', value: fixture.state.flag },
      },
      cop: {
        val: { type: 'integer', value: fixture.cop.val },
        flag: { type: 'boolean', value: fixture.cop.flag },
      },
    });
    
    
  });
});
