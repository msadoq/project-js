// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./gPMCC1State');
const stub = require('./gPMCC1State.stub')();



describe('protobuf/isis/cop1/GPMCC1State', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/GPMCC1State.proto`, { keepCase: true })
    .lookup('cop1.protobuf.GPMCC1State');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      
    });
    expect(decoded.proccessedTC).toHaveLength(stub.proccessedTC.length);
    for (let i = 0; i < stub.proccessedTC.length; i += 1) {
      expect(decoded.proccessedTC[i]).toMatchObject({
        tCID: { type: 'identifier', value: stub.proccessedTC[i].tCID },
        receivedDate: { type: 'time', value: stub.proccessedTC[i].receivedDate },
        rawtc_data: { type: 'blob', value: stub.proccessedTC[i].rawtc_data },
      });
      expect(decoded.proccessedTC[i].segment_id).toHaveLength(stub.proccessedTC[i].segment_id.length);
      for (let ii = 0; ii < stub.proccessedTC[i].segment_id.length; ii += 1) {
        expect(decoded.proccessedTC[i].segment_id[ii]).toMatchObject({
          type: 'uinteger',
          value: stub.proccessedTC[i].segment_id[ii],
        });
      }
    }
  });
});
