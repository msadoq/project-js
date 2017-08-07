// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./proccessedTC');
const stub = require('./proccessedTC.stub')();



describe('protobuf/isis/cop1/ProccessedTC', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/ProccessedTC.proto`, { keepCase: true })
    .lookup('cop1.protobuf.ProccessedTC');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      tCID: { type: 'identifier', value: stub.tCID },
      receivedDate: { type: 'time', value: stub.receivedDate },
      rawtc_data: { type: 'blob', value: stub.rawtc_data },
    });
    expect(decoded.segment_id).toHaveLength(stub.segment_id.length);
    for (let i = 0; i < stub.segment_id.length; i += 1) {
      expect(decoded.segment_id[i]).toMatchObject({
        type: 'uinteger',
        value: stub.segment_id[i],
      });
    }
  });
});
