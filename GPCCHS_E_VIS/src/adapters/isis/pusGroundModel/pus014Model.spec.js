// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus014Model');
const { getPus014Model } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus014Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus014Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus014Model');
  const fixture = getPus014Model();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      groundDate: { type: 'time', value: fixture.groundDate },
      apid: { type: 'uinteger', value: fixture.apid },
      noEventReportPackets: { type: 'uinteger', value: fixture.noEventReportPackets },
      noDiagPackets: { type: 'uinteger', value: fixture.noDiagPackets },
      noHKPackets: { type: 'uinteger', value: fixture.noHKPackets },
      noTMPackets: { type: 'uinteger', value: fixture.noTMPackets },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      status: { type: 'uinteger', value: fixture.status },
    });
    
    json.pus014EventReportPacket.should.be.an('array').that.have.lengthOf(fixture.pus014EventReportPacket.length);
    for (let i = 0; i < fixture.pus014EventReportPacket.length; i += 1) {
      json.pus014EventReportPacket[i].should.be.an('object').that.have.properties({
        rid: { type: 'uinteger', value: fixture.pus014EventReportPacket[i].rid },
        pus014ForwardedPacket: {
          apid: { type: 'uinteger', value: fixture.pus014EventReportPacket[i].pus014ForwardedPacket.apid },
          forwardingStatus: { type: 'boolean', value: fixture.pus014EventReportPacket[i].pus014ForwardedPacket.forwardingStatus },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: fixture.pus014EventReportPacket[i].pus014ForwardedPacket.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: fixture.pus014EventReportPacket[i].pus014ForwardedPacket.pusElement.lastUpdateTime },
          },
        },
        ridLabel: { type: 'string', value: fixture.pus014EventReportPacket[i].ridLabel },
      });
      
    }
    json.pus014HkPacket.should.be.an('array').that.have.lengthOf(fixture.pus014HkPacket.length);
    for (let i = 0; i < fixture.pus014HkPacket.length; i += 1) {
      json.pus014HkPacket[i].should.be.an('object').that.have.properties({
        subsamplingRatio: { type: 'uinteger', value: fixture.pus014HkPacket[i].subsamplingRatio },
        sid: { type: 'uinteger', value: fixture.pus014HkPacket[i].sid },
        pus014ForwardedPacket: {
          apid: { type: 'uinteger', value: fixture.pus014HkPacket[i].pus014ForwardedPacket.apid },
          forwardingStatus: { type: 'boolean', value: fixture.pus014HkPacket[i].pus014ForwardedPacket.forwardingStatus },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: fixture.pus014HkPacket[i].pus014ForwardedPacket.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: fixture.pus014HkPacket[i].pus014ForwardedPacket.pusElement.lastUpdateTime },
          },
        },
        sidLabel: { type: 'string', value: fixture.pus014HkPacket[i].sidLabel },
      });
      
    }
    json.pus014TmPacket.should.be.an('array').that.have.lengthOf(fixture.pus014TmPacket.length);
    for (let i = 0; i < fixture.pus014TmPacket.length; i += 1) {
      json.pus014TmPacket[i].should.be.an('object').that.have.properties({
        serviceTpe: { type: 'uinteger', value: fixture.pus014TmPacket[i].serviceTpe },
        serviceSubType: { type: 'uinteger', value: fixture.pus014TmPacket[i].serviceSubType },
        pus014ForwardedPacket: {
          apid: { type: 'uinteger', value: fixture.pus014TmPacket[i].pus014ForwardedPacket.apid },
          forwardingStatus: { type: 'boolean', value: fixture.pus014TmPacket[i].pus014ForwardedPacket.forwardingStatus },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: fixture.pus014TmPacket[i].pus014ForwardedPacket.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: fixture.pus014TmPacket[i].pus014ForwardedPacket.pusElement.lastUpdateTime },
          },
        },
      });
      
    }
    json.pus014DiagPacket.should.be.an('array').that.have.lengthOf(fixture.pus014DiagPacket.length);
    for (let i = 0; i < fixture.pus014DiagPacket.length; i += 1) {
      json.pus014DiagPacket[i].should.be.an('object').that.have.properties({
        subsamplingRatio: { type: 'uinteger', value: fixture.pus014DiagPacket[i].subsamplingRatio },
        sid: { type: 'uinteger', value: fixture.pus014DiagPacket[i].sid },
        pus014ForwardedPacket: {
          apid: { type: 'uinteger', value: fixture.pus014DiagPacket[i].pus014ForwardedPacket.apid },
          forwardingStatus: { type: 'boolean', value: fixture.pus014DiagPacket[i].pus014ForwardedPacket.forwardingStatus },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: fixture.pus014DiagPacket[i].pus014ForwardedPacket.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: fixture.pus014DiagPacket[i].pus014ForwardedPacket.pusElement.lastUpdateTime },
          },
        },
        sidLabel: { type: 'string', value: fixture.pus014DiagPacket[i].sidLabel },
      });
      
    }
  });
});
