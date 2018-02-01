// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus014Model');
const stub = require('./pus014Model.stub')();



describe('protobuf/isis/pusGroundModel/Pus014Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus014Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus014Model');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      groundDate: { type: 'time', value: stub.groundDate },
      apid: { type: 'uinteger', value: stub.apid },
      noEventReportPackets: { type: 'uinteger', value: stub.noEventReportPackets },
      noDiagPackets: { type: 'uinteger', value: stub.noDiagPackets },
      noHKPackets: { type: 'uinteger', value: stub.noHKPackets },
      noTMPackets: { type: 'uinteger', value: stub.noTMPackets },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      status: { type: 'uinteger', value: stub.status },
    });
    expect(decoded.pus014EventReportPacket).toHaveLength(stub.pus014EventReportPacket.length);
    for (let i = 0; i < stub.pus014EventReportPacket.length; i += 1) {
      expect(decoded.pus014EventReportPacket[i]).toMatchObject({
        rid: { type: 'uinteger', value: stub.pus014EventReportPacket[i].rid },
        pus014ForwardedPacket: {
          apid: { type: 'uinteger', value: stub.pus014EventReportPacket[i].pus014ForwardedPacket.apid },
          forwardingStatus: { type: 'boolean', value: stub.pus014EventReportPacket[i].pus014ForwardedPacket.forwardingStatus },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: stub.pus014EventReportPacket[i].pus014ForwardedPacket.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: stub.pus014EventReportPacket[i].pus014ForwardedPacket.pusElement.lastUpdateTime },
          },
        },
        ridLabel: { type: 'string', value: stub.pus014EventReportPacket[i].ridLabel },
      });
      
    }
    expect(decoded.pus014HkPacket).toHaveLength(stub.pus014HkPacket.length);
    for (let i = 0; i < stub.pus014HkPacket.length; i += 1) {
      expect(decoded.pus014HkPacket[i]).toMatchObject({
        subsamplingRatio: { type: 'uinteger', value: stub.pus014HkPacket[i].subsamplingRatio },
        sid: { type: 'uinteger', value: stub.pus014HkPacket[i].sid },
        pus014ForwardedPacket: {
          apid: { type: 'uinteger', value: stub.pus014HkPacket[i].pus014ForwardedPacket.apid },
          forwardingStatus: { type: 'boolean', value: stub.pus014HkPacket[i].pus014ForwardedPacket.forwardingStatus },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: stub.pus014HkPacket[i].pus014ForwardedPacket.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: stub.pus014HkPacket[i].pus014ForwardedPacket.pusElement.lastUpdateTime },
          },
        },
        sidLabel: { type: 'string', value: stub.pus014HkPacket[i].sidLabel },
      });
      
    }
    expect(decoded.pus014TmPacket).toHaveLength(stub.pus014TmPacket.length);
    for (let i = 0; i < stub.pus014TmPacket.length; i += 1) {
      expect(decoded.pus014TmPacket[i]).toMatchObject({
        serviceTpe: { type: 'uinteger', value: stub.pus014TmPacket[i].serviceTpe },
        serviceSubType: { type: 'uinteger', value: stub.pus014TmPacket[i].serviceSubType },
        pus014ForwardedPacket: {
          apid: { type: 'uinteger', value: stub.pus014TmPacket[i].pus014ForwardedPacket.apid },
          forwardingStatus: { type: 'boolean', value: stub.pus014TmPacket[i].pus014ForwardedPacket.forwardingStatus },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: stub.pus014TmPacket[i].pus014ForwardedPacket.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: stub.pus014TmPacket[i].pus014ForwardedPacket.pusElement.lastUpdateTime },
          },
        },
      });
      
    }
    expect(decoded.pus014DiagPacket).toHaveLength(stub.pus014DiagPacket.length);
    for (let i = 0; i < stub.pus014DiagPacket.length; i += 1) {
      expect(decoded.pus014DiagPacket[i]).toMatchObject({
        subsamplingRatio: { type: 'uinteger', value: stub.pus014DiagPacket[i].subsamplingRatio },
        sid: { type: 'uinteger', value: stub.pus014DiagPacket[i].sid },
        pus014ForwardedPacket: {
          apid: { type: 'uinteger', value: stub.pus014DiagPacket[i].pus014ForwardedPacket.apid },
          forwardingStatus: { type: 'boolean', value: stub.pus014DiagPacket[i].pus014ForwardedPacket.forwardingStatus },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: stub.pus014DiagPacket[i].pus014ForwardedPacket.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: stub.pus014DiagPacket[i].pus014ForwardedPacket.pusElement.lastUpdateTime },
          },
        },
        sidLabel: { type: 'string', value: stub.pus014DiagPacket[i].sidLabel },
      });
      
    }
  });
});
