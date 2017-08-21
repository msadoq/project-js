// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./clcwSegmentMask');
const stub = require('./clcwSegmentMask.stub')();

const sequenceType = require('./sequenceType');

describe('protobuf/isis/cop1/ClcwSegmentMask', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/ClcwSegmentMask.proto`, { keepCase: true })
    .lookup('cop1.protobuf.ClcwSegmentMask');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      sequence_flag: { type: 'boolean', value: stub.sequence_flag },
      sequence_type: { type: 'enum', value: stub.sequence_type, symbol: sequenceType[stub.sequence_type] },
      map: {
        val: { type: 'integer', value: stub.map.val },
        flag: { type: 'boolean', value: stub.map.flag },
      },
      word_type: {
        val: { type: 'integer', value: stub.word_type.val },
        flag: { type: 'boolean', value: stub.word_type.flag },
      },
      vc_id: {
        val: { type: 'integer', value: stub.vc_id.val },
        flag: { type: 'boolean', value: stub.vc_id.flag },
      },
      farm_B_counter: {
        val: { type: 'integer', value: stub.farm_B_counter.val },
        flag: { type: 'boolean', value: stub.farm_B_counter.flag },
      },
      rF_flag: {
        val: { type: 'integer', value: stub.rF_flag.val },
        flag: { type: 'boolean', value: stub.rF_flag.flag },
      },
      synchro_flag: {
        val: { type: 'integer', value: stub.synchro_flag.val },
        flag: { type: 'boolean', value: stub.synchro_flag.flag },
      },
      close_flag: {
        val: { type: 'integer', value: stub.close_flag.val },
        flag: { type: 'boolean', value: stub.close_flag.flag },
      },
      wait_flag: {
        val: { type: 'integer', value: stub.wait_flag.val },
        flag: { type: 'boolean', value: stub.wait_flag.flag },
      },
      retransmit_flag: {
        val: { type: 'integer', value: stub.retransmit_flag.val },
        flag: { type: 'boolean', value: stub.retransmit_flag.flag },
      },
      report: {
        val: { type: 'integer', value: stub.report.val },
        flag: { type: 'boolean', value: stub.report.flag },
      },
      version_name: {
        val: { type: 'integer', value: stub.version_name.val },
        flag: { type: 'boolean', value: stub.version_name.flag },
      },
      state: {
        val: { type: 'integer', value: stub.state.val },
        flag: { type: 'boolean', value: stub.state.flag },
      },
      cop: {
        val: { type: 'integer', value: stub.cop.val },
        flag: { type: 'boolean', value: stub.cop.flag },
      },
    });
    
  });
});
