// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./stationList');
const stub = require('./stationList.stub')();



describe('protobuf/isis/connection/StationList', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/StationList.proto`, { keepCase: true })
    .lookup('connection.protobuf.StationList');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      
    });
    expect(decoded.stationElmts).toHaveLength(stub.stationElmts.length);
    for (let i = 0; i < stub.stationElmts.length; i += 1) {
      expect(decoded.stationElmts[i]).toMatchObject({
        stationId: { type: 'string', value: stub.stationElmts[i].stationId },
        configuration: (typeof stub.stationElmts[i].configuration === 'undefined')
          ? null
          : {
            reconnectionDelay: (typeof stub.stationElmts[i].configuration.reconnectionDelay === 'undefined')
              ? null
              : { type: 'integer', value: stub.stationElmts[i].configuration.reconnectionDelay },
            reconnectionNumber: (typeof stub.stationElmts[i].configuration.reconnectionNumber === 'undefined')
              ? null
              : { type: 'integer', value: stub.stationElmts[i].configuration.reconnectionNumber },
          },
      });
      
    }
  });
});
